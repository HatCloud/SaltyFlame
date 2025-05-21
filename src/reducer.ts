import {
  AppAction,
  MyAppState,
  Language,
  // CheckAttemptState, // Not directly used in this file for annotations
} from './interface/MyAppState'
import {
  SceneId,
  Effect,
  // SceneInteractOption, // Not directly used for annotations here; type comes via AppAction
  Check,
  SimpleOption,
} from './interface/Scene'
import {EffectType, CheckDifficulty} from './interface/enums'

// --- Helper Functions ---

const rollD100 = (): number => Math.floor(Math.random() * 100) + 1

type CheckResult = 'criticalSuccess' | 'success' | 'failure' | 'criticalFailure'

function executeCheckLogic(
  state: MyAppState,
  check: Check,
): {rollValue: number; result: CheckResult} {
  const characterValue = 50 // Placeholder
  const roll = rollD100()
  let targetValue = characterValue

  switch (check.difficulty) {
    case CheckDifficulty.HARD:
      targetValue = Math.floor(characterValue / 2)
      break
    case CheckDifficulty.EXTREME:
      targetValue = Math.floor(characterValue / 5)
      break
    case CheckDifficulty.NORMAL:
    default:
      break
  }

  let result: CheckResult
  if (roll <= targetValue) {
    if (roll === 1 || (roll <= 5 && targetValue >= 25))
      result = 'criticalSuccess'
    else result = 'success'
  } else {
    if (roll === 100 || (roll >= 96 && targetValue < 50))
      result = 'criticalFailure'
    else result = 'failure'
  }
  return {rollValue: roll, result}
}

function applySingleEffect(state: MyAppState, effect: Effect): MyAppState {
  const newCharacterData = {...state.characterData}
  switch (effect.type) {
    case EffectType.CHANGE_HP:
      if (typeof effect.value === 'number') {
        newCharacterData.hitPoints.current =
          (newCharacterData.hitPoints.current || 0) + effect.value
      }
      console.log(
        `Applied HP Change: ${effect.value}, New HP: ${newCharacterData.hitPoints.current}`,
      )
      break
    case EffectType.CHANGE_SANITY:
      if (typeof effect.value === 'number') {
        newCharacterData.sanity.current =
          (newCharacterData.sanity.current || 0) + effect.value
      }
      console.log(
        `Applied Sanity Change: ${effect.value}, New Sanity: ${newCharacterData.sanity.current}`,
      )
      break
    // Add other effect types
  }
  return {...state, characterData: newCharacterData}
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
  let newState = {...state}

  switch (action.type) {
    case 'CHANGE_SCENE': {
      const newSceneKey = action.payload as SceneId
      // Clear any pending check when changing scene directly
      newState.currentCheckAttempt = null
      if (state.currentSceneKey !== newSceneKey) {
        newState.history = [...state.history, state.currentSceneKey]
      }
      newState.currentSceneKey = newSceneKey

      const newScene = newState.sceneData[newSceneKey]
      if (newScene) {
        newState = applyAllEffects(newState, newScene.entryEffects)
      }
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

    case 'PERFORM_SCENE_CHECK': {
      const {checkDetails} = action.payload
      const {rollValue, result} = executeCheckLogic(
        newState,
        checkDetails.check,
      )

      let outcomeOptionToDisplay: SimpleOption
      if (result === 'criticalSuccess' && checkDetails.criticalSuccess) {
        outcomeOptionToDisplay = checkDetails.criticalSuccess
      } else if (result === 'success' || result === 'criticalSuccess') {
        outcomeOptionToDisplay = checkDetails.success
      } else if (result === 'criticalFailure' && checkDetails.criticalFailure) {
        outcomeOptionToDisplay = checkDetails.criticalFailure
      } else {
        outcomeOptionToDisplay = checkDetails.failure
      }

      newState.currentCheckAttempt = {
        checkDefinition: checkDetails.check,
        rollValue,
        result,
        outcomeOptionToDisplay,
        isSceneCheck: true,
      }
      return newState // Scene does not change yet
    }

    case 'PERFORM_OPTION_CHECK': {
      const {option} = action.payload
      if (!option.check) return newState

      const {rollValue, result} = executeCheckLogic(newState, option.check)

      let outcomeGoto: SceneId
      let outcomeEffects: Effect[] = [...(option.effects || [])] // Start with base option effects
      let outcomeText = option.text // Default to original option text or modify based on result

      if (result === 'success' || result === 'criticalSuccess') {
        outcomeGoto = option.successGoto || option.goto
        if (option.successEffects)
          outcomeEffects = [...outcomeEffects, ...option.successEffects]
        outcomeText = `${option.text || '检定'} (成功)` // Example text update
      } else {
        outcomeGoto = option.failureGoto || option.goto
        if (option.failureEffects)
          outcomeEffects = [...outcomeEffects, ...option.failureEffects]
        outcomeText = `${option.text || '检定'} (失败)` // Example text update
      }

      newState.currentCheckAttempt = {
        checkDefinition: option.check,
        rollValue,
        result,
        outcomeOptionToDisplay: {
          goto: outcomeGoto,
          effects: outcomeEffects,
          text: outcomeText, // This text will be for the button to resolve the check
        },
        isSceneCheck: false,
        originalOptionPayload: option,
      }
      return newState // Scene does not change yet
    }

    case 'RESOLVE_CHECK_OUTCOME': {
      if (
        !newState.currentCheckAttempt ||
        !newState.currentCheckAttempt.outcomeOptionToDisplay
      ) {
        return newState // Should not happen
      }
      const {goto, effects} =
        newState.currentCheckAttempt.outcomeOptionToDisplay

      newState = applyAllEffects(newState, effects)

      if (newState.currentSceneKey !== goto) {
        newState.history = [...newState.history, newState.currentSceneKey]
      }
      newState.currentSceneKey = goto
      const nextSceneData = newState.sceneData[goto]
      if (nextSceneData) {
        newState = applyAllEffects(newState, nextSceneData.entryEffects)
      }
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
