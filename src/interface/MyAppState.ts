import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Scene, // Scene is used by SceneData type definition
  SceneData,
  SceneInteractOption,
  Effect,
  Check,
  CheckPayload, // Added new CheckPayload
} from './Scene'
import { CheckOutcome } from '../constant/enums' // Added for detailed check results
import { loadAllCnSceneData } from '../data/loadInitialSceneData' //场景数据加载逻辑
import { Character } from './Character'
import { OccupationKey } from '../data/occupations' // Import OccupationKey
import { GameFlag, GameFlagVaule } from '../constant/GameFlags'

// Define language type
export type Language = 'cn' | 'en'

// For storing intermediate check results
export interface CheckAttemptState {
  checkDefinition: Check // The check being performed (from CheckPayload.details)
  rollValue?: number // The D100 roll result
  resultType?: CheckOutcome // Detailed result of the check
  targetValue: number
  // isSuccess?: boolean // This can be derived from resultType if needed

  // Information to display and use post-check, derived from CheckPayload
  successMessage?: string
  failureMessage?: string
  nextSceneIdOnSuccess: string
  nextSceneIdOnFailure?: string
  effectsToApplyOnSuccess?: Effect[]
  effectsToApplyOnFailure?: Effect[]

  originalOption?: SceneInteractOption // If the check was triggered by an option
}

export interface MyAppState {
  currentSceneKey: string
  history: string[]
  sceneData: SceneData
  characterData: Character | null
  language: Language
  currentCheckAttempt?: CheckAttemptState | null // Stores state of an ongoing/completed check
  gameFlags: Record<GameFlag, GameFlagVaule>
  isCharacterModalVisible?: boolean
  diceRollAnimation: DiceRollAnimationState // Added for dice roll animation
  pendingCheckResultData?: PendingCheckResultData | null // Added for deferring check attempt set
}

// State for dice roll animation
export interface DiceRollAnimationState {
  isVisible: boolean
  rollResult: number | null
  diceFaces: number | null // diceFaces might still be useful for "D100" etc. if not showing full outcome text
  resultType?: CheckOutcome // Added for outcome-specific text
  targetValue: number // Added for target value
}

// To store check result data temporarily while animation is playing
export interface PendingCheckResultData {
  checkPayload: CheckPayload
  originalOption?: SceneInteractOption
  rollValue: number
  resultType: CheckOutcome
  diceFaces: number
  targetValue: number
}

export const initialState: MyAppState = {
  currentSceneKey: '1',
  history: [],
  sceneData: loadAllCnSceneData(),
  characterData: null, // Use FakerCharacter directly, it now includes inventory
  language: 'cn',
  currentCheckAttempt: null,
  gameFlags: {
    [GameFlag.LAST_NIGHT_SKILL_CHECK_SUCCESS]: false,
    [GameFlag.PENALTY_DICE_TODAY]: false,
    [GameFlag.FOUGHT_LAST_NIGHT]: false,
    [GameFlag.IS_INJURED]: false,
    [GameFlag.APPOINTMENT_WITH_ABOGAIST_9PM_CEMETERY]: false,
  },
  isCharacterModalVisible: false,
  diceRollAnimation: {
    // Initial state for dice roll animation
    isVisible: false,
    rollResult: null,
    diceFaces: null,
    resultType: undefined, // Added
    targetValue: 0,
  },
  pendingCheckResultData: null, // Initialize pendingCheckResultData
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

// Action for hydrating state from storage
interface HydrateStateAction {
  type: 'HYDRATE_STATE'
  payload: Partial<MyAppState> // Persisted state might be partial
}

// Action for applying a chosen occupation
interface ApplyChosenOccupationAction {
  type: 'APPLY_CHOSEN_OCCUPATION'
  payload: OccupationKey
}

// Actions for Dice Roll Animation
interface ShowDiceRollAnimationAction {
  type: 'SHOW_DICE_ROLL_ANIMATION'
  payload: {
    rollResult: number
    diceFaces: number
    resultType: CheckOutcome // Added
    targetValue: number // Added
  }
}

interface HideDiceRollAnimationAction {
  type: 'HIDE_DICE_ROLL_ANIMATION'
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
  | HydrateStateAction // Added
  | ApplyChosenOccupationAction
  | ShowDiceRollAnimationAction // Added
  | HideDiceRollAnimationAction // Added
