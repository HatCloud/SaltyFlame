import {Pressable, StyleSheet, Text, View} from 'react-native'
import React, {useCallback, useMemo} from 'react'
import {padding} from '../../theme/padding'
import palette from '../../theme/palette'
import {typeface} from '../../theme/typeface'
import {useAppReducer} from '../../hook'
import type {
  Scene,
  SceneInteractOption,
  // CheckDrivenOption, // Not needed directly if using option.type
  // GotoDrivenOption, // Not needed directly if using option.type
} from '../../interface/Scene' // Ensure SceneInteractOption is the union type
import {CheckObjectNames} from '../../interface/enums'

const StoryCard: React.FC = React.memo(() => {
  const [state, dispatch] = useAppReducer()
  const currentScene: Scene | undefined =
    state.sceneData?.[state.currentSceneKey]

  const lang = useMemo(
    () => (state.language === 'en' ? 'en' : 'cn'),
    [state.language],
  )

  const goBack = useCallback(() => {
    dispatch({type: 'GO_BACK'})
  }, [dispatch])

  // Combined handler for all option types
  const handleInteractOptionPress = useCallback(
    (option: SceneInteractOption) => {
      if (option.type === 'check') {
        dispatch({
          type: 'PERFORM_INLINE_CHECK',
          payload: {checkPayload: option.check, originalOption: option},
        })
      } else if (option.type === 'goto') {
        // Effects on GotoDrivenOption are handled by reducer if CHANGE_SCENE is enhanced,
        // or should be dispatched here if needed before navigation.
        // For now, assuming reducer handles pre-navigation effects if any are associated with CHANGE_SCENE.
        if (option.effects && option.effects.length > 0) {
          option.effects.forEach(effect =>
            dispatch({type: 'APPLY_EFFECT', payload: effect}),
          )
        }
        dispatch({
          type: 'CHANGE_SCENE',
          payload: option.goto,
        })
      }
    },
    [dispatch],
  )

  const handleResolveCheckOutcome = useCallback(() => {
    dispatch({type: 'RESOLVE_CHECK_OUTCOME'})
  }, [dispatch])

  if (!currentScene) {
    return (
      <View style={styles.storyCardContainer}>
        <Text style={styles.storyCardContentText}>404 找不到场景</Text>
        <Pressable onPress={goBack} style={styles.optionButton}>
          <Text style={styles.storyCardOptionText}>
            {lang === 'cn' ? '返回上级' : 'Go Back'}
          </Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.storyCardContainer}>
      {/* <Pressable onPress={goBack}> */}
      {/*  <Text style={styles.takeText}>{currentScene.id}</Text> */}
      {/* </Pressable> */}
      <Text style={styles.takeText}>{currentScene.id}</Text>
      <Text style={styles.storyCardContentText}>{currentScene.story}</Text>

      {/* Display area for an active check result */}
      {state.currentCheckAttempt && (
        <View style={styles.checkResultContainer}>
          <Text style={styles.checkInfoText}>
            {lang === 'cn' ? '检定:' : 'Check:'}{' '}
            {CheckObjectNames[
              state.currentCheckAttempt.checkDefinition.subObject
            ]?.[lang] || state.currentCheckAttempt.checkDefinition.subObject}
            {state.currentCheckAttempt.checkDefinition.difficulty
              ? ` (${state.currentCheckAttempt.checkDefinition.difficulty})`
              : ''}
          </Text>
          <Text style={styles.checkInfoText}>
            {lang === 'cn' ? '掷骰点数:' : 'Roll:'}{' '}
            {state.currentCheckAttempt.rollValue}
          </Text>
          <Text style={styles.checkInfoText}>
            {lang === 'cn' ? '结果:' : 'Result:'}{' '}
            {state.currentCheckAttempt.isSuccess
              ? lang === 'cn'
                ? '成功'
                : 'Success'
              : lang === 'cn'
                ? '失败'
                : 'Failure'}
            {state.currentCheckAttempt.isSuccess &&
              state.currentCheckAttempt.successMessage && (
                <Text style={styles.checkInfoText}>
                  {' '}
                  ({state.currentCheckAttempt.successMessage})
                </Text>
              )}
            {!state.currentCheckAttempt.isSuccess &&
              state.currentCheckAttempt.failureMessage && (
                <Text style={styles.checkInfoText}>
                  {' '}
                  ({state.currentCheckAttempt.failureMessage})
                </Text>
              )}
          </Text>
          <Pressable
            onPress={handleResolveCheckOutcome}
            style={styles.resolveButton}>
            <Text style={styles.storyCardOptionText}>
              {lang === 'cn' ? '继续' : 'Continue'}
            </Text>
          </Pressable>
        </View>
      )}

      {/* Display options IF NO active check result is being shown */}
      {!state.currentCheckAttempt && (
        <>
          {currentScene.options?.map((option, index) => {
            // TODO: Implement condition logic for option visibility
            // const isVisible = checkCondition(option.condition, state);
            // if (!isVisible) return null;

            if (option.type === 'check') {
              const checkDetails = option.check.details
              const subObjectDisplay =
                checkDetails.subObject &&
                CheckObjectNames[checkDetails.subObject]
                  ? CheckObjectNames[checkDetails.subObject]?.[lang]
                  : checkDetails.subObject
              const difficultyDisplay = checkDetails.difficulty
                ? ` (${checkDetails.difficulty})`
                : ''
              const optionCheckText = `${option.text || (lang === 'cn' ? '进行检定' : 'Perform Check')} (${subObjectDisplay}${difficultyDisplay}) -->🎲`
              return (
                <Pressable
                  key={index.toString()}
                  onPress={() => handleInteractOptionPress(option)}
                  style={styles.optionButton}>
                  <Text style={styles.storyCardOptionText}>
                    {optionCheckText}
                  </Text>
                </Pressable>
              )
            } else if (option.type === 'goto') {
              return (
                <Pressable
                  key={index.toString()}
                  onPress={() => handleInteractOptionPress(option)}
                  style={styles.optionButton}>
                  <Text style={styles.storyCardOptionText}>
                    {option.text
                      ? `${option.text}，前往 `
                      : lang === 'cn'
                        ? '前往 '
                        : 'Go to '}
                    <Text style={styles.storyCardOptionGoto}>
                      {option.goto}
                    </Text>
                  </Text>
                </Pressable>
              )
            }
            return null // Should ideally not happen with well-formed data
          })}
        </>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  takeText: {
    fontSize: 36,
    color: typeface.Color.Content,
    fontWeight: typeface.Weight.Bold,
    marginBottom: padding.Small,
  },
  storyCardContainer: {
    marginHorizontal: padding.ScreenLR + padding.Large,
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
    lineHeight: typeface.Size.Normal * 1.3,
    marginBottom: padding.Normal,
  },
  storyCardOptionText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Content,
    lineHeight: typeface.Size.Normal * 1.3,
    marginBottom: padding.Normal,
  },
  storyCardCheckOptionText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Content,
    lineHeight: typeface.Size.Normal * 1.3,
    marginBottom: 2,
  },
  storyCardCheckOptionTextSmall: {
    // Added style
    fontSize: typeface.Size.Small,
    color: typeface.Color.Inactive, // Changed from Dim to Inactive
    lineHeight: typeface.Size.Small * 1.3,
    marginBottom: 1,
  },
  storyCardOptionGoto: {
    color: typeface.Color.Striking,
  },
  storyCardCheckOptionGoto: {
    color: typeface.Color.Striking,
    marginBottom: padding.Normal,
    fontWeight: typeface.Weight.Bold, // Make check text bold
  },
  checkOptionButton: {
    marginTop: padding.Normal,
    marginBottom: padding.Normal,
    padding: padding.Small,
    backgroundColor: palette.BackgroundGrey,
    borderWidth: 1,
    borderColor: palette.Background,
    borderRadius: padding.Mini,
  },
  optionButton: {
    marginBottom: padding.Small,
  },
  checkResultContainer: {
    // Style for the check result display area
    marginTop: padding.Normal,
    marginBottom: padding.Normal,
    padding: padding.Normal, // Changed from padding.Medium
    backgroundColor: '#2C2C2E', // Slightly different background for results
    borderRadius: padding.Mini,
    borderWidth: 1,
    borderColor: '#444',
  },
  checkInfoText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Highlight,
    marginBottom: padding.Small,
  },
  resolveButton: {
    marginTop: padding.Normal,
    paddingVertical: padding.Small,
    paddingHorizontal: padding.Normal,
    backgroundColor: typeface.Color.Striking,
    borderRadius: padding.Mini,
    alignItems: 'center',
  },
})

StoryCard.displayName = 'StoryCard'
export default StoryCard
