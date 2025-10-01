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

      if (newSceneKey === '1') {
        // Reset history, characterData, and gameFlags when going to scene '1'
        newState.history = []
        newState.characterData = defaultInitialState.characterData // Reset to initial character
        newState.gameFlags = defaultInitialState.gameFlags // Reset to initial game flags (empty object)
        console.log('State reset for new game (scene 1).')
      } else if (state.currentSceneKey !== newSceneKey) {
        newState.history = [...state.history, state.currentSceneKey]
      }

      newState.currentSceneKey = newSceneKey
      saveStateToStorage(newState)
      return newState
    }

    case 'GO_BACK': {
      newState.currentCheckAttempt = null
      if (newState.history.length === 0) {
        return newState // Cannot go back if history is empty
      }

      const previousSceneKey = newState.history[newState.history.length - 1]
      newState.currentSceneKey = previousSceneKey
      newState.history = newState.history.slice(0, -1)

      // Check if the new current scene is '1' after going back
      if (newState.currentSceneKey === '1') {
        // Reset history, characterData, and gameFlags when going back to scene '1'
        // Note: history is already modified above, so we just ensure it's empty if current is '1'
        // However, typically, if currentSceneKey becomes '1' via GO_BACK, history should be empty.
        // For safety, explicitly set history to [] if we land on '1'.
        newState.history = []
        newState.characterData = defaultInitialState.characterData // Reset to initial character
        newState.gameFlags = defaultInitialState.gameFlags // Reset to initial game flags (empty object)
        console.log(
          'State reset for new game (returned to scene 1 via GO_BACK).',
        )
      }

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

      const { rollValue, resultType, diceFaces, targetValue, rolls } =
        executeCheckLogic(
          // Added diceFaces here
          tempState,
          checkPayload.details,
        )

      // Trigger dice roll animation
      // Now executeCheckLogic returns diceFaces
      if (rollValue !== undefined && diceFaces !== undefined) {
        tempState.diceRollAnimation = {
          isVisible: true,
          rollResult: rollValue,
          diceFaces: diceFaces, // Use diceFaces from executeCheckLogic
          resultType: resultType, // Added resultType
          targetValue: targetValue, // Added targetValue
        }
      }

      // Store pending check data instead of directly setting currentCheckAttempt
      tempState.pendingCheckResultData = {
        checkPayload,
        originalOption,
        targetValue,
        rollValue: rollValue as number, // Assuming rollValue is always defined if diceFaces is
        resultType: resultType as CheckOutcome, // Assuming resultType is always defined
        diceFaces: diceFaces as number, // Assuming diceFaces is always defined
        rolls,
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
        nextSceneIdOnFumble, // Added fumble scene id
        effectsToApplyOnSuccess,
        effectsToApplyOnFailure,
        effectsToApplyOnFumble,
      } = newState.currentCheckAttempt

      let effectsToApply: Effect[] | undefined
      let nextSceneId: string | undefined

      if (resultType === CheckOutcome.FUMBLE && nextSceneIdOnFumble) {
        // Prioritize fumble outcome
        effectsToApply = effectsToApplyOnFumble
          ? effectsToApplyOnFumble
          : effectsToApplyOnFailure // Fumble usually implies failure effects
        nextSceneId = nextSceneIdOnFumble
      } else if (
        resultType === CheckOutcome.SUCCESS ||
        resultType === CheckOutcome.CRITICAL_SUCCESS
      ) {
        effectsToApply = effectsToApplyOnSuccess
        nextSceneId = nextSceneIdOnSuccess
      } else {
        // Handles FAILURE and FUMBLE (when onFumbleSceneId is not provided)
        effectsToApply = effectsToApplyOnFailure
        nextSceneId = nextSceneIdOnFailure
      }

      newState = applyAllEffects(newState, effectsToApply)

      if (newState.currentSceneKey !== nextSceneId) {
        newState.history = [...newState.history, newState.currentSceneKey]
      }
      if (nextSceneId) {
        newState.currentSceneKey = nextSceneId
      }
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

    // New cases for dice roll animation
    case 'SHOW_DICE_ROLL_ANIMATION':
      return {
        ...newState,
        diceRollAnimation: {
          isVisible: true,
          rollResult: action.payload.rollResult,
          diceFaces: action.payload.diceFaces,
          resultType: action.payload.resultType,
          targetValue: action.payload.targetValue,
        },
      }

    case 'HIDE_DICE_ROLL_ANIMATION': {
      const finalState = {
        ...newState,
        diceRollAnimation: {
          ...newState.diceRollAnimation,
          isVisible: false,
        },
      }
      if (finalState.pendingCheckResultData) {
        const {
          checkPayload,
          originalOption,
          rollValue,
          resultType,
          targetValue,
          rolls,
          // diceFaces is in pendingCheckResultData but not directly used for currentCheckAttempt here
        } = finalState.pendingCheckResultData

        finalState.currentCheckAttempt = {
          checkDefinition: checkPayload.details,
          rollValue,
          resultType,
          targetValue,
          rolls,
          successMessage: checkPayload.successText,
          failureMessage: checkPayload.failureText,
          fumbleMessage: checkPayload.fumbleText, // Pass fumble text
          nextSceneIdOnSuccess: checkPayload.onSuccessSceneId,
          nextSceneIdOnFailure: checkPayload.onFailureSceneId,
          nextSceneIdOnFumble: checkPayload.onFumbleSceneId, // Pass fumble scene id
          effectsToApplyOnSuccess: checkPayload.onSuccessEffects,
          effectsToApplyOnFailure: checkPayload.onFailureEffects,
          effectsToApplyOnFumble: checkPayload.onFumbleEffects, // Pass fumble effects
          originalOption: originalOption,
        }
        finalState.pendingCheckResultData = null // Clear pending data
        // Potentially save state here if currentCheckAttempt update should be persisted immediately
        // saveStateToStorage(finalState);
      }
      return finalState
    }

    case 'CLEAR_EFFECT_INFO_TO_SHOW':
      return {
        ...newState,
        effectInfoToShow: null,
      }

    default:
      return newState
  }
}
