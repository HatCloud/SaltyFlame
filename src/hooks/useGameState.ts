import { useAppReducer } from '../context/AppContext'
import { useCallback } from 'react'
import { Language } from '../interface/MyAppState'

export const useGameState = () => {
  const [state, dispatch] = useAppReducer()

  const changeScene = useCallback(
    (sceneKey: string) => {
      dispatch({ type: 'CHANGE_SCENE', payload: sceneKey })
    },
    [dispatch],
  )

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' })
  }, [dispatch])

  const setLanguage = useCallback(
    (language: Language) => {
      dispatch({ type: 'SET_LANGUAGE', payload: language })
    },
    [dispatch],
  )

  const toggleCharacterModal = useCallback(() => {
    dispatch({ type: 'TOGGLE_CHARACTER_MODAL' })
  }, [dispatch])

  return {
    // 状态
    currentScene: state.currentSceneKey,
    history: state.history,
    language: state.language,
    isCharacterModalVisible: state.isCharacterModalVisible,
    characterData: state.characterData,
    gameFlags: state.gameFlags,

    // 操作
    actions: {
      changeScene,
      goBack,
      setLanguage,
      toggleCharacterModal,
    },
  }
}
