import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Sound from 'react-native-sound'
import palette from '../../theme/palette'
import { typeface } from '../../theme/typeface'

interface GlobalDiceRollAnimationProps {
  isVisible: boolean
  rollResult: number | null
  diceFaces: number | null
  onAnimationFinish: () => void
}

const ANIMATION_DURATION = 500
const DISPLAY_DURATION = 2000 // Corrected display duration

const GlobalDiceRollAnimation: React.FC<GlobalDiceRollAnimationProps> = ({
  isVisible,
  rollResult,
  diceFaces,
  onAnimationFinish,
}) => {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.5)
  const rotateZValue = useSharedValue(0) // For simple Z-axis rotation

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

      opacity.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
      })
      scale.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
      })
      // Animate Z-axis rotation
      rotateZValue.value = withTiming(360, {
        // Full spin on Z
        duration: ANIMATION_DURATION * 2,
        easing: Easing.linear,
      })

      const timer = setTimeout(() => {
        opacity.value = withTiming(0, {
          duration: ANIMATION_DURATION,
          easing: Easing.in(Easing.ease),
        })
        scale.value = withTiming(
          0.5,
          { duration: ANIMATION_DURATION, easing: Easing.in(Easing.cubic) },
          finished => {
            if (finished) {
              runOnJS(setShowModalContent)(false)
              runOnJS(onAnimationFinish)()
              rotateZValue.value = 0 // Reset rotation
            }
          },
        )
      }, DISPLAY_DURATION)

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
      // When isVisible becomes false, the cleanup function from the previous effect (when isVisible was true)
      // will be called, handling the sound release. We only need to manage animations here.
      opacity.value = withTiming(0, { duration: ANIMATION_DURATION / 2 })
      scale.value = withTiming(
        0.5,
        { duration: ANIMATION_DURATION / 2 },
        finished => {
          if (finished) {
            runOnJS(setShowModalContent)(false)
            rotateZValue.value = 0 // Reset rotation if hiding early
          }
        },
      )
    }
  }, [isVisible, onAnimationFinish, opacity, scale, rotateZValue])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }
  })

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotateZValue.value}deg` }],
    }
  })

  if (!showModalContent || rollResult === null || diceFaces === null) {
    return null
  }

  return (
    <Modal transparent visible={showModalContent} animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Animated.View style={iconAnimatedStyle}>
            <Icon
              name="dice-d20"
              size={60}
              color={palette.Tomato} // Use color from palette
              style={styles.diceIcon}
            />
            {/* We can choose a more generic dice or d6 if d20 is too specific, or make it dynamic */}
          </Animated.View>
          <Text style={styles.resultText}>{rollResult}</Text>
          <Text style={styles.descriptionText}>D{diceFaces} 投掷结果</Text>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: `${palette.Black}99`, // Black with ~60% opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: palette.BackgroundGrey, // Darker background for the card
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    // Shadow might not be very visible on a dark overlay with a dark card, consider adjusting or removing
    shadowColor: palette.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Reduced opacity for a more subtle shadow on dark theme
    shadowRadius: 3.84,
    elevation: 5, // Reduced elevation
    width: '70%',
    maxWidth: 300,
  },
  diceIcon: {
    marginBottom: 20,
  },
  resultText: {
    fontFamily: typeface.FONT_FAMILY,
    fontSize: 48, // Keeping large size for impact
    fontWeight: typeface.Weight.Bold,
    color: palette.LightYellow, // Brighter color for dark background
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: typeface.FONT_FAMILY,
    fontSize: typeface.Size.Large,
    color: palette.Grey, // Lighter grey for dark background
  },
})

export default GlobalDiceRollAnimation
