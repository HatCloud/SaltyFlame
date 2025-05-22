import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'

interface OptionButtonProps {
  onPress: () => void
  children: React.ReactNode
}

const OptionButton: React.FC<OptionButtonProps> = ({ onPress, children }) => {
  return (
    <Pressable onPress={onPress} style={styles.optionButton}>
      <Text style={styles.storyCardOptionText}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  optionButton: {
    marginBottom: padding.Small,
  },
  storyCardOptionText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Content,
    lineHeight: typeface.Size.Normal * 1.3,
    marginBottom: padding.Normal,
  },
})

export default OptionButton
