import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/FontAwesome5' // Using FontAwesome5 for dice icons
import palette from '../../theme/palette'
import { typeface } from '../../theme/typeface'

interface GlobalDiceRollAnimationProps {
  isVisible: boolean
  rollResult: number | null
  diceFaces: number | null
  onAnimationFinish: () => void // Callback to inform parent when animation (including display duration) is done
}

const ANIMATION_DURATION = 500 // ms for enter/exit animation
const DISPLAY_DURATION = 2500 // ms to display the result card after entry animation

const GlobalDiceRollAnimation: React.FC<GlobalDiceRollAnimationProps> = ({
  isVisible,
  rollResult,
  diceFaces,
  onAnimationFinish,
}) => {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.5)
  const rotateYValue = useSharedValue(0) // Renamed from rotate for clarity
  const rotateXValue = useSharedValue(0) // Added for X-axis rotation

  const [showModalContent, setShowModalContent] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowModalContent(true)
      opacity.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
      })
      scale.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
      })
      // Animate both X and Y rotation
      rotateYValue.value = withTiming(360, {
        // Full spin on Y
        duration: ANIMATION_DURATION * 1.8, // Slightly different duration for a more complex feel
        easing: Easing.linear,
      })
      rotateXValue.value = withTiming(360 * 1.5, {
        // One and a half spins on X
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
              rotateYValue.value = 0 // Reset rotation
              rotateXValue.value = 0 // Reset rotation
            }
          },
        )
      }, DISPLAY_DURATION)

      return () => clearTimeout(timer)
    } else {
      // If isVisible becomes false externally, hide immediately (or with exit animation)
      opacity.value = withTiming(0, { duration: ANIMATION_DURATION / 2 })
      scale.value = withTiming(
        0.5,
        { duration: ANIMATION_DURATION / 2 },
        finished => {
          if (finished) {
            runOnJS(setShowModalContent)(false)
            rotateYValue.value = 0
            rotateXValue.value = 0
          }
        },
      )
    }
  }, [isVisible, onAnimationFinish, opacity, scale, rotateYValue, rotateXValue])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }
  })

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${rotateYValue.value}deg` },
        { rotateX: `${rotateXValue.value}deg` },
      ],
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
