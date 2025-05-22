import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { padding } from '../../theme/padding'
import palette from '../../theme/palette'
import { typeface } from '../../theme/typeface'
import { useAppReducer } from '../../hook'
import type { Scene, SceneInteractOption } from '../../interface/Scene'
import OptionButton from './OptionButton'
import CheckResult from './CheckResult'
import CheckOption from './CheckOption'

const StoryCard: React.FC = React.memo(() => {
  const [state, dispatch] = useAppReducer()
  const currentScene: Scene | undefined =
    state.sceneData?.[state.currentSceneKey]

  const lang = useMemo(
    () => (state.language === 'en' ? 'en' : 'cn'),
    [state.language],
  )

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' })
  }, [dispatch])

  const handleInteractOptionPress = useCallback(
    (option: SceneInteractOption) => {
      if (option.type === 'check') {
        dispatch({
          type: 'PERFORM_INLINE_CHECK',
          payload: { checkPayload: option.check, originalOption: option },
        })
      } else if (option.type === 'goto') {
        if (option.effects && option.effects.length > 0) {
          option.effects.forEach(effect =>
            dispatch({ type: 'APPLY_EFFECT', payload: effect }),
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
    dispatch({ type: 'RESOLVE_CHECK_OUTCOME' })
  }, [dispatch])

  if (!currentScene) {
    return (
      <View style={styles.storyCardContainer}>
        <Text style={styles.storyCardContentText}>404 找不到场景</Text>
        <OptionButton onPress={goBack}>
          {lang === 'cn' ? '返回上级' : 'Go Back'}
        </OptionButton>
      </View>
    )
  }

  return (
    <View style={styles.storyCardContainer}>
      <Text style={styles.takeText}>{currentScene.id}</Text>
      <Text style={styles.storyCardContentText}>{currentScene.story}</Text>

      {state.currentCheckAttempt && (
        <CheckResult
          checkAttempt={state.currentCheckAttempt}
          lang={lang}
          onResolve={handleResolveCheckOutcome}
        />
      )}

      {!state.currentCheckAttempt && (
        <>
          {currentScene.options?.map((option, index) => {
            if (option.type === 'check') {
              return (
                <CheckOption
                  key={index.toString()}
                  option={option}
                  lang={lang}
                  onPress={handleInteractOptionPress}
                />
              )
            } else if (option.type === 'goto') {
              return (
                <OptionButton
                  key={index.toString()}
                  onPress={() => handleInteractOptionPress(option)}
                >
                  {option.text
                    ? `${option.text}，前往 `
                    : lang === 'cn'
                      ? '前往 '
                      : 'Go to '}
                  <Text style={styles.storyCardOptionGoto}>{option.goto}</Text>
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
  storyCardOptionGoto: {
    color: typeface.Color.Striking,
  },
})

StoryCard.displayName = 'StoryCard'
export default StoryCard
