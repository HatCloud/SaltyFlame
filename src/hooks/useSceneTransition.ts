import { useEffect, useState, useMemo } from 'react'
import {
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated'
import { Dimensions } from 'react-native'
import { useCheckSystem } from './useCheckSystem'
import type { Scene } from '../interface/Scene'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ANIMATION_DURATION = 800

interface UseSceneTransitionProps {
  currentScene: Scene | undefined
  currentSceneKey: string
  sceneData: Record<string, Scene> | undefined
  historyLength: number
}

export const useSceneTransition = ({
  currentScene,
  currentSceneKey,
  sceneData,
  historyLength,
}: UseSceneTransitionProps) => {
  const { actions: checkActions } = useCheckSystem()

  const translateX = useSharedValue(SCREEN_WIDTH)
  const prevTranslateX = useSharedValue(0)

  const [takeNumber, setTakeNumber] = useState(() => historyLength + 1)
  const [internalCurrentScene, setInternalCurrentScene] = useState<
    Scene | undefined
  >(currentScene)
  const [changingScene, setChangingScene] = useState(false)

  const sceneChanged = useMemo(
    () => currentSceneKey && internalCurrentScene?.id !== currentSceneKey,
    [internalCurrentScene, currentSceneKey],
  )

  // 监听场景变化，触发双卡片动画
  useEffect(() => {
    if (!sceneChanged) return

    const nextScene = sceneData?.[currentSceneKey]
    const isBack = historyLength + 1 < takeNumber

    console.log('切换场景:', nextScene)
    console.log('当前场景效果:', internalCurrentScene?.effects)

    if (!isBack && nextScene?.effects && nextScene.effects.length > 0) {
      nextScene.effects.forEach(effect => {
        if (effect.isActive === false) return // Skip inactive effects
        checkActions.applyEffect(effect)
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
        runOnJS(setInternalCurrentScene)(nextScene)
        runOnJS(setTakeNumber)(historyLength + 1)
        runOnJS(setChangingScene)(false)
      },
    )
    setChangingScene(true)
  }, [
    sceneChanged,
    prevTranslateX,
    currentSceneKey,
    historyLength,
    sceneData,
    takeNumber,
    translateX,
    internalCurrentScene?.effects,
    checkActions,
  ])

  return {
    translateX,
    prevTranslateX,
    takeNumber,
    currentScene: internalCurrentScene,
    changingScene,
    animationDuration: ANIMATION_DURATION,
  }
}
