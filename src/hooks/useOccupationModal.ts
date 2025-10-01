import { useState, useCallback } from 'react'
import { useAppReducer } from '../context/AppContext'
import { useCheckSystem } from './useCheckSystem'
import { useGameState } from './useGameState'
import { occupationTemplates } from '../data/occupations'
import type { OccupationTemplate } from '../interface/OccupationTemplate'
import type { SceneInteractOption, Effect } from '../interface/Scene'

// Type guard for goto option with occupation
interface GotoOptionWithOccupation {
  type: 'goto'
  goto: string
  applyOccupation?: string
  effects?: Effect[]
  text?: string
}

export const useOccupationModal = () => {
  const [, dispatch] = useAppReducer()
  const { actions: checkActions } = useCheckSystem()
  const { actions: gameActions } = useGameState()

  const [showOccupationModal, setShowOccupationModal] = useState(false)
  const [selectedOccupation, setSelectedOccupation] =
    useState<OccupationTemplate | null>(null)
  const [pendingOccupationOption, setPendingOccupationOption] =
    useState<SceneInteractOption | null>(null)

  const showModal = useCallback((option: SceneInteractOption) => {
    if (option.type === 'goto') {
      const gotoOption = option as GotoOptionWithOccupation
      if (gotoOption.applyOccupation) {
        const occupationTemplate =
          occupationTemplates[gotoOption.applyOccupation]
        if (occupationTemplate) {
          setSelectedOccupation(occupationTemplate)
          setPendingOccupationOption(option)
          setShowOccupationModal(true)
          return true
        }
      }
    }
    return false
  }, [])

  const handleConfirm = useCallback(() => {
    if (pendingOccupationOption && pendingOccupationOption.type === 'goto') {
      const gotoOption = pendingOccupationOption as GotoOptionWithOccupation
      // Apply the occupation
      if (gotoOption.applyOccupation) {
        dispatch({
          type: 'APPLY_CHOSEN_OCCUPATION',
          payload: gotoOption.applyOccupation,
        })
      }

      // Then apply other effects
      if (
        pendingOccupationOption.effects &&
        pendingOccupationOption.effects.length > 0
      ) {
        pendingOccupationOption.effects.forEach(effect =>
          checkActions.applyEffect(effect),
        )
      }

      // Finally, change scene
      gameActions.changeScene(pendingOccupationOption.goto)
    }

    // Clear modal state
    setShowOccupationModal(false)
    setSelectedOccupation(null)
    setPendingOccupationOption(null)
  }, [pendingOccupationOption, dispatch, checkActions, gameActions])

  const handleCancel = useCallback(() => {
    setShowOccupationModal(false)
    setSelectedOccupation(null)
    setPendingOccupationOption(null)
  }, [])

  return {
    showOccupationModal,
    selectedOccupation,
    showModal,
    handleConfirm,
    handleCancel,
  }
}
