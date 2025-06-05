import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  AppAction,
  MyAppState,
  Language,
  initialState as defaultInitialState, // Rename to avoid conflict
} from './interface/MyAppState'
import { Effect, Check } from './interface/Scene'
import { EffectType, CheckDifficulty, SkillKey } from './constant/enums' // Added SkillKey
import { Character } from './interface/Character' // Import Character type
import { parseDiceString } from './utils/utils' // Import parseDiceString

// --- AsyncStorage Keys ---
const PERSISTED_STATE_KEY = 'SaltyFlameAppState'

// Fields to persist
const PERSISTED_FIELDS: (keyof MyAppState)[] = [
  'currentSceneKey',
  'history',
  'characterData',
  'language',
  'gameFlags',
]

// --- Helper Functions ---

// Function to save relevant parts of the state to AsyncStorage
const saveStateToStorage = async (state: MyAppState) => {
  try {
    const stateToPersist: Partial<MyAppState> = {}
    PERSISTED_FIELDS.forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(stateToPersist as any)[key] = state[key]
    })
    const jsonValue = JSON.stringify(stateToPersist)
    await AsyncStorage.setItem(PERSISTED_STATE_KEY, jsonValue)
    console.log('State persisted to AsyncStorage:', stateToPersist)
  } catch (e) {
    console.error('Failed to save state to AsyncStorage:', e)
  }
}

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
    case EffectType.CHANGE_HP: {
      let hpChange = 0
      if (typeof effect.value === 'number') {
        hpChange = effect.value
      } else if (typeof effect.value === 'string') {
        hpChange = parseDiceString(effect.value)
      }
      // Since hitPoints and hitPoints.current are mandatory in Character, direct assignment is fine.
      newCharacterData.hitPoints.current += hpChange
      console.log(
        `Applied HP Change: ${hpChange} (from ${effect.value}), New HP: ${newCharacterData.hitPoints.current}`,
      )
      break
    }
    case EffectType.CHANGE_SANITY: {
      let sanityChange = 0
      if (typeof effect.value === 'number') {
        sanityChange = effect.value
      } else if (typeof effect.value === 'string') {
        sanityChange = parseDiceString(effect.value)
      }
      // Since sanity and sanity.current are mandatory in Character, direct assignment is fine.
      newCharacterData.sanity.current += sanityChange
      console.log(
        `Applied Sanity Change: ${sanityChange} (from ${effect.value}), New Sanity: ${newCharacterData.sanity.current}`,
      )
      break
    }
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
        console.log(`Cleared flag: ${effect.gameFlag}`)
      }
      break
    case EffectType.ADD_ITEM:
      if (effect.item) {
        // Ensure inventory exists and is an array
        if (!Array.isArray(newCharacterData.inventory)) {
          newCharacterData.inventory = [] // Should not happen if initialState is correct
        }

        const itemToAdd = effect.item
        let alreadyExists = false
        if (typeof itemToAdd === 'string') {
          alreadyExists = newCharacterData.inventory.some(
            invItem => typeof invItem === 'string' && invItem === itemToAdd,
          )
        } else {
          // itemToAdd is a Weapon object
          alreadyExists = newCharacterData.inventory.some(
            invItem =>
              typeof invItem !== 'string' && invItem.name === itemToAdd.name,
          )
        }

        if (!alreadyExists) {
          newCharacterData.inventory.push(itemToAdd)
          const itemName =
            typeof itemToAdd === 'string' ? itemToAdd : itemToAdd.name
          console.log(
            `Added item: ${itemName}. Inventory: ${newCharacterData.inventory
              .map(i => (typeof i === 'string' ? i : i.name))
              .join(', ')}`,
          )
        } else {
          const itemName =
            typeof itemToAdd === 'string' ? itemToAdd : itemToAdd.name
          console.log(
            `Item ${itemName} already in inventory. Inventory: ${newCharacterData.inventory
              .map(i => (typeof i === 'string' ? i : i.name))
              .join(', ')}`,
          )
        }
      }
      break
    case EffectType.REMOVE_ITEM:
      if (effect.item && Array.isArray(newCharacterData.inventory)) {
        const itemToRemove = effect.item
        let itemIndex = -1

        if (typeof itemToRemove === 'string') {
          itemIndex = newCharacterData.inventory.findIndex(
            invItem => typeof invItem === 'string' && invItem === itemToRemove,
          )
        } else {
          // itemToRemove is a Weapon object, remove by name
          itemIndex = newCharacterData.inventory.findIndex(
            invItem =>
              typeof invItem !== 'string' && invItem.name === itemToRemove.name,
          )
        }

        if (itemIndex > -1) {
          const removed = newCharacterData.inventory.splice(itemIndex, 1)[0]
          const itemName = typeof removed === 'string' ? removed : removed.name
          console.log(
            `Removed item: ${itemName}. Inventory: ${newCharacterData.inventory
              .map(i => (typeof i === 'string' ? i : i.name))
              .join(', ')}`,
          )
        } else {
          const itemName =
            typeof itemToRemove === 'string' ? itemToRemove : itemToRemove.name
          console.log(
            `Item ${itemName} not found in inventory. Inventory: ${newCharacterData.inventory
              .map(i => (typeof i === 'string' ? i : i.name))
              .join(', ')}`,
          )
        }
      }
      break
    case EffectType.MARK_SKILL_SUCCESS:
      if (effect.target && typeof effect.target === 'string') {
        // Ensure markedSkills exists and is an array
        if (!Array.isArray(newCharacterData.markedSkills)) {
          newCharacterData.markedSkills = []
        }
        // Add skill to markedSkills if not already present
        const skillToMark = effect.target as SkillKey // Type assertion
        if (!newCharacterData.markedSkills.includes(skillToMark)) {
          newCharacterData.markedSkills.push(skillToMark)
          console.log(
            `Marked skill success: ${
              skillToMark
            }. Marked skills: ${newCharacterData.markedSkills.join(', ')}`,
          )
        }
      } else {
        console.warn(
          'MARK_SKILL_SUCCESS effect missing or invalid target (skill name).',
        )
      }
      break
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
    case 'HYDRATE_STATE': // New action to load persisted state
      // Ensure payload is Partial<MyAppState>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newState = { ...defaultInitialState, ...(action.payload as any) }
      console.log('State hydrated from AsyncStorage:', newState)
      // No need to save here, this is the load operation
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
        return newState // No change, no save needed
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
      // applySingleEffect already modifies characterData and gameFlags,
      // which are persisted fields.
      saveStateToStorage(newState)
      return newState

    case 'PERFORM_INLINE_CHECK': {
      const { checkPayload, originalOption } = action.payload
      let tempState = { ...newState }

      if (originalOption && originalOption.effects) {
        tempState = applyAllEffects(tempState, originalOption.effects)
        // If effects modified persisted fields, save them
        // This check is a bit broad, but applyAllEffects can modify characterData/gameFlags
        saveStateToStorage(tempState)
      }

      const { rollValue, isSuccess } = executeCheckLogic(
        tempState,
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
        originalOption: originalOption,
      }
      // currentCheckAttempt is not persisted, so no saveStateToStorage here for this field.
      // However, if pre-check effects were applied and saved, that's handled above.
      return tempState
    }

    case 'RESOLVE_CHECK_OUTCOME': {
      if (!newState.currentCheckAttempt) {
        console.warn('RESOLVE_CHECK_OUTCOME called without a pending check.')
        return newState
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
      newState.currentCheckAttempt = null
      saveStateToStorage(newState) // Persist changes from effects and scene change
      return newState
    }

    case 'CLEAR_CHECK_ATTEMPT':
      // currentCheckAttempt is not persisted, so no save needed.
      return {
        ...newState,
        currentCheckAttempt: null,
      }

    case 'TOGGLE_CHARACTER_MODAL':
      // isCharacterModalVisible is not persisted.
      return {
        ...newState,
        isCharacterModalVisible: !newState.isCharacterModalVisible,
      }

    case 'STORE_CHARACTER':
      newState = {
        ...newState,
        characterData: action.payload as Character,
      }
      saveStateToStorage(newState) // characterData is persisted
      return newState

    default:
      return newState
  }
}
