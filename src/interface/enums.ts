export enum CheckObjectKey {
  // Characteristics 属性
  STR = 'STR', // 力量
  CON = 'CON', // 体质
  SIZ = 'SIZ', // 体型
  DEX = 'DEX', // 敏捷
  APP = 'APP', // 外貌
  INT = 'INT', // 智力
  POW = 'POW', // 意志
  EDU = 'EDU', // 教育
  MOV = 'MOV', // 移动 (虽然规则书有，但此剧本似乎不直接检定MOV)

  // Rolls 检定
  LUCK = 'LUCK', // 幸运
  SANITY = 'SANITY', // 理智

  // Skills 技能 (只列出剧本中明确提到或非常可能用到的)
  APPRAISE = 'APPRAISE', // 估价
  ARCHAEOLOGY = 'ARCHAEOLOGY', // 考古学
  ART_CRAFT_PHOTOGRAPHY = 'ART_CRAFT_PHOTOGRAPHY', // 艺术/手艺(摄影)
  CHARM = 'CHARM', // 魅惑
  CLIMB = 'CLIMB', // 攀爬
  CREDIT_RATING = 'CREDIT_RATING', // 信用评级
  CTHULHU_MYTHOS = 'CTHULHU_MYTHOS', // 克苏鲁神话
  DISGUISE = 'DISGUISE', // 乔装
  DODGE = 'DODGE', // 闪避
  DRIVE_AUTO = 'DRIVE_AUTO', // 汽车驾驶
  FAST_TALK = 'FAST_TALK', // 话术
  FIGHTING_BRAWL = 'FIGHTING_BRAWL', // 格斗(斗殴)
  FIRST_AID = 'FIRST_AID', // 急救
  HISTORY = 'HISTORY', // 历史
  INTIMIDATE = 'INTIMIDATE', // 恐吓
  LIBRARY_USE = 'LIBRARY_USE', // 图书馆使用
  LISTEN = 'LISTEN', // 聆听
  LOCKSMITH = 'LOCKSMITH', // 锁匠
  MEDICINE = 'MEDICINE', // 医学
  NATURAL_WORLD = 'NATURAL_WORLD', // 博物学
  PERSUADE = 'PERSUADE', // 说服
  PSYCHOLOGY = 'PSYCHOLOGY', // 心理学
  RIDE = 'RIDE', // 骑术
  SCIENCE_BOTANY = 'SCIENCE_BOTANY', // 科学(植物学)
  SPOT_HIDDEN = 'SPOT_HIDDEN', // 侦查
  STEALTH = 'STEALTH', // 潜行
  TRACK = 'TRACK', // 追踪
  OTHER_LANGUAGE_LATIN = 'OTHER_LANGUAGE_LATIN', // 其他语言（拉丁文）
  OWN_LANGUAGE = 'OWN_LANGUAGE', // 母语
}

export const CheckObjectNames: Record<
  CheckObjectKey,
  { en: string; cn: string }
> = {
  [CheckObjectKey.STR]: { en: 'Strength', cn: '力量' },
  [CheckObjectKey.CON]: { en: 'Constitution', cn: '体质' },
  [CheckObjectKey.SIZ]: { en: 'Size', cn: '体型' },
  [CheckObjectKey.DEX]: { en: 'Dexterity', cn: '敏捷' },
  [CheckObjectKey.APP]: { en: 'Appearance', cn: '外貌' },
  [CheckObjectKey.INT]: { en: 'Intelligence', cn: '智力' },
  [CheckObjectKey.POW]: { en: 'Power', cn: '意志' },
  [CheckObjectKey.EDU]: { en: 'Education', cn: '教育' },
  [CheckObjectKey.MOV]: { en: 'Move', cn: '移动' },
  [CheckObjectKey.LUCK]: { en: 'Luck', cn: '幸运' },
  [CheckObjectKey.SANITY]: { en: 'Sanity', cn: '理智' },
  [CheckObjectKey.APPRAISE]: { en: 'Appraise', cn: '估价' },
  [CheckObjectKey.ARCHAEOLOGY]: { en: 'Archaeology', cn: '考古学' },
  [CheckObjectKey.ART_CRAFT_PHOTOGRAPHY]: {
    en: 'Art/Craft (Photography)',
    cn: '艺术/手艺(摄影)',
  },
  [CheckObjectKey.CHARM]: { en: 'Charm', cn: '魅惑' },
  [CheckObjectKey.CLIMB]: { en: 'Climb', cn: '攀爬' },
  [CheckObjectKey.CREDIT_RATING]: { en: 'Credit Rating', cn: '信用评级' },
  [CheckObjectKey.CTHULHU_MYTHOS]: { en: 'Cthulhu Mythos', cn: '克苏鲁神话' },
  [CheckObjectKey.DISGUISE]: { en: 'Disguise', cn: '乔装' },
  [CheckObjectKey.DODGE]: { en: 'Dodge', cn: '闪避' },
  [CheckObjectKey.DRIVE_AUTO]: { en: 'Drive Auto', cn: '汽车驾驶' },
  [CheckObjectKey.FAST_TALK]: { en: 'Fast Talk', cn: '话术' },
  [CheckObjectKey.FIGHTING_BRAWL]: { en: 'Fighting (Brawl)', cn: '格斗(斗殴)' },
  [CheckObjectKey.FIRST_AID]: { en: 'First Aid', cn: '急救' },
  [CheckObjectKey.HISTORY]: { en: 'History', cn: '历史' },
  [CheckObjectKey.INTIMIDATE]: { en: 'Intimidate', cn: '恐吓' },
  [CheckObjectKey.LIBRARY_USE]: { en: 'Library Use', cn: '图书馆使用' },
  [CheckObjectKey.LISTEN]: { en: 'Listen', cn: '聆听' },
  [CheckObjectKey.LOCKSMITH]: { en: 'Locksmith', cn: '锁匠' },
  [CheckObjectKey.MEDICINE]: { en: 'Medicine', cn: '医学' },
  [CheckObjectKey.NATURAL_WORLD]: { en: 'Natural World', cn: '博物学' },
  [CheckObjectKey.PERSUADE]: { en: 'Persuade', cn: '说服' },
  [CheckObjectKey.PSYCHOLOGY]: { en: 'Psychology', cn: '心理学' },
  [CheckObjectKey.RIDE]: { en: 'Ride', cn: '骑术' },
  [CheckObjectKey.SCIENCE_BOTANY]: {
    en: 'Science (Botany)',
    cn: '科学(植物学)',
  },
  [CheckObjectKey.SPOT_HIDDEN]: { en: 'Spot Hidden', cn: '侦查' },
  [CheckObjectKey.STEALTH]: { en: 'Stealth', cn: '潜行' },
  [CheckObjectKey.TRACK]: { en: 'Track', cn: '追踪' },
  [CheckObjectKey.OTHER_LANGUAGE_LATIN]: {
    en: 'Other Language (Latin)',
    cn: '其他语言（拉丁文）',
  },
  [CheckObjectKey.OWN_LANGUAGE]: { en: 'Own Language', cn: '母语' },
  // Note: This list is not exhaustive for all CoC skills, but covers those most likely in this scenario.
  // Will add more as they appear in the PDF.
}

export enum EffectType {
  CHANGE_HP = 'CHANGE_HP',
  CHANGE_SANITY = 'CHANGE_SANITY',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SET_FLAG = 'SET_FLAG', // 设置一个游戏状态标记
  CLEAR_FLAG = 'CLEAR_FLAG', // 清除一个游戏状态标记
  MARK_SKILL_SUCCESS = 'MARK_SKILL_SUCCESS', // 技能检定成功后打勾
  LEARN_SPELL = 'LEARN_SPELL',
}

// Enum for Condition Types to make it more structured
export enum ConditionType {
  HAS_ITEM = 'HAS_ITEM',
  HAS_NOT_ITEM = 'HAS_NOT_ITEM',
  FLAG_SET = 'FLAG_SET',
  FLAG_NOT_SET = 'FLAG_NOT_SET',
  CHARACTERISTIC_COMPARE = 'CHARACTERISTIC_COMPARE',
}

// Enum for Check Difficulty
export enum CheckDifficulty {
  NORMAL = 'normal',
  HARD = 'hard',
  EXTREME = 'extreme',
}
