import {Pressable, StyleSheet, Text, View} from 'react-native'
import React, {useCallback, useMemo} from 'react'
import {padding} from '../../theme/padding'
import palette from '../../theme/palette'
import {typeface} from '../../theme/typeface'
import {useAppReducer} from '../../hook'
import type {Scene, SceneInteractOption} from '../../interface/Scene'
import {CheckObjectNames} from '../../interface/enums'

const StoryCard: React.FC = React.memo(() => {
  const [state, dispatch] = useAppReducer()
  // Assuming state.sceneData is now of type SceneData from 'src/data/SceneData_CN.ts'
  // and state.currentSceneKey is a SceneId (string)
  const currentScene: Scene | undefined =
    state.sceneData?.[state.currentSceneKey]
  const sceneCheck = currentScene?.checkOption // Renamed for clarity from checkOption to sceneCheck

  // TODO: Get language from state once it's available in AppState
  const lang = useMemo(
    () => (state.language === 'en' ? 'en' : 'cn'), // Now reads from state.language
    [state.language],
  )

  const sceneCheckText = useMemo(() => {
    if (!sceneCheck?.check) {
      return null
    }
    const {object: checkObject, subObject, difficulty} = sceneCheck.check
    let objectDisplay = ''

    if (subObject && CheckObjectNames[subObject]) {
      objectDisplay = CheckObjectNames[subObject][lang]
    } else if (checkObject === 'luck') {
      objectDisplay = lang === 'cn' ? '幸运' : 'Luck'
    } else if (checkObject === 'sanity') {
      objectDisplay = lang === 'cn' ? '理智' : 'Sanity'
    } else {
      objectDisplay = checkObject // Fallback
    }
    // TODO: Add difficulty display based on lang
    return `${objectDisplay} ${lang === 'cn' ? '检定' : 'Check'} (${difficulty}) -->🎲`
  }, [sceneCheck, lang])

  const goBack = useCallback(() => {
    dispatch({type: 'GO_BACK'})
  }, [dispatch])

  const handleSimpleOptionPress = useCallback(
    (goto: string) => {
      // Here, you might also dispatch actions for option.effects if any
      dispatch({
        type: 'CHANGE_SCENE',
        payload: goto,
      })
    },
    [dispatch],
  )

  const handleSceneCheckPress = useCallback(() => {
    if (currentScene && sceneCheck) {
      // Ensure currentScene is defined
      dispatch({
        type: 'PERFORM_SCENE_CHECK',
        payload: {sceneId: currentScene.id, checkDetails: sceneCheck},
      })
    }
  }, [dispatch, currentScene, sceneCheck])

  const handleInteractOptionPress = useCallback(
    (option: SceneInteractOption) => {
      if (currentScene && option.check) {
        // Ensure currentScene is defined
        dispatch({
          type: 'PERFORM_OPTION_CHECK',
          payload: {sceneId: currentScene.id, option},
        })
      } else {
        // option.effects?.forEach(effect => dispatch({ type: 'APPLY_EFFECT', payload: effect }));
        handleSimpleOptionPress(option.goto)
      }
    },
    [dispatch, currentScene, handleSimpleOptionPress],
  )

  const handleResolveCheckOutcome = useCallback(() => {
    dispatch({type: 'RESOLVE_CHECK_OUTCOME'})
  }, [dispatch])

  if (!currentScene) {
    return (
      <View style={styles.storyCardContainer}>
        <Text>加载场景中...</Text>
      </View>
    )
  }

  return (
    <View style={styles.storyCardContainer}>
      <Pressable onPress={goBack}>
        <Text style={styles.takeText}>{currentScene.id}</Text>
      </Pressable>
      <Text style={styles.storyCardContentText}>{currentScene.story}</Text>

      {/* Display area for an active check result */}
      {state.currentCheckAttempt &&
        state.currentCheckAttempt.outcomeOptionToDisplay && (
          <View style={styles.checkResultContainer}>
            <Text style={styles.checkInfoText}>
              {lang === 'cn' ? '检定:' : 'Check:'}{' '}
              {CheckObjectNames[
                state.currentCheckAttempt.checkDefinition.subObject!
              ]?.[lang] ||
                state.currentCheckAttempt.checkDefinition.subObject}{' '}
              ({state.currentCheckAttempt.checkDefinition.difficulty})
            </Text>
            <Text style={styles.checkInfoText}>
              {lang === 'cn' ? '掷骰点数:' : 'Roll:'}{' '}
              {state.currentCheckAttempt.rollValue}
            </Text>
            <Text style={styles.checkInfoText}>
              {lang === 'cn' ? '结果:' : 'Result:'}{' '}
              {state.currentCheckAttempt.result}
            </Text>
            <Pressable
              onPress={handleResolveCheckOutcome}
              style={styles.resolveButton}>
              <Text style={styles.storyCardOptionText}>
                {state.currentCheckAttempt.outcomeOptionToDisplay.text
                  ? `${state.currentCheckAttempt.outcomeOptionToDisplay.text}，前往 `
                  : lang === 'cn'
                    ? '继续，前往 '
                    : 'Continue, Go to '}
                <Text style={styles.storyCardOptionGoto}>
                  {state.currentCheckAttempt.outcomeOptionToDisplay.goto}
                </Text>
              </Text>
            </Pressable>
          </View>
        )}

      {/* Display options or scene check button IF NO active check result is being shown */}
      {!state.currentCheckAttempt && (
        <>
          {sceneCheck && sceneCheckText && (
            <Pressable
              onPress={handleSceneCheckPress}
              style={styles.checkOptionButton}>
              <Text style={styles.storyCardCheckOptionGoto}>
                {sceneCheckText}
              </Text>
              {/* Success/Failure info can be part of the post-check display or a hint */}
            </Pressable>
          )}

          {currentScene.options?.map((option, index) => {
            // TODO: Implement condition logic for option visibility
            // const isVisible = checkCondition(option.condition, state);
            // if (!isVisible) return null;

            if (option.check) {
              const optionCheckText = `${option.text || (lang === 'cn' ? '进行检定' : 'Perform Check')} (${option.check.subObject && CheckObjectNames[option.check.subObject] ? CheckObjectNames[option.check.subObject][lang] : option.check.subObject} ${option.check.difficulty}) -->🎲`
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
            }

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
                  <Text style={styles.storyCardOptionGoto}>{option.goto}</Text>
                </Text>
              </Pressable>
            )
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
