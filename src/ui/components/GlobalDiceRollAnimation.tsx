import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Sound from 'react-native-sound'
import palette from '../../theme/palette'
import { typeface } from '../../theme/typeface'
import { CheckOutcome } from '../../constant/enums' // Added import
import { useI18n } from '../../i18n/useI18n' // Added import
import { getCheckOutcomeText } from '../../utils/checkUtils' // Updated import

interface GlobalDiceRollAnimationProps {
  isVisible: boolean
  rollResult: number | null
  resultType?: CheckOutcome // Added prop
  onAnimationFinish: () => void
}

const ANIMATION_DURATION = 400
const DICE_ANIMATION_PEAK_DURATION = ANIMATION_DURATION * 1.2 // When dice is fully visible and spinning
const TEXT_FADE_IN_DURATION = ANIMATION_DURATION / 2
const DISPLAY_DURATION = 1200 // Duration the modal stays visible after text appears

const GlobalDiceRollAnimation: React.FC<GlobalDiceRollAnimationProps> = ({
  isVisible,
  rollResult,
  resultType,
  onAnimationFinish,
}) => {
  const { t } = useI18n()
  const overallOpacity = useSharedValue(0) // Controls the entire modal card's opacity
  const overallScale = useSharedValue(0.5) // Controls the entire modal card's scale
  const rotateZValue = useSharedValue(0)
  const resultTextOpacity = useSharedValue(0) // Controls result text's opacity

  const [showModalContent, setShowModalContent] = useState(false)

  useEffect(() => {
    let sound: Sound | null = null // Renamed for clarity and to avoid conflict if any

    if (isVisible) {
      setShowModalContent(true)

      try {
        const soundFileName = 'dice_roll.wav'
        sound = new Sound(soundFileName, Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log(`Failed to load the sound: ${soundFileName}`, error)
            return
          }
          // Sound loaded successfully
          sound?.play(success => {
            if (success) {
              console.log(`Sound ${soundFileName} played successfully`)
            } else {
              console.log(
                `Sound ${soundFileName} playback failed due to audio decoding errors`,
              )
            }
            sound?.release() // Release after playing or if failed to play
          })
        })
      } catch (e) {
        console.error('Error initializing Sound:', e)
      }

      // Initial state for animations
      resultTextOpacity.value = 0
      rotateZValue.value = 0 // Ensure rotation is reset

      // Overall modal visibility animation
      overallOpacity.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
      })
      overallScale.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
      })

      const rotationStartDelay = 300
      rotateZValue.value = withDelay(
        rotationStartDelay,
        withTiming(180, {
          duration: DICE_ANIMATION_PEAK_DURATION, // Rotates
          easing: Easing.linear,
        }),
      )

      // Step 3: Dice icon fades out after its rotation is complete.
      // Fade out delay = rotation start delay + rotation duration
      const diceFadeOutStartDelay =
        rotationStartDelay + DICE_ANIMATION_PEAK_DURATION

      // Step 4: Result text fades in as dice icon is fading out.
      // Text fade-in starts when dice icon starts fading out.
      const textFadeInStartDelay = diceFadeOutStartDelay
      resultTextOpacity.value = withDelay(
        textFadeInStartDelay,
        withTiming(1, { duration: TEXT_FADE_IN_DURATION }), // Text fades in
      )

      // Overall modal fade out timer:
      // Starts after text has been visible for DISPLAY_DURATION
      const overallFadeOutDelay =
        textFadeInStartDelay + TEXT_FADE_IN_DURATION + DISPLAY_DURATION
      const timer = setTimeout(() => {
        overallOpacity.value = withTiming(
          0,
          {
            duration: ANIMATION_DURATION,
            easing: Easing.in(Easing.ease),
          },
          finished => {
            if (finished) {
              runOnJS(setShowModalContent)(false)
              runOnJS(onAnimationFinish)()
              // Reset values for next time
              resultTextOpacity.value = 0
              rotateZValue.value = 0
              overallScale.value = 0.5
            }
          },
        )
      }, overallFadeOutDelay)

      return () => {
        // Cleanup function
        clearTimeout(timer)
        if (sound && sound.isLoaded()) {
          // Check if sound was successfully loaded and assigned
          sound.stop(() => {
            sound?.release()
          })
        } else if (sound) {
          // If sound object exists but might not be loaded (e.g. error during load)
          sound.release() // Still try to release
        }
        sound = null // Clear the reference
      }
    } else {
      // When isVisible becomes false (e.g., modal closed prematurely)
      overallOpacity.value = withTiming(0, { duration: ANIMATION_DURATION / 2 })
      overallScale.value = withTiming(
        0.5,
        { duration: ANIMATION_DURATION / 2 },
        finished => {
          if (finished) {
            runOnJS(setShowModalContent)(false)
            // Reset values if hiding early
            resultTextOpacity.value = 0
            rotateZValue.value = 0
          }
        },
      )
    }
  }, [
    isVisible,
    onAnimationFinish,
    overallOpacity,
    overallScale,
    rotateZValue,
    resultTextOpacity,
  ])

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      opacity: overallOpacity.value,
      transform: [{ scale: overallScale.value }],
    }
  })

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotateZValue.value}deg` }],
    }
  })

  const resultTextStyle = useAnimatedStyle(() => {
    return {
      opacity: resultTextOpacity.value,
    }
  })

  //   ? getCheckOutcomeText(resultType, t)
  //   : `D${diceFaces ?? '?'}` // Fallback if resultType is not available

  if (!showModalContent || rollResult === null) {
    return null
  }

  const descriptionTextContent = getCheckOutcomeText(resultType, t)

  return (
    <Modal transparent visible={showModalContent} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, animatedCardStyle]}>
          <Animated.View style={[styles.diceIconContainer, iconAnimatedStyle]}>
            <Icon name="dice-d20" size={120} color={palette.Tomato} />
          </Animated.View>

          <Animated.View style={[styles.textContainer, resultTextStyle]}>
            <View style={styles.textWrap}>
              <Text style={styles.resultText}>{rollResult}</Text>
              {descriptionTextContent ? (
                <Text style={styles.descriptionText}>
                  {descriptionTextContent}
                </Text>
              ) : null}
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: `${palette.Black}99`, // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: palette.BackgroundGrey,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center', // Center content for overlap
    shadowColor: palette.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 200,
    height: 200,
  },
  diceIconContainer: {
    position: 'absolute', // For overlap
  },
  textContainer: {
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: palette.Mask,
  },
  textWrap: {
    alignItems: 'center',
  },
  resultText: {
    fontFamily: typeface.FONT_FAMILY,
    fontSize: 48, // Keeping large size for impact
    fontWeight: typeface.Weight.Bold,
    color: palette.White,
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: typeface.FONT_FAMILY,
    fontSize: typeface.Size.Ultra,
    color: palette.White,
  },
})

export default GlobalDiceRollAnimation
