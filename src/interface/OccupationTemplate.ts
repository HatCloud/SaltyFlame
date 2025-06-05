import { CheckObjectKey } from '../constant/enums'

/**
 * Defines the structure for pre-filled background information for an occupation.
 * These details should be themed for a 1920s setting.
 */
export interface OccupationBackgroundTemplate {
  description: string // 形象描述: e.g., "总是穿着略显磨损但质地优良的粗花呢夹克，戴着一副夹鼻眼镜，眼神锐利。"
  ideologyBeliefs: string // 思想与信念: e.g., "坚信历史中隐藏着不为人知的真相，对神秘主义抱有谨慎的好奇。"
  significantPeople: string // 重要之人: e.g., "一位年迈的大学导师，偶尔会提供些稀奇古怪的委托。"
  meaningfulLocations: string // 意义非凡之地: e.g., "城中那家尘封已久的古籍书店的后室，或是某个偏远乡村的古老遗迹。"
  treasuredPossessions: string // 宝贵之物: e.g., "一本家传的旅行日记，记录着奇异的见闻，或是一件来源神秘的小古董。"
  traits: string // 特质: e.g., "博学但有时略显固执，对细节有着惊人的记忆力。"
  keyConnection?: string // (可选) 用于游戏机制的关键背景连接点，例如指向 'significantPeople'。
  injuriesScars?: string // (可选) 伤口与疤痕: e.g., "在一次考古挖掘中手腕上留下的一道模糊疤痕。"
  phobiasManias?: string // (可选) 恐惧症与躁狂症: e.g., "对密闭空间有轻微的幽闭恐惧，或是对特定类型的古物有收集癖。"
  mythosTomesSpellsArcaneObjects?: string // (可选) 神话典籍、法术&魔法物品的传闻或知识片段。
  encountersWithStrangeEntities?: string // (可选) 第三类接触的模糊记忆或间接证据。
}

/**
 * Defines the structure for an occupation template.
 * This template provides pre-configured skills and background for a character of this occupation.
 */
export interface OccupationTemplate {
  name_cn: string // 职业中文名
  name_en: string // 职业英文名
  description_cn: string // 职业中文描述
  description_en: string // 职业英文描述
  creditRatingRange: [number, number] // 信用评级范围, e.g., [30, 70]

  // The 8 skills designated as core occupational skills for this profession.
  occupationalSkills: CheckObjectKey[]

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
  background: OccupationBackgroundTemplate

  // Optional: For reference, the traditional CoC skill point calculation formula.
  // e.g., "EDU x 2 + APP x 2" or "EDU x 4".
  // In this implementation, skills are pre-set, so this is informational.
  skillPointsFormula?: string
}
