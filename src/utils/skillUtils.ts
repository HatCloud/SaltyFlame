import { Character } from '../interface/Character'
import {
  CoreCharacteristicEnum, // Added
  RollEnum, // Added
  SkillEnum, // Added
  CheckObjectDefaultValues,
  CoreCharacteristicKey,
  SkillKey,
  CheckObjectKey, // Keep for CheckObjectDefaultValues and getCheckValue parameter
} from '../constant/enums'

// Defines categories for skills to group them in the UI.
// The enum values are used as i18n keys for category names.
export enum SkillCategory {
  Combat = 'skillCategory.combat',
  Communication = 'skillCategory.communication',
  Knowledge = 'skillCategory.knowledge',
  Perception = 'skillCategory.perception',
  Manipulation = 'skillCategory.manipulation',
  ArtCraft = 'skillCategory.artCraft',
  Mythos = 'skillCategory.mythos',
  Other = 'skillCategory.other',
}

// Maps skill keys (expected to be CheckObjectKey string values) to SkillCategory.
// These keys should match how skills are stored in characterData.skills.
export const skillToCategoryMap: Record<string, SkillCategory> = {
  // From SkillEnum in enums.ts
  [SkillEnum.APPRAISE]: SkillCategory.Knowledge,
  [SkillEnum.ARCHAEOLOGY]: SkillCategory.Knowledge,
  [SkillEnum.ART_CRAFT_PHOTOGRAPHY]: SkillCategory.ArtCraft,
  [SkillEnum.CHARM]: SkillCategory.Communication,
  [SkillEnum.CLIMB]: SkillCategory.Manipulation,
  [SkillEnum.CREDIT_RATING]: SkillCategory.Communication,
  [SkillEnum.CTHULHU_MYTHOS]: SkillCategory.Mythos,
  [SkillEnum.DISGUISE]: SkillCategory.ArtCraft,
  [SkillEnum.DODGE]: SkillCategory.Combat,
  [SkillEnum.DRIVE_AUTO]: SkillCategory.Manipulation,
  [SkillEnum.FAST_TALK]: SkillCategory.Communication,
  [SkillEnum.FIGHTING_BRAWL]: SkillCategory.Combat,
  [SkillEnum.FIRST_AID]: SkillCategory.Manipulation,
  [SkillEnum.HISTORY]: SkillCategory.Knowledge,
  [SkillEnum.INTIMIDATE]: SkillCategory.Communication,
  [SkillEnum.LIBRARY_USE]: SkillCategory.Knowledge,
  [SkillEnum.LISTEN]: SkillCategory.Perception,
  [SkillEnum.LOCKSMITH]: SkillCategory.Manipulation,
  [SkillEnum.MEDICINE]: SkillCategory.Knowledge,
  [SkillEnum.NATURAL_WORLD]: SkillCategory.Knowledge,
  [SkillEnum.PERSUADE]: SkillCategory.Communication,
  [SkillEnum.PSYCHOLOGY]: SkillCategory.Communication,
  [SkillEnum.RIDE]: SkillCategory.Manipulation,
  [SkillEnum.SCIENCE_MEDICINE]: SkillCategory.Knowledge,
  [SkillEnum.SPOT_HIDDEN]: SkillCategory.Perception,
  [SkillEnum.STEALTH]: SkillCategory.Manipulation,
  [SkillEnum.TRACK]: SkillCategory.Perception,
  [SkillEnum.OTHER_LANGUAGE_LATIN]: SkillCategory.Knowledge,
  [SkillEnum.OWN_LANGUAGE]: SkillCategory.Knowledge,
  [SkillEnum.FIREARMS_HANDGUN]: SkillCategory.Combat,
  [SkillEnum.FIREARMS_RIFLE_SHOTGUN]: SkillCategory.Combat,
  [SkillEnum.MECHANICAL_REPAIR]: SkillCategory.Manipulation,
  [SkillEnum.ELECTRICAL_REPAIR]: SkillCategory.Manipulation,
  [SkillEnum.SLEIGHT_OF_HAND]: SkillCategory.Manipulation,
  [SkillEnum.SWIM]: SkillCategory.Manipulation,
  [SkillEnum.THROW]: SkillCategory.Manipulation,
  [SkillEnum.ACCOUNTING]: SkillCategory.Knowledge,
  [SkillEnum.ANTHROPOLOGY]: SkillCategory.Knowledge,
  [SkillEnum.LAW]: SkillCategory.Knowledge,
  [SkillEnum.JUMP]: SkillCategory.Manipulation,
  [SkillEnum.APPEASE]: SkillCategory.Communication,
  [SkillEnum.ART_CRAFT]: SkillCategory.ArtCraft,
  [SkillEnum.MANIPULATE]: SkillCategory.Manipulation,
  [SkillEnum.NAVIGATE]: SkillCategory.Manipulation,
  [SkillEnum.OCCULT]: SkillCategory.Mythos,
  [SkillEnum.OPERATE_HEAVY_MACHINERY]: SkillCategory.Manipulation,
  [SkillEnum.OTHER_LANGUAGE]: SkillCategory.Knowledge,
  [SkillEnum.PSYCHOANALYSIS]: SkillCategory.Communication,
  [SkillEnum.SCIENCE]: SkillCategory.Knowledge,
  [SkillEnum.SURVIVAL]: SkillCategory.Perception,
}

export const groupSkills = (
  skills: Partial<Record<SkillKey, number>>, // Updated to use SkillKey
): Partial<Record<SkillCategory, Record<string, number>>> => {
  const grouped: Record<SkillCategory, Record<string, number>> = {
    [SkillCategory.Combat]: {},
    [SkillCategory.Communication]: {},
    [SkillCategory.Knowledge]: {},
    [SkillCategory.Perception]: {},
    [SkillCategory.Manipulation]: {},
    [SkillCategory.ArtCraft]: {},
    [SkillCategory.Mythos]: {},
    [SkillCategory.Other]: {},
  }

  for (const skillKey in skills) {
    if (Object.prototype.hasOwnProperty.call(skills, skillKey)) {
      const typedSkillKey = skillKey as SkillKey
      const category = skillToCategoryMap[typedSkillKey] || SkillCategory.Other
      const skillValue = skills[typedSkillKey]
      if (skillValue !== undefined) {
        grouped[category][typedSkillKey] = skillValue
      }
    }
  }

  const finalGrouped: Partial<Record<SkillCategory, Record<string, number>>> =
    {}
  for (const categoryKey in grouped) {
    const catEnumKey = categoryKey as SkillCategory
    if (
      Object.prototype.hasOwnProperty.call(grouped, catEnumKey) &&
      Object.keys(grouped[catEnumKey]).length > 0
    ) {
      finalGrouped[catEnumKey] = grouped[catEnumKey]
    }
  }

  return finalGrouped
}

/**
 * Retrieves the value of a specific characteristic or skill for a character.
 * @param character The character object.
 * @param objectKey The key of the characteristic or skill to retrieve.
 * @returns The value of the characteristic or skill, or 0 if not found or character is null.
 */
export const getCheckValue = (
  character: Character | null | undefined,
  objectKey: CheckObjectKey,
): number => {
  if (!character) {
    // Attempt to get a default value if character is not present
    const defaultVal = CheckObjectDefaultValues[objectKey]
    if (typeof defaultVal === 'number') return defaultVal
    // For string defaults like 'DEX/2' when no character, it's ambiguous. Return 0 or a base.
    // This scenario (no character but needing a derived default) should ideally be avoided.
    return 0
  }

  // Check if it's a CoreCharacteristicKey
  if (objectKey in character.characteristics) {
    return character.characteristics[objectKey as CoreCharacteristicKey]
  }

  // Check if it's a special RollKey
  switch (objectKey) {
    case RollEnum.LUCK:
      return character.luck
    case RollEnum.SANITY:
      return character.sanity.current
    case RollEnum.MOV:
      return character.personalData.movementRate
  }

  // Check if it's a SkillKey
  // The `objectKey as SkillKey` cast is safe here if the previous checks didn't match.
  // However, to be absolutely sure, one might create a helper `isSkillKey(key): key is SkillKey`.
  const skillValue = character.skills[objectKey as SkillKey]
  if (skillValue !== undefined) {
    return skillValue
  }

  // If not found in character's skills, try default values for skills
  const defaultValue = CheckObjectDefaultValues[objectKey]
  if (defaultValue !== undefined) {
    if (typeof defaultValue === 'number') {
      return defaultValue
    }
    if (typeof defaultValue === 'string') {
      if (defaultValue === 'DEX/2') {
        return Math.floor(
          character.characteristics[CoreCharacteristicEnum.DEX] / 2,
        )
      }
      if (defaultValue === 'EDU') {
        return character.characteristics[CoreCharacteristicEnum.EDU]
      }
      console.warn(
        `[getCheckValue] Unhandled string default for ${objectKey}: ${defaultValue}`,
      )
      return 0 // Fallback for unhandled string defaults
    }
  }

  console.warn(
    `[getCheckValue] CheckObjectKey "${objectKey}" not found in character or defaults. Returning 0.`,
  )
  return 0
}
