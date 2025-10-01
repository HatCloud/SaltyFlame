import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'

interface StoryCardHeaderProps {
  takeNumber: number
  onPress: () => void
}

const StoryCardHeader: React.FC<StoryCardHeaderProps> = ({
  takeNumber,
  onPress,
}) => {
  return (
    <Text style={styles.takeText} onPress={onPress}>
      TAKE {takeNumber}
    </Text>
  )
}

const styles = StyleSheet.create({
  takeText: {
    fontSize: 36,
    color: '#cecece',
    fontWeight: typeface.Weight.Bold,
    marginBottom: padding.Small,
    letterSpacing: 2,
  },
})

export default StoryCardHeader
