import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'

interface OptionButtonProps {
  onPress: () => void
  children: React.ReactNode
  disabled?: boolean
  conditionDescription?: string
}

const OptionButton: React.FC<OptionButtonProps> = ({
  onPress,
  children,
  disabled,
  conditionDescription,
}) => {
  const buttonStyle = [
    styles.optionButton,
    disabled ? styles.optionButtonDisabled : {},
  ]
  const textStyle = [
    styles.storyCardOptionText,
    disabled ? styles.storyCardOptionTextDisabled : {},
  ]

  return (
    <Pressable
      onPress={disabled ? undefined : onPress} // Disable onPress if button is disabled
      style={({ pressed }) => [
        ...buttonStyle,
        pressed && !disabled && styles.optionButtonPressed, // Apply pressed style only if not disabled
      ]}
      disabled={disabled} // Pass disabled to Pressable for accessibility
    >
      {conditionDescription && (
        <Text style={[textStyle, styles.conditionDescriptionText]}>
          {conditionDescription}
        </Text>
      )}
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  optionButton: {
    marginTop: padding.Mini,
    marginBottom: padding.Mini,
    padding: padding.Normal,
    paddingVertical: padding.Small,
    paddingHorizontal: padding.Normal,
    backgroundColor: '#e5d099',
    alignItems: 'flex-start',
    //需要有阴影
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: padding.Mini,
  },
  optionButtonDisabled: {
    backgroundColor: '#48484A', // Darker grey for disabled state
    borderColor: '#555',
  },
  optionButtonPressed: {
    backgroundColor: '#D4B77A', // 略深的背景色
    opacity: 0.9, // 或轻微降低不透明度
  },
  storyCardOptionText: {
    fontSize: typeface.Size.Normal,
    color: '#1c1b1c',
    lineHeight: typeface.Size.Normal * 1.3,
    fontWeight: '600',
  },
  storyCardOptionTextDisabled: {
    color: '#8A8A8E', // Lighter grey text for disabled state
  },
  conditionDescriptionText: {
    fontSize: typeface.Size.Small,
    color: '#AEAEB2', // Slightly lighter grey for condition description
    marginBottom: padding.Mini, // Changed from Tiny to Mini
    fontStyle: 'italic',
  },
})

export default OptionButton
