import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Scene, // Scene is used by SceneData type definition
  SceneId,
  SceneData,
  SceneCheckOptionDetails,
  SceneInteractOption,
  Effect,
  Check, // Added Check
  SimpleOption, // Added SimpleOption
} from './Scene'
import {loadAllCnSceneData} from '../data/loadInitialSceneData' //场景数据加载逻辑
import {Character} from './Character'
import FakerCharacter from '../utils/generateCharacter'

// Define language type
export type Language = 'cn' | 'en'

// For storing intermediate check results
export interface CheckAttemptState {
  checkDefinition: Check // The check being performed
  rollValue?: number // The D100 roll result
  result?: 'criticalSuccess' | 'success' | 'failure' | 'criticalFailure' // Outcome of the check
  outcomeOptionToDisplay?: SimpleOption // The single option to display post-check (contains goto, text, effects)
  isSceneCheck: boolean // Was this a scene check or an option check?
  originalOptionPayload?: SceneInteractOption // If it was an option check, store the original option
}

export interface MyAppState {
  currentSceneKey: SceneId
  history: SceneId[]
  sceneData: SceneData
  characterData: Character
  language: Language
  currentCheckAttempt?: CheckAttemptState | null // Stores state of an ongoing/completed check before navigation
  // TODO: Add other game state: flags, inventory, character stats modified during game
}

export const initialState: MyAppState = {
  currentSceneKey: '1', // TODO: Consider making this dynamic based on loaded data or a specific start scene ID
  history: [],
  sceneData: loadAllCnSceneData(),
  characterData: FakerCharacter(),
  language: 'cn',
  currentCheckAttempt: null,
}

// Action Definitions
interface ChangeSceneAction {
  type: 'CHANGE_SCENE'
  payload: SceneId
}

interface GoBackAction {
  type: 'GO_BACK'
  // No payload needed for GO_BACK
}

// Actions for check logic - these need to be implemented in the reducer
interface PerformSceneCheckAction {
  type: 'PERFORM_SCENE_CHECK'
  // Payload should contain enough info for the reducer to find the check and its outcomes
  payload: {sceneId: SceneId; checkDetails: SceneCheckOptionDetails}
}

interface PerformOptionCheckAction {
  type: 'PERFORM_OPTION_CHECK'
  // Payload should contain enough info for the reducer
  payload: {sceneId: SceneId; option: SceneInteractOption} // option contains the check
}

// New action to proceed after a check result is displayed
interface ResolveCheckOutcomeAction {
  type: 'RESOLVE_CHECK_OUTCOME'
  // No payload needed if outcomeOptionToDisplay is already in state.currentCheckAttempt
  // Or, payload could be the chosen outcomeOption if there were multiple (but current design is one)
}

// New action to clear a pending check, e.g., if user navigates away or cancels
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

// AppAction is a union of all possible actions
export type AppAction =
  | ChangeSceneAction
  | GoBackAction
  | PerformSceneCheckAction
  | PerformOptionCheckAction
  | ApplyEffectAction
  | SetLanguageAction
  | ResolveCheckOutcomeAction
  | ClearCheckAttemptAction
