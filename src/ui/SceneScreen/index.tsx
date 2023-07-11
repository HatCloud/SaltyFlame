import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useCallback, useContext, useMemo, useReducer} from 'react'
import {characterData} from './data'
import palette from '../../theme/palette'
import {padding} from './padding'
import {typeface} from '../../theme/typeface'
import {AppContext} from '../../../App'
import {appReducer} from '../../reducer/AppReducer'

const SceneScreen: React.FC = React.memo(() => {
  const appState = useContext(AppContext)
  const [state, dispatch] = useReducer(appReducer, appState)
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
  }, [])
  const changeScene = useCallback((goto: string) => {
    dispatch({
      type: 'CHANGE_SCENE',
      payload: goto,
    })
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
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
              <Text
                style={[
                  styles.storyCardOptionGoto,
                  {marginBottom: padding.Normal},
                ]}>
                {checkText}
              </Text>
            </>
          ) : null}
          {currentScene?.options.map(option => (
            <Text
              key={option.text}
              onPress={() => {
                changeScene(option.goto)
              }}
              style={styles.storyCardOptionText}>
              {option.text ? `${option.text}，前往` : '前往'}
              <Text style={styles.storyCardOptionGoto}>
                {` ${option.goto}`}
              </Text>
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={styles.characterCardContainer}>
        <View style={styles.characterCardColumn}>
          <Text style={styles.characterCardColumnTitle}>
            {characterData.name}
          </Text>
          <Text style={styles.characterCardColumnDesc}>
            {characterData.occupation}
          </Text>
        </View>
        <View style={styles.characterCardColumn}>
          <Text style={styles.characterCardColumnTitle}>HP</Text>
          <Text
            style={
              styles.characterCardColumnDesc
            }>{`${characterData.hitPoints.current}/${characterData.hitPoints.max}`}</Text>
        </View>
        <View style={styles.characterCardColumn}>
          <Text style={styles.characterCardColumnTitle}>SAN</Text>
          <Text
            style={
              styles.characterCardColumnDesc
            }>{`${characterData.sanity.current}/${characterData.sanity.max}`}</Text>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 40,
    backgroundColor: palette.Background,
  },
  storyCardContainer: {
    marginHorizontal: padding.ScreenLR + padding.Large,
    marginTop: padding.ScreenTB + padding.Large,
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
  characterCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: palette.BackgroundGrey,
    borderTopLeftRadius: padding.Normal,
    borderTopRightRadius: padding.Normal,
    shadowRadius: 2,
    paddingBottom: 20,
  },
  characterCardColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterCardColumnTitle: {
    fontSize: typeface.Size.XLarge,
    color: typeface.Color.Subtitle,
    fontWeight: typeface.Weight.Bold,
  },
  characterCardColumnDesc: {
    marginTop: padding.Mini,
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Subtitle,
  },
  takeText: {
    fontSize: 36,
    color: typeface.Color.Content,
    fontWeight: typeface.Weight.Bold,
    marginBottom: padding.Small,
  },
})

SceneScreen.displayName = 'SceneScreen'
export default SceneScreen
