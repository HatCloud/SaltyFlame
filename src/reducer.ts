import {
  AppAction,
  MyAppState,
  Language,
  // CheckAttemptState,
} from './interface/MyAppState'
import { Effect, Check } from './interface/Scene'
import { EffectType, CheckDifficulty } from './interface/enums'
import { Character } from './interface/Character' // Import Character type

// --- Helper Functions ---

const rollD100 = (): number => Math.floor(Math.random() * 100) + 1

// Simplified result for now, can be expanded later if criticals have distinct general logic
function executeCheckLogic(
  state: MyAppState,
  check: Check,
): { rollValue: number; isSuccess: boolean } {
  const characterValue = 50 // Placeholder for actual character skill/characteristic
  const roll = rollD100()
  let targetValue = characterValue

  switch (check.difficulty) {
    case CheckDifficulty.HARD:
      targetValue = Math.floor(characterValue / 2)
      break
    case CheckDifficulty.EXTREME:
      targetValue = Math.floor(characterValue / 5)
      break
    // case CheckDifficulty.NORMAL: // Default is normal
    default:
      break
  }

  // Basic success/failure. Criticals could be handled by specific effect text or later logic.
  const isSuccess = roll <= targetValue
  // TODO: Consider if critical success/failure (e.g. roll 1 or 100) should modify isSuccess
  // or be handled via specific text/effects from CheckPayload.
  // For now, a roll of 1 is success, 100 is failure if targetValue is typical.
  return { rollValue: roll, isSuccess }
}

function applySingleEffect(state: MyAppState, effect: Effect): MyAppState {
  if (!state.characterData) {
    console.warn(
      'Attempted to apply effect when characterData is null. Effect:',
      effect,
    )
    return state
  }

  // Now we know state.characterData is not null, so it must be a Character object.
  const newCharacterData = { ...state.characterData } // This should be safe.
  const newGameFlags = { ...state.gameFlags }

  switch (effect.type) {
    case EffectType.CHANGE_HP:
      if (typeof effect.value === 'number') {
        // Since hitPoints and hitPoints.current are mandatory in Character, direct assignment is fine.
        newCharacterData.hitPoints.current += effect.value
      }
      console.log(
        `Applied HP Change: ${effect.value}, New HP: ${newCharacterData.hitPoints.current}`,
      )
      break
    case EffectType.CHANGE_SANITY:
      if (typeof effect.value === 'number') {
        // Since sanity and sanity.current are mandatory in Character, direct assignment is fine.
        newCharacterData.sanity.current += effect.value
      }
      console.log(
        `Applied Sanity Change: ${effect.value}, New Sanity: ${newCharacterData.sanity.current}`,
      )
      break
    case EffectType.SET_FLAG:
      if (effect.gameFlag) {
        newGameFlags[effect.gameFlag] =
          effect.flagValue !== undefined ? effect.flagValue : true
        console.log(
          `Set flag: ${effect.gameFlag} to ${newGameFlags[effect.gameFlag]}`,
        )
      }
      break
    case EffectType.CLEAR_FLAG:
      if (effect.gameFlag) {
        delete newGameFlags[effect.gameFlag]
        // Or set to false: newGameFlags[effect.gameFlag] = false;
        // Depending on how "cleared" flags should be interpreted.
        // Current ConditionType.FLAG_NOT_SET might expect it to be explicitly false or undefined.
        // Let's go with delete for now, as it's cleaner for "not set".
        console.log(`Cleared flag: ${effect.gameFlag}`)
      }
      break
    // TODO: Implement ADD_ITEM, REMOVE_ITEM, MARK_SKILL_SUCCESS, LEARN_SPELL
    // For ADD_ITEM/REMOVE_ITEM, you might use gameFlags like `item_itemName: true/false`
    // or add an `inventory: string[]` to characterData.
    // For now, these will fall through.
    default:
      console.warn(`Unhandled effect type: ${effect.type}`)
      break
  }
  // Ensure the returned characterData conforms to Character type.
  // If newCharacterData was correctly typed as Character from the spread, this should be fine.
  return {
    ...state,
    characterData: newCharacterData as Character,
    gameFlags: newGameFlags,
  }
}

function applyAllEffects(state: MyAppState, effects?: Effect[]): MyAppState {
  if (!effects || effects.length === 0) return state
  return effects.reduce(
    (currentState, effect) => applySingleEffect(currentState, effect),
    state,
  )
}

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
    case 'CHANGE_SCENE': {
      const newSceneKey = action.payload as string // SceneId removed
      // Clear any pending check when changing scene directly
      newState.currentCheckAttempt = null
      if (state.currentSceneKey !== newSceneKey) {
        newState.history = [...state.history, state.currentSceneKey]
      }
      newState.currentSceneKey = newSceneKey
      // entryEffects removed from Scene type
      return newState
    }

    case 'GO_BACK': {
      // Clear any pending check when going back
      newState.currentCheckAttempt = null
      if (newState.history.length === 0) {
        return newState
      }
      const previousSceneKey = newState.history[newState.history.length - 1]
      newState.currentSceneKey = previousSceneKey
      newState.history = newState.history.slice(0, -1)
      return newState
    }

    case 'SET_LANGUAGE':
      return {
        ...newState,
        language: action.payload as Language,
      }

    case 'APPLY_EFFECT':
      return applySingleEffect(newState, action.payload as Effect)

    // PERFORM_SCENE_CHECK and PERFORM_OPTION_CHECK are removed.
    // New handler for PERFORM_INLINE_CHECK:
    case 'PERFORM_INLINE_CHECK': {
      const { checkPayload, originalOption } = action.payload
      let tempState = { ...newState }

      // Apply effects from the original option before performing the check, if any
      if (originalOption && originalOption.effects) {
        tempState = applyAllEffects(tempState, originalOption.effects)
      }

      const { rollValue, isSuccess } = executeCheckLogic(
        tempState, // Use tempState which has pre-check effects applied
        checkPayload.details,
      )

      tempState.currentCheckAttempt = {
        checkDefinition: checkPayload.details,
        rollValue,
        isSuccess,
        successMessage: checkPayload.successText,
        failureMessage: checkPayload.failureText,
        nextSceneIdOnSuccess: checkPayload.onSuccessSceneId,
        nextSceneIdOnFailure: checkPayload.onFailureSceneId,
        effectsToApplyOnSuccess: checkPayload.onSuccessEffects,
        effectsToApplyOnFailure: checkPayload.onFailureEffects,
        originalOption: originalOption, // Store the original option if provided
      }
      return tempState // Scene does not change yet, only currentCheckAttempt is updated
    }

    case 'RESOLVE_CHECK_OUTCOME': {
      if (!newState.currentCheckAttempt) {
        console.warn('RESOLVE_CHECK_OUTCOME called without a pending check.')
        return newState // Should not happen if UI logic is correct
      }

      const {
        isSuccess,
        nextSceneIdOnSuccess,
        nextSceneIdOnFailure,
        effectsToApplyOnSuccess,
        effectsToApplyOnFailure,
      } = newState.currentCheckAttempt

      let effectsToApply: Effect[] | undefined
      let nextSceneId: string

      if (isSuccess) {
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
      // entryEffects removed from Scene type
      newState.currentCheckAttempt = null // Clear the check attempt
      return newState
    }

    case 'CLEAR_CHECK_ATTEMPT':
      return {
        ...newState,
        currentCheckAttempt: null,
      }

    default:
      return newState
  }
}
