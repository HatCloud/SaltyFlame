import {StyleSheet, Text, View} from 'react-native'
import React, {useCallback, useMemo} from 'react'
import {padding} from '../../theme/padding'
import palette from '../../theme/palette'
import {typeface} from '../../theme/typeface'
import {useAppReducer} from '../../hook'

const StoryCard: React.FC = React.memo(() => {
  const [state, dispatch] = useAppReducer()
  const currentScene = state.sceneData[state.currentSceneKey]
  const checkOption = currentScene?.checkOption
  const checkText = useMemo(() => {
    if (!checkOption) {
      return null
    }
    let objectText = null
    switch (checkOption.check?.object) {
      case 'skill':
        objectText = `技能: ${checkOption.check?.subObject}`
        break
      case 'characteristic':
        objectText = `属性: ${checkOption.check?.subObject}`
        break
      case 'luck':
        objectText = '幸运'
        break
      case 'sanity':
        objectText = '理智'
        break
    }

    return `${objectText} 检定 -->🎲`
  }, [checkOption])

  const goBack = useCallback(() => {
    dispatch({type: 'GO_BACK'})
  }, [dispatch])
  const changeScene = useCallback(
    (goto: string) => {
      dispatch({
        type: 'CHANGE_SCENE',
        payload: goto,
      })
    },
    [dispatch],
  )
  return (
    <View style={styles.storyCardContainer}>
      <Text onPress={goBack} style={styles.takeText}>
        {state.currentSceneKey}
      </Text>
      <Text style={styles.storyCardContentText}>{currentScene?.story}</Text>
      {checkText ? (
        <>
          <Text style={styles.storyCardCheckOptionText}>
            {`检定成功，前往 ${checkOption?.success?.goto}`}
          </Text>
          <Text style={styles.storyCardCheckOptionText}>
            {`检定失败，前往 ${checkOption?.failure?.goto}`}
          </Text>
          <Text style={styles.storyCardCheckOptionGoto}>{checkText}</Text>
        </>
      ) : null}
      {currentScene?.options.map((option, index) => (
        <Text
          key={index.toString()}
          onPress={() => {
            changeScene(option.goto)
          }}
          style={styles.storyCardOptionText}>
          {option.text ? `${option.text}，前往` : '前往'}
          <Text style={styles.storyCardOptionGoto}>{` ${option.goto}`}</Text>
        </Text>
      ))}
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
  storyCardOptionGoto: {
    color: typeface.Color.Striking,
  },
  storyCardCheckOptionGoto: {
    color: typeface.Color.Striking,
    marginBottom: padding.Normal,
  },
})

StoryCard.displayName = 'StoryCard'
export default StoryCard
