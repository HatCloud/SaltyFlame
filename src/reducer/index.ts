import {
  AppAction,
  MyAppState,
  Language,
  initialState as defaultInitialState,
} from '../interface/MyAppState'
import { Effect } from '../interface/Scene'
import { CheckOutcome } from '../constant/enums'
import { Character } from '../interface/Character'
import { OccupationKey } from '../data/occupations'

// Import new helper functions
import { saveStateToStorage } from './persistence'
import { executeCheckLogic } from './checkLogic'
import { applyAllEffects, applySingleEffect } from './effects'
import { applyOccupationToCharacter } from './occupationLogic'

// --- Reducer ---

export const appReducer = (
  state: MyAppState,
  action: AppAction,
): MyAppState => {
  console.log(
    'Action dispatched:',
    action.type,
    'payload' in action ? action.payload : undefined,
  )
  let newState = { ...state }

  switch (action.type) {
    case 'HYDRATE_STATE':
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newState = { ...defaultInitialState, ...(action.payload as any) }
      console.log('State hydrated from AsyncStorage:', newState)
      return newState

    case 'CHANGE_SCENE': {
      const newSceneKey = action.payload as string
      newState.currentCheckAttempt = null
      if (state.currentSceneKey !== newSceneKey) {
        newState.history = [...state.history, state.currentSceneKey]
      }
      newState.currentSceneKey = newSceneKey
      saveStateToStorage(newState)
      return newState
    }

    case 'GO_BACK': {
      newState.currentCheckAttempt = null
      if (newState.history.length === 0) {
        return newState
      }
      const previousSceneKey = newState.history[newState.history.length - 1]
      newState.currentSceneKey = previousSceneKey
      newState.history = newState.history.slice(0, -1)
      saveStateToStorage(newState)
      return newState
    }

    case 'SET_LANGUAGE':
      newState = {
        ...newState,
        language: action.payload as Language,
      }
      saveStateToStorage(newState)
      return newState

    case 'APPLY_EFFECT':
      newState = applySingleEffect(newState, action.payload as Effect)
      saveStateToStorage(newState)
      return newState

    case 'PERFORM_INLINE_CHECK': {
      const { checkPayload, originalOption } = action.payload
      let tempState = { ...newState }

      if (originalOption && originalOption.effects) {
        tempState = applyAllEffects(tempState, originalOption.effects)
        saveStateToStorage(tempState)
      }

      const { rollValue, resultType } = executeCheckLogic(
        tempState,
        checkPayload.details,
      )

      tempState.currentCheckAttempt = {
        checkDefinition: checkPayload.details,
        rollValue,
        resultType,
        successMessage: checkPayload.successText,
        failureMessage: checkPayload.failureText,
        nextSceneIdOnSuccess: checkPayload.onSuccessSceneId,
        nextSceneIdOnFailure: checkPayload.onFailureSceneId,
        effectsToApplyOnSuccess: checkPayload.onSuccessEffects,
        effectsToApplyOnFailure: checkPayload.onFailureEffects,
        originalOption: originalOption,
      }
      return tempState
    }

    case 'RESOLVE_CHECK_OUTCOME': {
      if (!newState.currentCheckAttempt) {
        console.warn('RESOLVE_CHECK_OUTCOME called without a pending check.')
        return newState
      }

      const {
        resultType,
        nextSceneIdOnSuccess,
        nextSceneIdOnFailure,
        effectsToApplyOnSuccess,
        effectsToApplyOnFailure,
      } = newState.currentCheckAttempt

      let effectsToApply: Effect[] | undefined
      let nextSceneId: string

      const wasSuccess =
        resultType === CheckOutcome.SUCCESS ||
        resultType === CheckOutcome.CRITICAL_SUCCESS

      if (wasSuccess) {
        effectsToApply = effectsToApplyOnSuccess
        nextSceneId = nextSceneIdOnSuccess
      } else {
        effectsToApply = effectsToApplyOnFailure
        nextSceneId = nextSceneIdOnFailure
      }

      newState = applyAllEffects(newState, effectsToApply)

      if (newState.currentSceneKey !== nextSceneId) {
        newState.history = [...newState.history, newState.currentSceneKey]
      }
      newState.currentSceneKey = nextSceneId
      newState.currentCheckAttempt = null
      saveStateToStorage(newState)
      return newState
    }

    case 'CLEAR_CHECK_ATTEMPT':
      return {
        ...newState,
        currentCheckAttempt: null,
      }

    case 'TOGGLE_CHARACTER_MODAL':
      return {
        ...newState,
        isCharacterModalVisible: !newState.isCharacterModalVisible,
      }

    case 'STORE_CHARACTER':
      newState = {
        ...newState,
        characterData: action.payload as Character,
      }
      saveStateToStorage(newState)
      return newState

    case 'APPLY_CHOSEN_OCCUPATION': {
      const occupationKey = action.payload as OccupationKey // Ensure payload is OccupationKey
      const updatedCharacterData = applyOccupationToCharacter(
        newState.characterData,
        occupationKey,
        newState.language,
      )

      if (updatedCharacterData) {
        newState = {
          ...newState,
          characterData: updatedCharacterData,
        }
        saveStateToStorage(newState)
      }
      return newState
    }

    default:
      return newState
  }
}
