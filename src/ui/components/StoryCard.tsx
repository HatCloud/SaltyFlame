import { StyleSheet, Text, Dimensions, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  Easing,
  runOnJS,
} from 'react-native-reanimated'
import { padding } from '../../theme/padding'
import palette from '../../theme/palette'
import { typeface } from '../../theme/typeface'
import { useAppReducer } from '../../hook'
import type { Scene, SceneInteractOption } from '../../interface/Scene'
import OptionButton from './OptionButton'
import CheckResult from './CheckResult'
import CheckOption from './CheckOption'
import OccupationInfoModal from './OccupationInfoModal'
import { useI18n } from '../../i18n/useI18n'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../interface/navigation'
import { useCheckCondition } from '../../hooks/useCheckCondition'
import { occupationTemplates } from '../../data/occupations'
import type { OccupationTemplate } from '../../interface/OccupationTemplate'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ANIMATION_DURATION = 800

type StoryCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SceneScreen'
>

const StoryCard: React.FC = React.memo(() => {
  const [state, dispatch] = useAppReducer()
  const navigation = useNavigation<StoryCardNavigationProp>()
  const { t } = useI18n()
  const { checkCondition } = useCheckCondition()

  const translateX = useSharedValue(SCREEN_WIDTH)
  const prevTranslateX = useSharedValue(0)

  const [takeNumber, setTakeNumber] = useState(() => state.history.length + 1)

  const [currentScene, setCurrentScene] = useState<Scene | undefined>(
    state.sceneData?.[state.currentSceneKey],
  )

  // Occupation modal state
  const [showOccupationModal, setShowOccupationModal] = useState(false)
  const [selectedOccupation, setSelectedOccupation] =
    useState<OccupationTemplate | null>(null)
  const [pendingOccupationOption, setPendingOccupationOption] =
    useState<SceneInteractOption | null>(null)

  const screneChanged = useMemo(
    () => state.currentSceneKey && currentScene?.id !== state.currentSceneKey,
    [currentScene, state.currentSceneKey],
  )

  const [changingScrene, setChangingScrene] = useState(false)

  // 监听场景变化，触发双卡片动画
  useEffect(() => {
    if (!screneChanged) return
    const nextScene = state.sceneData?.[state.currentSceneKey]
    const isBack = state.history.length + 1 < takeNumber
    console.log('切换场景:')
    console.log(nextScene)
    console.log('当前场景效果:', currentScene?.effects)
    if (!isBack && nextScene?.effects && nextScene.effects.length > 0) {
      nextScene.effects.forEach(effect => {
        if (effect.isActive === false) return // Skip inactive effects
        dispatch({ type: 'APPLY_EFFECT', payload: effect })
      })
    }
    prevTranslateX.value = 0
    prevTranslateX.value = withTiming(isBack ? SCREEN_WIDTH : -SCREEN_WIDTH, {
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.cubic),
    })
    translateX.value = isBack ? -SCREEN_WIDTH : SCREEN_WIDTH
    translateX.value = withTiming(
      0,
      {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
      },
      () => {
        runOnJS(setCurrentScene)(nextScene)
        runOnJS(setTakeNumber)(state.history.length + 1)
        runOnJS(setChangingScrene)(false)
      },
    )
    setChangingScrene(true)
  }, [
    screneChanged,
    prevTranslateX,
    state.currentSceneKey,
    state.history.length,
    state.sceneData,
    takeNumber,
    translateX,
    currentScene?.effects,
    dispatch,
  ])

  // 动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      position: 'absolute',
    }
  })
  const prevAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: prevTranslateX.value }],
      position: 'absolute',
    }
  })

  const handleInteractOptionPress = useCallback(
    (option: SceneInteractOption, disabled?: boolean) => {
      if (disabled) return // Do nothing if the option is disabled

      if (option.type === 'check') {
        // For check options, effects are usually part of the checkPayload or applied pre-check.
        // The current PERFORM_INLINE_CHECK in reducer handles originalOption.effects.
        dispatch({
          type: 'PERFORM_INLINE_CHECK',
          payload: { checkPayload: option.check, originalOption: option },
        })
      } else if (option.type === 'goto') {
        // If this option has an occupation to apply, show the modal first
        if (option.applyOccupation) {
          const occupationTemplate = occupationTemplates[option.applyOccupation]
          if (occupationTemplate) {
            setSelectedOccupation(occupationTemplate)
            setPendingOccupationOption(option)
            setShowOccupationModal(true)
            return
          }
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
    [dispatch, navigation],
  )

  // Handle occupation modal confirm
  const handleOccupationConfirm = useCallback(() => {
    if (pendingOccupationOption && pendingOccupationOption.type === 'goto') {
      // Apply the occupation
      if (pendingOccupationOption.applyOccupation) {
        dispatch({
          type: 'APPLY_CHOSEN_OCCUPATION',
          payload: pendingOccupationOption.applyOccupation,
        })
      }

      // Then apply other effects
      if (
        pendingOccupationOption.effects &&
        pendingOccupationOption.effects.length > 0
      ) {
        pendingOccupationOption.effects.forEach(effect =>
          dispatch({ type: 'APPLY_EFFECT', payload: effect }),
        )
      }

      // Finally, change scene
      dispatch({
        type: 'CHANGE_SCENE',
        payload: pendingOccupationOption.goto,
      })
    }

    // Clear modal state
    setShowOccupationModal(false)
    setSelectedOccupation(null)
    setPendingOccupationOption(null)
  }, [pendingOccupationOption, dispatch])

  // Handle occupation modal cancel
  const handleOccupationCancel = useCallback(() => {
    setShowOccupationModal(false)
    setSelectedOccupation(null)
    setPendingOccupationOption(null)
  }, [])

  const handleResolveCheckOutcome = useCallback(() => {
    dispatch({ type: 'RESOLVE_CHECK_OUTCOME' })
  }, [dispatch])

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' })
  }, [dispatch])

  if (!currentScene) {
    return (
      <Animated.View style={[styles.storyCardContainer, animatedStyle]}>
        <Text style={styles.storyCardContentText}>{t('common.notFound')}</Text>
        <OptionButton onPress={goBack}>{t('common.goBack')}</OptionButton>
      </Animated.View>
    )
  }

  // 渲染卡片内容的函数，避免重复
  const renderCardContent = (scene: Scene, takeNum: number) => (
    <>
      <Text style={styles.takeText} onPress={goBack}>
        TAKE {takeNum}
      </Text>
      {scene.story.split('\n').map((paragraph, index) => (
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
          {scene.options?.map((option, index) => {
            const conditionResult = option.condition
              ? checkCondition(
                  option.condition,
                  state.characterData,
                  state.gameFlags,
                  state.history,
                )
              : { met: true, description: undefined }
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
      <Text style={styles.idText}>ID: {scene.id}</Text>
    </>
  )

  if (changingScrene) {
    return (
      <>
        <View style={styles.overlay} pointerEvents="auto" />
        {/* 旧卡片滑出动画 */}
        <Animated.View style={[styles.storyCardContainer, prevAnimatedStyle]}>
          {renderCardContent(currentScene, takeNumber)}
        </Animated.View>
        {changingScrene && (
          <Animated.View style={[styles.storyCardContainer, animatedStyle]}>
            {renderCardContent(
              state.sceneData?.[state.currentSceneKey],
              state.history.length + 1,
            )}
          </Animated.View>
        )}
      </>
    )
  }

  return (
    <>
      <View style={styles.storyCardContainer}>
        {renderCardContent(currentScene, takeNumber)}
      </View>
      <OccupationInfoModal
        visible={showOccupationModal}
        occupation={selectedOccupation}
        onConfirm={handleOccupationConfirm}
        onCancel={handleOccupationCancel}
      />
    </>
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
  idText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Inactive,
    marginTop: padding.Large,
    letterSpacing: 2,
    alignSelf: 'flex-end',
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
})

StoryCard.displayName = 'StoryCard'
export default StoryCard
