import { useAppReducer } from '../context/AppContext'
import { useCallback } from 'react'
import { CheckPayload, Effect, SceneInteractOption } from '../interface/Scene'

export const useCheckSystem = () => {
  const [state, dispatch] = useAppReducer()

  const performCheck = useCallback(
    (checkPayload: CheckPayload, originalOption?: SceneInteractOption) => {
      dispatch({
        type: 'PERFORM_INLINE_CHECK',
        payload: { checkPayload, originalOption },
      })
    },
    [dispatch],
  )

  const resolveCheck = useCallback(() => {
    dispatch({ type: 'RESOLVE_CHECK_OUTCOME' })
  }, [dispatch])

  const clearCheck = useCallback(() => {
    dispatch({ type: 'CLEAR_CHECK_ATTEMPT' })
  }, [dispatch])

  const applyEffect = useCallback(
    (effect: Effect) => {
      dispatch({ type: 'APPLY_EFFECT', payload: effect })
    },
    [dispatch],
  )

  return {
    // 状态
    currentCheck: state.currentCheckAttempt,
    pendingCheck: state.pendingCheckResultData,
    diceAnimation: state.diceRollAnimation,

    // 操作
    actions: {
      performCheck,
      resolveCheck,
      clearCheck,
      applyEffect,
    },
  }
}
