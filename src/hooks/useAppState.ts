import { useAppReducer } from '../context/AppContext'
import { useMemo } from 'react'

// 选择性订阅 Hook - 只订阅当前场景相关的状态
export const useCurrentScene = () => {
  const [state] = useAppReducer()

  return useMemo(
    () => ({
      currentSceneKey: state.currentSceneKey,
      sceneData: state.sceneData[state.currentSceneKey],
      history: state.history,
    }),
    [state.currentSceneKey, state.sceneData, state.history],
  )
}

// 选择性订阅 Hook - 只订阅角色数据
export const useCharacterData = () => {
  const [state] = useAppReducer()
  return useMemo(() => state.characterData, [state.characterData])
}

// 选择性订阅 Hook - 只订阅语言设置
export const useLanguage = () => {
  const [state] = useAppReducer()
  return useMemo(() => state.language, [state.language])
}

// 选择性订阅 Hook - 只订阅游戏标志
export const useGameFlags = () => {
  const [state] = useAppReducer()
  return useMemo(() => state.gameFlags, [state.gameFlags])
}

// 选择性订阅 Hook - 只订阅模态框状态
export const useModalStates = () => {
  const [state] = useAppReducer()

  return useMemo(
    () => ({
      isCharacterModalVisible: state.isCharacterModalVisible,
    }),
    [state.isCharacterModalVisible],
  )
}
