import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react' // Added useEffect
// Assuming gameFlags will be part of MyAppState, adjust import if necessary
// import { MyAppState } from '../../interface/MyAppState';
import { padding } from '../../theme/padding'
import palette from '../../theme/palette'
import { typeface } from '../../theme/typeface'
import { useAppReducer } from '../../hook'
import type { Scene, SceneInteractOption } from '../../interface/Scene' // Scene type is used for currentScene
import OptionButton from './OptionButton'
import CheckResult from './CheckResult'
import CheckOption from './CheckOption'
import { useI18n } from '../../i18n/useI18n'
import { useNavigation } from '@react-navigation/native' // Added
import { StackNavigationProp } from '@react-navigation/stack' // Added
import { RootStackParamList } from '../../interface/navigation' // Updated import
import { useCheckCondition } from '../../hooks/useCheckCondition'

type StoryCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SceneScreen'
>

const StoryCard: React.FC = React.memo(() => {
  const [state, dispatch] = useAppReducer()
  const navigation = useNavigation<StoryCardNavigationProp>()
  const { t } = useI18n()
  const { checkCondition } = useCheckCondition()
  const currentScene: Scene | undefined =
    state.sceneData?.[state.currentSceneKey]

  // useEffect to handle scene effects when currentScene changes
  useEffect(() => {
    if (currentScene?.effects && currentScene.effects.length > 0) {
      currentScene.effects.forEach(effect => {
        dispatch({ type: 'APPLY_EFFECT', payload: effect })
      })
    }
  }, [currentScene, dispatch]) // Rerun when currentScene or dispatch changes

  // Helper function to check conditions is now imported from useCheckCondition

  const handleInteractOptionPress = useCallback(
    (option: SceneInteractOption, disabled?: boolean) => {
      if (disabled) return // Do nothing if the option is disabled

      // Apply general effects first, if any, for all option types that support them
      // This ensures effects run before specific action dispatches like checks or navigation.
      // However, for 'goto' options, applyOccupation should ideally happen before scene change.
      // Let's refine the order.

      if (option.type === 'check') {
        // For check options, effects are usually part of the checkPayload or applied pre-check.
        // The current PERFORM_INLINE_CHECK in reducer handles originalOption.effects.
        dispatch({
          type: 'PERFORM_INLINE_CHECK',
          payload: { checkPayload: option.check, originalOption: option },
        })
      } else if (option.type === 'goto') {
        // Handle applyOccupation first if present
        if (option.applyOccupation) {
          dispatch({
            type: 'APPLY_CHOSEN_OCCUPATION',
            payload: option.applyOccupation,
          })
        }
        // Then apply other effects
        if (option.effects && option.effects.length > 0) {
          option.effects.forEach(effect =>
            dispatch({ type: 'APPLY_EFFECT', payload: effect }),
          )
        }
        // Finally, change scene
        dispatch({
          type: 'CHANGE_SCENE',
          payload: option.goto,
        })
      } else if (option.type === 'custom_navigation') {
        // Apply pre-navigation effects if any
        if (option.effects && option.effects.length > 0) {
          option.effects.forEach(effect =>
            dispatch({ type: 'APPLY_EFFECT', payload: effect }),
          )
        }
        // Navigate to the target screen with parameters
        if (option.navigationTarget === 'AttributeAllocationScreen') {
          navigation.navigate('AttributeAllocationScreen', {
            onCompleteNavigateToSceneId: option.onCompleteNavigateToSceneId,
            attributeValuesToAssign: option.attributeValuesToAssign || [], // Provide a default empty array
          })
        } else {
          // Handle other potential custom navigation targets if any
          console.warn(
            'Unknown custom_navigation target:',
            option.navigationTarget,
          )
        }
      }
    },
    [dispatch, navigation], // Added navigation
  )

  const handleResolveCheckOutcome = useCallback(() => {
    dispatch({ type: 'RESOLVE_CHECK_OUTCOME' })
  }, [dispatch])

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' })
  }, [dispatch])

  if (!currentScene) {
    return (
      <View style={styles.storyCardContainer}>
        <Text style={styles.storyCardContentText}>{t('common.notFound')}</Text>
        <OptionButton onPress={goBack}>{t('common.goBack')}</OptionButton>
      </View>
    )
  }

  return (
    <View style={styles.storyCardContainer}>
      <Text style={styles.takeText} onPress={goBack}>
        TAKE {currentScene.id}
      </Text>
      {currentScene.story.split('\n').map((paragraph, index) => (
        <Text key={`story-para-${index}`} style={styles.storyCardContentText}>
          {paragraph}
        </Text>
      ))}

      {state.currentCheckAttempt && (
        <CheckResult
          checkAttempt={state.currentCheckAttempt}
          onResolve={handleResolveCheckOutcome}
        />
      )}

      {!state.currentCheckAttempt && (
        <>
          {currentScene.options?.map((option, index) => {
            const conditionResult = option.condition
              ? checkCondition(
                  option.condition,
                  state.characterData,
                  state.gameFlags,
                )
              : { met: true, description: undefined }

            // Options are now rendered even if not met, but disabled
            if (option.type === 'check') {
              return (
                <CheckOption
                  key={index.toString()}
                  option={option}
                  onPress={op =>
                    handleInteractOptionPress(op, !conditionResult.met)
                  }
                  disabled={!conditionResult.met}
                  conditionDescription={conditionResult.description}
                />
              )
            } else if (option.type === 'goto') {
              return (
                <OptionButton
                  key={index.toString()}
                  onPress={() =>
                    handleInteractOptionPress(option, !conditionResult.met)
                  }
                  disabled={!conditionResult.met}
                  conditionDescription={conditionResult.description}
                >
                  {option.text
                    ? `${option.text}`
                    : `${t('common.goTo')} ${option.goto}`}
                </OptionButton>
              )
            } else if (option.type === 'custom_navigation') {
              // Render a button for custom navigation
              return (
                <OptionButton
                  key={index.toString()}
                  onPress={() =>
                    handleInteractOptionPress(option, !conditionResult.met)
                  }
                  disabled={!conditionResult.met}
                  conditionDescription={conditionResult.description}
                >
                  {option.text}
                </OptionButton>
              )
            }
            return null
          })}
        </>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  takeText: {
    fontSize: 36,
    color: '#cecece',
    fontWeight: typeface.Weight.Bold,
    marginBottom: padding.Small,
    letterSpacing: 2,
  },
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
  storyCardContentText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Content,
    lineHeight: typeface.Size.Normal * 1.4,
    marginBottom: padding.Normal, // Ensure inter-paragraph spacing is Normal
  },
})

StoryCard.displayName = 'StoryCard'
export default StoryCard
