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
  APPRAISE: SkillCategory.Knowledge,
  ARCHAEOLOGY: SkillCategory.Knowledge,
  ART_CRAFT_PHOTOGRAPHY: SkillCategory.ArtCraft,
  CHARM: SkillCategory.Communication,
  CLIMB: SkillCategory.Manipulation,
  CREDIT_RATING: SkillCategory.Communication,
  CTHULHU_MYTHOS: SkillCategory.Mythos,
  DISGUISE: SkillCategory.ArtCraft,
  DODGE: SkillCategory.Combat,
  DRIVE_AUTO: SkillCategory.Manipulation,
  FAST_TALK: SkillCategory.Communication,
  FIGHTING_BRAWL: SkillCategory.Combat,
  FIRST_AID: SkillCategory.Manipulation,
  HISTORY: SkillCategory.Knowledge,
  INTIMIDATE: SkillCategory.Communication,
  LIBRARY_USE: SkillCategory.Knowledge,
  LISTEN: SkillCategory.Perception,
  LOCKSMITH: SkillCategory.Manipulation,
  MEDICINE: SkillCategory.Knowledge,
  NATURAL_WORLD: SkillCategory.Knowledge,
  PERSUADE: SkillCategory.Communication,
  PSYCHOLOGY: SkillCategory.Communication,
  RIDE: SkillCategory.Manipulation,
  SCIENCE_BOTANY: SkillCategory.Knowledge,
  SPOT_HIDDEN: SkillCategory.Perception,
  STEALTH: SkillCategory.Manipulation,
  TRACK: SkillCategory.Perception,
  OTHER_LANGUAGE_LATIN: SkillCategory.Knowledge,
  OWN_LANGUAGE: SkillCategory.Knowledge,

  // Additional common CoC skills (ensure keys are consistent if added to CheckObjectKey)
  // If these are not in CheckObjectKey, they might need to be added there for consistency
  // or ensure character generation/data uses these exact string keys.
  FIREARMS_HANDGUN: SkillCategory.Combat, // Example: if 'Handgun' skill exists
  FIREARMS_RIFLE_SHOTGUN: SkillCategory.Combat, // Example: if 'Rifle/Shotgun' skill exists
  MECHANICAL_REPAIR: SkillCategory.Manipulation,
  ELECTRICAL_REPAIR: SkillCategory.Manipulation,
  SLEIGHT_OF_HAND: SkillCategory.Manipulation,
  SWIM: SkillCategory.Manipulation,
  THROW: SkillCategory.Manipulation,
  ACCOUNTING: SkillCategory.Knowledge,
  ANTHROPOLOGY: SkillCategory.Knowledge,
  LAW: SkillCategory.Knowledge,
  PHARMACY: SkillCategory.Knowledge,
  SCIENCE_ASTRONOMY: SkillCategory.Knowledge,
  SCIENCE_CHEMISTRY: SkillCategory.Knowledge,
  SCIENCE_GEOLOGY: SkillCategory.Knowledge,
  SCIENCE_PHYSICS: SkillCategory.Knowledge,
  ART_CRAFT_ACTING: SkillCategory.ArtCraft,
  ART_CRAFT_PAINTING: SkillCategory.ArtCraft,
  JUMP: SkillCategory.Manipulation, // Common physical skill
  // Add other skills as they appear in the game or occupation templates,
  // using their English-based keys.
}

// Helper function to group skills by category.
// Skills in the input `skills` object are expected to have keys that match
// those in `skillToCategoryMap` (i.e., CheckObjectKey string values).
export const groupSkills = (
  skills: Record<string, number>,
): Partial<Record<SkillCategory, Record<string, number>>> => {
  // Initialize all categories to ensure they exist in the grouped object,
  // even if they end up empty (they will be filtered later).
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
      const category = skillToCategoryMap[skillKey] || SkillCategory.Other
      // grouped[category] will always exist due to pre-initialization
      grouped[category][skillKey] = skills[skillKey]
    }
  }

  // Filter out categories that have no skills.
  const finalGrouped: Partial<Record<SkillCategory, Record<string, number>>> =
    {}
  for (const categoryKey in grouped) {
    // Iterate over enum string values to ensure type safety
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
