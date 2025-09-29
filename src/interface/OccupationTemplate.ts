import { CheckObjectKey } from '../constant/enums'
import { CharacterBackground } from './Character'

/**
 * Defines the structure for an occupation template.
 * This template provides pre-configured skills and background for a character of this occupation.
 */
export interface OccupationTemplate {
  name_cn: string // 职业中文名
  name_en: string // 职业英文名
  description_cn: string // 职业中文描述
  description_en: string // 职业英文描述
  creditRating: number

  // Defines the target final percentages for the 8 occupational skills.
  // These values (e.g., 70, 60, 60, 50, 50, 50, 40, 40) will be assigned directly,
  // ignoring base values, and capped at 75%.
  // The keys should be from the `occupationalSkills` array.
  occupationalSkillTargets: Partial<Record<CheckObjectKey, number>>

  // The 4 skills designated as interest skills for this profession.
  // These skills are distinct from occupational skills and will receive a +20 bonus
  // to their base value (calculated from attributes if necessary), capped at 75%.
  interestSkills: CheckObjectKey[]

  // Pre-filled background information, themed for the 1920s.
  background_cn: CharacterBackground // Renamed from background
  background_en: CharacterBackground // Added for English version

  // Example character pre-fill data
  exampleCharacterName_cn?: string
  exampleCharacterName_en?: string
  exampleCharacterSex?: 'Male' | 'Female' // Using string for flexibility
  exampleCharacterAge?: number // Should be between 23-36
  exampleCharacterBirthplace_cn?: string // 1920s USA
  exampleCharacterBirthplace_en?: string // 1920s USA
  exampleCharacterResidence_cn?: string // 1920s USA
  exampleCharacterResidence_en?: string // 1920s USA
  // skillPointsFormula field removed
}
