import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'
import palette from '../../theme/palette'

interface OptionButtonProps {
  onPress: () => void
  children: React.ReactNode
  disabled?: boolean
  conditionDescription?: string
  checkValueDescription?: string // New prop for check value
}

const OptionButton: React.FC<OptionButtonProps> = ({
  onPress,
  children,
  disabled,
  conditionDescription,
  checkValueDescription, // Destructure new prop
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
      {checkValueDescription && ( // Render check value description if provided
        <Text style={[textStyle, styles.checkValueDescriptionText]}>
          {checkValueDescription}
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
    backgroundColor: palette.LightYellow,
    alignItems: 'flex-start',
    shadowColor: palette.Black,
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
    backgroundColor: palette.DarkGrey, // Darker grey for disabled state
  },
  optionButtonPressed: {
    backgroundColor: palette.DarkYellow,
    opacity: 0.9,
  },
  storyCardOptionText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.ContentDark,
    lineHeight: typeface.Size.Normal * 1.3,
    fontWeight: typeface.Weight.Bold,
  },
  storyCardOptionTextDisabled: {
    color: typeface.Color.Inactive, // Lighter grey text for disabled state
  },
  conditionDescriptionText: {
    fontSize: typeface.Size.Small,
    color: typeface.Color.Desc, // Slightly lighter grey for condition description
    marginBottom: padding.Mini, // Changed from Tiny to Mini
    fontStyle: 'italic',
  },
  // Style for the check value description, similar to conditionDescriptionText
  checkValueDescriptionText: {
    fontSize: typeface.Size.Small,
    color: typeface.Color.Desc, // Slightly different color for distinction, or same as condition
    marginBottom: padding.Mini,
    fontStyle: 'normal', // Or italic if preferred
  },
})

export default OptionButton
