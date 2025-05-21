import {
  CheckObjectKey,
  EffectType,
  ConditionType,
  CheckDifficulty,
} from './enums'

export type SceneId = string

export interface Effect {
  type: EffectType
  value?: string | number // For HP/Sanity: "+1", "-1D3"; For Item/Flag: "item_id", "flag_name"; For skill mark: skill value to set
  itemName?: string // For ADD_ITEM, REMOVE_ITEM
  flagName?: string // For SET_FLAG, CLEAR_FLAG
  skillKey?: CheckObjectKey // For MARK_SKILL_SUCCESS
  spellName?: string // For LEARN_SPELL
  // Add other parameters as needed for different effect types
}

export interface Check {
  object: 'skill' | 'characteristic' | 'luck' | 'sanity'
  subObject?: CheckObjectKey // Specific skill or characteristic key
  difficulty: CheckDifficulty
  bonusDice?: boolean
  penaltyDice?: boolean
}

// Defines a condition for an option to be available or for an effect to trigger
export interface Condition {
  type: ConditionType
  // For HAS_ITEM, HAS_NOT_ITEM
  itemName?: string
  // For FLAG_SET, FLAG_NOT_SET
  flagName?: string
  // For CHARACTERISTIC_COMPARE
  characteristicKey?: CheckObjectKey
  comparisonValue?: number
  comparisonOperator?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte'
  // Add more properties for other condition types as needed
}

// Option for simple "goto with text and effects" scenarios, like check success/failure branches
export interface SimpleOption {
  goto: SceneId
  text?: string // Optional text to display for this path
  effects?: Effect[]
}

// Represents an interactive choice presented to the player
export interface SceneInteractOption extends SimpleOption {
  condition?: Condition // Condition for this option to be visible/enabled
  check?: Check // If selecting this option triggers a check
  // If 'check' is present, successGoto and failureGoto define outcomes
  successGoto?: SceneId // Overrides SimpleOption.goto if check succeeds
  failureGoto?: SceneId // Overrides SimpleOption.goto if check fails
  successEffects?: Effect[] // Additional effects on check success (besides those in SimpleOption.effects)
  failureEffects?: Effect[] // Additional effects on check failure
  hideAfterSelection?: boolean // If true, this option is removed after being selected once
}

// Describes the structure for a check that occurs upon entering a scene
export interface SceneCheckOptionDetails {
  // A check triggered upon entering the scene
  check: Check
  success: SimpleOption
  failure: SimpleOption
  criticalSuccess?: SimpleOption // Optional: special outcome for critical success
  criticalFailure?: SimpleOption // Optional: special outcome for critical failure
}

export interface Scene {
  id: SceneId
  story: string // Narrative text of the scene
  options?: SceneInteractOption[] // Player's choices
  checkOption?: SceneCheckOptionDetails // Use the new exported interface
  autoGoto?: SceneId // If no options or checkOption, automatically proceed to this scene
  entryEffects?: Effect[] // Effects triggered upon entering this scene
  isEnd?: boolean // True if this scene is a game ending
}

export interface SceneData {
  [id: string]: Scene
}
