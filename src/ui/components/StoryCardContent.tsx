import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'
import type { Scene, SceneInteractOption } from '../../interface/Scene'
import StoryCardHeader from './StoryCardHeader'
import StoryCardOptions from './StoryCardOptions'
import CheckResult from './CheckResult'
import type { CheckAttemptState } from '../../interface/MyAppState'

interface StoryCardContentProps {
  scene: Scene
  takeNumber: number
  currentCheckAttempt?: CheckAttemptState | null
  onGoBack: () => void
  onResolveCheckOutcome: () => void
  onOptionPress: (option: SceneInteractOption, disabled?: boolean) => void
}

const StoryCardContent: React.FC<StoryCardContentProps> = ({
  scene,
  takeNumber,
  currentCheckAttempt,
  onGoBack,
  onResolveCheckOutcome,
  onOptionPress,
}) => {
  return (
    <>
      <StoryCardHeader takeNumber={takeNumber} onPress={onGoBack} />

      {scene.story.split('\n').map((paragraph, index) => (
        <Text key={`story-para-${index}`} style={styles.storyCardContentText}>
          {paragraph}
        </Text>
      ))}

      {currentCheckAttempt && (
        <CheckResult
          checkAttempt={currentCheckAttempt}
          onResolve={onResolveCheckOutcome}
        />
      )}

      {!currentCheckAttempt && (
        <StoryCardOptions scene={scene} onOptionPress={onOptionPress} />
      )}

      <Text style={styles.idText}>ID: {scene.id}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  storyCardContentText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Content,
    lineHeight: typeface.Size.Normal * 1.4,
    marginBottom: padding.Normal,
  },
  idText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Inactive,
    marginTop: padding.Large,
    letterSpacing: 2,
    alignSelf: 'flex-end',
  },
})

export default StoryCardContent
