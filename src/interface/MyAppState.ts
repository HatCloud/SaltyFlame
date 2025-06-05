import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Scene, // Scene is used by SceneData type definition
  SceneData,
  SceneInteractOption,
  Effect,
  Check,
  CheckPayload, // Added new CheckPayload
} from './Scene'
import { loadAllCnSceneData } from '../data/loadInitialSceneData' //场景数据加载逻辑
import { Character } from './Character'

// Define language type
export type Language = 'cn' | 'en'

// For storing intermediate check results
export interface CheckAttemptState {
  checkDefinition: Check // The check being performed (from CheckPayload.details)
  rollValue?: number // The D100 roll result
  isSuccess?: boolean // Simplified result: true for success, false for failure
  // For more granular results like critical success/failure, add a new field:
  // detailedResult?: 'criticalSuccess' | 'success' | 'failure' | 'criticalFailure';

  // Information to display and use post-check, derived from CheckPayload
  successMessage?: string
  failureMessage?: string
  nextSceneIdOnSuccess: string
  nextSceneIdOnFailure: string
  effectsToApplyOnSuccess?: Effect[]
  effectsToApplyOnFailure?: Effect[]

  originalOption?: SceneInteractOption // If the check was triggered by an option
}

export interface MyAppState {
  currentSceneKey: string // Changed from SceneId to string
  history: string[] // Changed from SceneId[] to string[]
  sceneData: SceneData
  characterData: Character | null
  language: Language
  currentCheckAttempt?: CheckAttemptState | null // Stores state of an ongoing/completed check
  gameFlags: Record<string, boolean> // Added for game flags
  isCharacterModalVisible?: boolean
  temporaryCharacter?: Character // For storing character data from attribute allocation
}

export const initialState: MyAppState = {
  currentSceneKey: '1',
  history: [],
  sceneData: loadAllCnSceneData(),
  characterData: null, // Use FakerCharacter directly, it now includes inventory
  language: 'cn',
  currentCheckAttempt: null,
  gameFlags: {}, // Initialize gameFlags
  temporaryCharacter: undefined, // Initialize temporaryCharacter
  isCharacterModalVisible: false,
}

// Action Definitions
interface ChangeSceneAction {
  type: 'CHANGE_SCENE'
  payload: string // Changed from SceneId to string
}

interface GoBackAction {
  type: 'GO_BACK'
}

// New action for performing checks defined directly in options
interface PerformInlineCheckAction {
  type: 'PERFORM_INLINE_CHECK'
  payload: {
    checkPayload: CheckPayload // Contains all details for the check and its outcomes
    originalOption?: SceneInteractOption // The option that triggered this check
  }
}

// Action to proceed after a check result is displayed
interface ResolveCheckOutcomeAction {
  type: 'RESOLVE_CHECK_OUTCOME'
  // No payload needed as currentCheckAttempt holds all necessary info
}

// Action to clear a pending check
interface ClearCheckAttemptAction {
  type: 'CLEAR_CHECK_ATTEMPT'
}

// Action for applying effects
interface ApplyEffectAction {
  type: 'APPLY_EFFECT'
  payload: Effect // Effect type from Scene.ts
}

// Action for setting language
interface SetLanguageAction {
  type: 'SET_LANGUAGE'
  payload: Language
}

interface ToggleCharacterModalAction {
  type: 'TOGGLE_CHARACTER_MODAL'
}

// Action for storing temporarily generated character
interface StoreCharacterAction {
  type: 'STORE_CHARACTER'
  payload: Character
}

// AppAction is a union of all possible actions
export type AppAction =
  | ChangeSceneAction
  | GoBackAction
  | PerformInlineCheckAction // Added
  | ApplyEffectAction
  | SetLanguageAction
  | ResolveCheckOutcomeAction
  | ClearCheckAttemptAction
  | ToggleCharacterModalAction
  | StoreCharacterAction // Added
