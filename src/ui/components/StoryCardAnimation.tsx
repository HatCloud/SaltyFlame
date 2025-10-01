import { StyleSheet } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { padding } from '../../theme/padding'
import palette from '../../theme/palette'

interface StoryCardAnimationProps {
  translateX: SharedValue<number>
  children: React.ReactNode
  isAbsolute?: boolean
}

const StoryCardAnimation: React.FC<StoryCardAnimationProps> = ({
  translateX,
  children,
  isAbsolute = false,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const baseStyle = {
      transform: [{ translateX: translateX.value }],
    }

    if (isAbsolute) {
      return {
        ...baseStyle,
        position: 'absolute' as const,
      }
    }

    return baseStyle
  })

  const containerStyle = isAbsolute
    ? [styles.storyCardContainer, animatedStyle]
    : styles.storyCardContainer

  return <Animated.View style={containerStyle}>{children}</Animated.View>
}

const styles = StyleSheet.create({
  storyCardContainer: {
    marginHorizontal: padding.ScreenLR,
    marginTop: padding.ScreenTB + padding.Large + 40,
    borderRadius: padding.Mini,
    paddingHorizontal: padding.Large,
    paddingVertical: padding.Large,
    shadowRadius: 2,
    backgroundColor: palette.BackgroundGrey,
    marginBottom: 140,
  },
})

export default StoryCardAnimation
