import { Character } from '../interface/Character'
import {
  CheckObjectKey,
  CheckObjectDefaultValues,
  CoreCharacteristicKey,
  SkillKey,
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
  // From CheckObjectKey in enums.ts
  [CheckObjectKey.APPRAISE]: SkillCategory.Knowledge,
  [CheckObjectKey.ARCHAEOLOGY]: SkillCategory.Knowledge,
  [CheckObjectKey.ART_CRAFT_PHOTOGRAPHY]: SkillCategory.ArtCraft,
  [CheckObjectKey.CHARM]: SkillCategory.Communication,
  [CheckObjectKey.CLIMB]: SkillCategory.Manipulation,
  [CheckObjectKey.CREDIT_RATING]: SkillCategory.Communication,
  [CheckObjectKey.CTHULHU_MYTHOS]: SkillCategory.Mythos,
  [CheckObjectKey.DISGUISE]: SkillCategory.ArtCraft,
  [CheckObjectKey.DODGE]: SkillCategory.Combat,
  [CheckObjectKey.DRIVE_AUTO]: SkillCategory.Manipulation,
  [CheckObjectKey.FAST_TALK]: SkillCategory.Communication,
  [CheckObjectKey.FIGHTING_BRAWL]: SkillCategory.Combat,
  [CheckObjectKey.FIRST_AID]: SkillCategory.Manipulation,
  [CheckObjectKey.HISTORY]: SkillCategory.Knowledge,
  [CheckObjectKey.INTIMIDATE]: SkillCategory.Communication,
  [CheckObjectKey.LIBRARY_USE]: SkillCategory.Knowledge,
  [CheckObjectKey.LISTEN]: SkillCategory.Perception,
  [CheckObjectKey.LOCKSMITH]: SkillCategory.Manipulation,
  [CheckObjectKey.MEDICINE]: SkillCategory.Knowledge,
  [CheckObjectKey.NATURAL_WORLD]: SkillCategory.Knowledge,
  [CheckObjectKey.PERSUADE]: SkillCategory.Communication,
  [CheckObjectKey.PSYCHOLOGY]: SkillCategory.Communication,
  [CheckObjectKey.RIDE]: SkillCategory.Manipulation,
  [CheckObjectKey.SCIENCE_BOTANY]: SkillCategory.Knowledge,
  [CheckObjectKey.SPOT_HIDDEN]: SkillCategory.Perception,
  [CheckObjectKey.STEALTH]: SkillCategory.Manipulation,
  [CheckObjectKey.TRACK]: SkillCategory.Perception,
  [CheckObjectKey.OTHER_LANGUAGE_LATIN]: SkillCategory.Knowledge,
  [CheckObjectKey.OWN_LANGUAGE]: SkillCategory.Knowledge,
  [CheckObjectKey.FIREARMS_HANDGUN]: SkillCategory.Combat,
  [CheckObjectKey.FIREARMS_RIFLE_SHOTGUN]: SkillCategory.Combat,
  [CheckObjectKey.MECHANICAL_REPAIR]: SkillCategory.Manipulation,
  [CheckObjectKey.ELECTRICAL_REPAIR]: SkillCategory.Manipulation,
  [CheckObjectKey.SLEIGHT_OF_HAND]: SkillCategory.Manipulation,
  [CheckObjectKey.SWIM]: SkillCategory.Manipulation,
  [CheckObjectKey.THROW]: SkillCategory.Manipulation,
  [CheckObjectKey.ACCOUNTING]: SkillCategory.Knowledge,
  [CheckObjectKey.ANTHROPOLOGY]: SkillCategory.Knowledge,
  [CheckObjectKey.LAW]: SkillCategory.Knowledge,
  // [CheckObjectKey.PHARMACY]: SkillCategory.Knowledge, // PHARMACY is not in CheckObjectKey yet
  // [CheckObjectKey.SCIENCE_ASTRONOMY]: SkillCategory.Knowledge, // Not in CheckObjectKey
  // [CheckObjectKey.SCIENCE_CHEMISTRY]: SkillCategory.Knowledge, // Not in CheckObjectKey
  // [CheckObjectKey.SCIENCE_GEOLOGY]: SkillCategory.Knowledge, // Not in CheckObjectKey
  // [CheckObjectKey.SCIENCE_PHYSICS]: SkillCategory.Knowledge, // Not in CheckObjectKey
  // [CheckObjectKey.ART_CRAFT_ACTING]: SkillCategory.ArtCraft, // Not in CheckObjectKey
  // [CheckObjectKey.ART_CRAFT_PAINTING]: SkillCategory.ArtCraft, // Not in CheckObjectKey
  [CheckObjectKey.JUMP]: SkillCategory.Manipulation,
  [CheckObjectKey.APPEASE]: SkillCategory.Communication,
  [CheckObjectKey.ART_CRAFT]: SkillCategory.ArtCraft,
  [CheckObjectKey.MANIPULATE]: SkillCategory.Manipulation,
  [CheckObjectKey.NAVIGATE]: SkillCategory.Manipulation,
  [CheckObjectKey.OCCULT]: SkillCategory.Mythos,
  [CheckObjectKey.OPERATE_HEAVY_MACHINERY]: SkillCategory.Manipulation,
  [CheckObjectKey.OTHER_LANGUAGE]: SkillCategory.Knowledge,
  [CheckObjectKey.PSYCHOANALYSIS]: SkillCategory.Communication,
  [CheckObjectKey.SCIENCE]: SkillCategory.Knowledge,
  [CheckObjectKey.SURVIVAL]: SkillCategory.Perception,
}

// Helper function to group skills by category.
// Skills in the input `skills` object are expected to have keys that match
// those in `skillToCategoryMap` (i.e., CheckObjectKey string values).
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
    case CheckObjectKey.LUCK:
      return character.luck
    case CheckObjectKey.SANITY:
      return character.sanity.current
    case CheckObjectKey.MOV:
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
        return Math.floor(character.characteristics[CheckObjectKey.DEX] / 2)
      }
      if (defaultValue === 'EDU') {
        return character.characteristics[CheckObjectKey.EDU]
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
