export enum CoreCharacteristicEnum {
  STR = 'STR', // 力量
  CON = 'CON', // 体质
  SIZ = 'SIZ', // 体型
  DEX = 'DEX', // 敏捷
  APP = 'APP', // 外貌
  INT = 'INT', // 智力
  POW = 'POW', // 意志
  EDU = 'EDU', // 教育
}

export enum RollEnum {
  LUCK = 'LUCK', // 幸运
  SANITY = 'SANITY', // 理智
  MOV = 'MOV', // 移动 (虽然规则书有，但此剧本似乎不直接检定MOV)
}

export enum SkillEnum {
  ACCOUNTING = 'ACCOUNTING', // 会计
  ANTHROPOLOGY = 'ANTHROPOLOGY', // 人类学
  APPRAISE = 'APPRAISE', // 估价
  APPEASE = 'APPEASE', // 取悦 (COC 7e Investigator Handbook p.60, different from Charm)
  ARCHAEOLOGY = 'ARCHAEOLOGY', // 考古学
  ART_CRAFT = 'ART_CRAFT', // 艺术/手艺 (通用)
  ART_CRAFT_PHOTOGRAPHY = 'ART_CRAFT_PHOTOGRAPHY', // 艺术/手艺(摄影)
  CHARM = 'CHARM', // 魅惑
  CLIMB = 'CLIMB', // 攀爬
  CREDIT_RATING = 'CREDIT_RATING', // 信用评级
  CTHULHU_MYTHOS = 'CTHULHU_MYTHOS', // 克苏鲁神话
  DISGUISE = 'DISGUISE', // 乔装
  DODGE = 'DODGE', // 闪避
  DRIVE_AUTO = 'DRIVE_AUTO', // 汽车驾驶
  ELECTRICAL_REPAIR = 'ELECTRICAL_REPAIR', // 电气维修
  FAST_TALK = 'FAST_TALK', // 话术
  FIGHTING_BRAWL = 'FIGHTING_BRAWL', // 格斗(斗殴)
  FIREARMS_HANDGUN = 'FIREARMS_HANDGUN', // 射击(手枪)
  FIREARMS_RIFLE_SHOTGUN = 'FIREARMS_RIFLE_SHOTGUN', // 射击(步枪/霰弹枪)
  FIRST_AID = 'FIRST_AID', // 急救
  HISTORY = 'HISTORY', // 历史
  INTIMIDATE = 'INTIMIDATE', // 恐吓
  JUMP = 'JUMP', // 跳跃
  LAW = 'LAW', // 法律
  LIBRARY_USE = 'LIBRARY_USE', // 图书馆使用
  LISTEN = 'LISTEN', // 聆听
  LOCKSMITH = 'LOCKSMITH', // 锁匠
  MANIPULATE = 'MANIPULATE', // 操纵 (This seems to be a custom skill or a very specific interpretation, adding as per image)
  MECHANICAL_REPAIR = 'MECHANICAL_REPAIR', // 机械维修
  MEDICINE = 'MEDICINE', // 医学
  NATURAL_WORLD = 'NATURAL_WORLD', // 博物学 (Natural History in some editions)
  NAVIGATE = 'NAVIGATE', // 导航
  OCCULT = 'OCCULT', // 神秘学
  OPERATE_HEAVY_MACHINERY = 'OPERATE_HEAVY_MACHINERY', // 操作重机
  OTHER_LANGUAGE = 'OTHER_LANGUAGE', // 其他语言 (通用)
  OTHER_LANGUAGE_LATIN = 'OTHER_LANGUAGE_LATIN', // 其他语言（拉丁文）
  OWN_LANGUAGE = 'OWN_LANGUAGE', // 母语
  PERSUADE = 'PERSUADE', // 说服
  PSYCHOANALYSIS = 'PSYCHOANALYSIS', // 精神分析
  PSYCHOLOGY = 'PSYCHOLOGY', // 心理学
  RIDE = 'RIDE', // 骑术
  SCIENCE = 'SCIENCE', // 科学 (通用)
  SCIENCE_BOTANY = 'SCIENCE_BOTANY', // 科学(植物学)
  SLEIGHT_OF_HAND = 'SLEIGHT_OF_HAND', // 妙手
  SPOT_HIDDEN = 'SPOT_HIDDEN', // 侦查
  STEALTH = 'STEALTH', // 潜行
  SURVIVAL = 'SURVIVAL', // 生存 (As per image, distinct from Natural World)
  SWIM = 'SWIM', // 游泳
  THROW = 'THROW', // 投掷
  TRACK = 'TRACK', // 追踪
}

// Union type for all checkable object keys for backward compatibility and for CheckObjectNames/DefaultValues
export type CheckObjectKey = CoreCharacteristicEnum | RollEnum | SkillEnum

export const CheckObjectNames: Record<
  CheckObjectKey,
  { en: string; cn: string }
> = {
  // Core Characteristics
  [CoreCharacteristicEnum.STR]: { en: 'Strength', cn: '力量' },
  [CoreCharacteristicEnum.CON]: { en: 'Constitution', cn: '体质' },
  [CoreCharacteristicEnum.SIZ]: { en: 'Size', cn: '体型' },
  [CoreCharacteristicEnum.DEX]: { en: 'Dexterity', cn: '敏捷' },
  [CoreCharacteristicEnum.APP]: { en: 'Appearance', cn: '外貌' },
  [CoreCharacteristicEnum.INT]: { en: 'Intelligence', cn: '智力' },
  [CoreCharacteristicEnum.POW]: { en: 'Power', cn: '意志' },
  [CoreCharacteristicEnum.EDU]: { en: 'Education', cn: '教育' },

  // Rolls
  [RollEnum.LUCK]: { en: 'Luck', cn: '幸运' },
  [RollEnum.SANITY]: { en: 'Sanity', cn: '理智' },
  [RollEnum.MOV]: { en: 'Move', cn: '移动' },

  // Skills
  [SkillEnum.ACCOUNTING]: { en: 'Accounting', cn: '会计' },
  [SkillEnum.ANTHROPOLOGY]: { en: 'Anthropology', cn: '人类学' },
  [SkillEnum.APPRAISE]: { en: 'Appraise', cn: '估价' },
  [SkillEnum.APPEASE]: { en: 'Appease', cn: '取悦' },
  [SkillEnum.ARCHAEOLOGY]: { en: 'Archaeology', cn: '考古学' },
  [SkillEnum.ART_CRAFT]: { en: 'Art/Craft', cn: '艺术/手艺' },
  [SkillEnum.ART_CRAFT_PHOTOGRAPHY]: {
    en: 'Art/Craft (Photography)',
    cn: '艺术/手艺(摄影)',
  },
  [SkillEnum.CHARM]: { en: 'Charm', cn: '魅惑' },
  [SkillEnum.CLIMB]: { en: 'Climb', cn: '攀爬' },
  [SkillEnum.CREDIT_RATING]: { en: 'Credit Rating', cn: '信用评级' },
  [SkillEnum.CTHULHU_MYTHOS]: { en: 'Cthulhu Mythos', cn: '克苏鲁神话' },
  [SkillEnum.DISGUISE]: { en: 'Disguise', cn: '乔装' },
  [SkillEnum.DODGE]: { en: 'Dodge', cn: '闪避' },
  [SkillEnum.DRIVE_AUTO]: { en: 'Drive Auto', cn: '汽车驾驶' },
  [SkillEnum.ELECTRICAL_REPAIR]: {
    en: 'Electrical Repair',
    cn: '电气维修',
  },
  [SkillEnum.FAST_TALK]: { en: 'Fast Talk', cn: '话术' },
  [SkillEnum.FIGHTING_BRAWL]: { en: 'Fighting (Brawl)', cn: '格斗(斗殴)' },
  [SkillEnum.FIREARMS_HANDGUN]: {
    en: 'Firearms (Handgun)',
    cn: '射击(手枪)',
  },
  [SkillEnum.FIREARMS_RIFLE_SHOTGUN]: {
    en: 'Firearms (Rifle/Shotgun)',
    cn: '射击(步枪/霰弹枪)',
  },
  [SkillEnum.FIRST_AID]: { en: 'First Aid', cn: '急救' },
  [SkillEnum.HISTORY]: { en: 'History', cn: '历史' },
  [SkillEnum.INTIMIDATE]: { en: 'Intimidate', cn: '恐吓' },
  [SkillEnum.JUMP]: { en: 'Jump', cn: '跳跃' },
  [SkillEnum.LAW]: { en: 'Law', cn: '法律' },
  [SkillEnum.LIBRARY_USE]: { en: 'Library Use', cn: '图书馆使用' },
  [SkillEnum.LISTEN]: { en: 'Listen', cn: '聆听' },
  [SkillEnum.LOCKSMITH]: { en: 'Locksmith', cn: '锁匠' },
  [SkillEnum.MANIPULATE]: { en: 'Manipulate', cn: '操纵' },
  [SkillEnum.MECHANICAL_REPAIR]: {
    en: 'Mechanical Repair',
    cn: '机械维修',
  },
  [SkillEnum.MEDICINE]: { en: 'Medicine', cn: '医学' },
  [SkillEnum.NATURAL_WORLD]: { en: 'Natural World', cn: '博物学' },
  [SkillEnum.NAVIGATE]: { en: 'Navigate', cn: '导航' },
  [SkillEnum.OCCULT]: { en: 'Occult', cn: '神秘学' },
  [SkillEnum.OPERATE_HEAVY_MACHINERY]: {
    en: 'Operate Heavy Machinery',
    cn: '操作重机',
  },
  [SkillEnum.OTHER_LANGUAGE]: { en: 'Other Language', cn: '语言' },
  [SkillEnum.OTHER_LANGUAGE_LATIN]: {
    en: 'Other Language (Latin)',
    cn: '其他语言（拉丁文）',
  },
  [SkillEnum.OWN_LANGUAGE]: { en: 'Own Language', cn: '母语' },
  [SkillEnum.PERSUADE]: { en: 'Persuade', cn: '说服' },
  [SkillEnum.PSYCHOANALYSIS]: { en: 'Psychoanalysis', cn: '精神分析' },
  [SkillEnum.PSYCHOLOGY]: { en: 'Psychology', cn: '心理学' },
  [SkillEnum.RIDE]: { en: 'Ride', cn: '骑术' },
  [SkillEnum.SCIENCE]: { en: 'Science', cn: '科学' },
  [SkillEnum.SCIENCE_BOTANY]: {
    en: 'Science (Botany)',
    cn: '科学(植物学)',
  },
  [SkillEnum.SLEIGHT_OF_HAND]: { en: 'Sleight of Hand', cn: '妙手' },
  [SkillEnum.SPOT_HIDDEN]: { en: 'Spot Hidden', cn: '侦查' },
  [SkillEnum.STEALTH]: { en: 'Stealth', cn: '潜行' },
  [SkillEnum.SURVIVAL]: { en: 'Survival', cn: '生存' },
  [SkillEnum.SWIM]: { en: 'Swim', cn: '游泳' },
  [SkillEnum.THROW]: { en: 'Throw', cn: '投掷' },
  [SkillEnum.TRACK]: { en: 'Track', cn: '追踪' },
}

// --- Type Aliases for specific categories of CheckObjectKey ---

// Core characteristics directly from the character sheet
export type CoreCharacteristicKey = keyof typeof CoreCharacteristicEnum

// Rolls like Luck, Sanity, and potentially Move if treated as a rollable value
export type RollKey = keyof typeof RollEnum

// All skills available for checks
export type SkillKey = keyof typeof SkillEnum

export enum EffectType {
  CHANGE_HP = 'CHANGE_HP',
  CHANGE_SANITY = 'CHANGE_SANITY',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SET_FLAG = 'SET_FLAG', // 设置一个游戏状态标记
  CLEAR_FLAG = 'CLEAR_FLAG', // 清除一个游戏状态标记
  MARK_SKILL_SUCCESS = 'MARK_SKILL_SUCCESS', // 技能检定成功后打勾
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

// Default values for investigator skills based on the provided image
export const CheckObjectDefaultValues: Partial<
  Record<CheckObjectKey, number | string>
> = {
  // Characteristics
  [CoreCharacteristicEnum.STR]: 0,
  [CoreCharacteristicEnum.CON]: 0,
  [CoreCharacteristicEnum.SIZ]: 0,
  [CoreCharacteristicEnum.DEX]: 0,
  [CoreCharacteristicEnum.APP]: 0,
  [CoreCharacteristicEnum.INT]: 0,
  [CoreCharacteristicEnum.POW]: 0,
  [CoreCharacteristicEnum.EDU]: 0,

  // Rolls
  [RollEnum.LUCK]: 0, // Luck is usually POW or rolled
  [RollEnum.SANITY]: 0, // Sanity is usually POW
  [RollEnum.MOV]: 0,

  // Skills
  [SkillEnum.NATURAL_WORLD]: 10,
  [SkillEnum.MANIPULATE]: 1,
  [SkillEnum.OPERATE_HEAVY_MACHINERY]: 1,
  [SkillEnum.NAVIGATE]: 10,
  [SkillEnum.ELECTRICAL_REPAIR]: 10,
  [SkillEnum.LAW]: 5,
  [SkillEnum.FIGHTING_BRAWL]: 25,
  [SkillEnum.APPRAISE]: 5,
  [SkillEnum.FAST_TALK]: 5,
  [SkillEnum.MECHANICAL_REPAIR]: 10,
  [SkillEnum.FIRST_AID]: 30,
  [SkillEnum.PSYCHOANALYSIS]: 1,
  [SkillEnum.ARCHAEOLOGY]: 1,
  [SkillEnum.SCIENCE]: 1, // General Science
  [SkillEnum.CTHULHU_MYTHOS]: 0,
  [SkillEnum.INTIMIDATE]: 15,
  [SkillEnum.ACCOUNTING]: 5,
  [SkillEnum.HISTORY]: 5,
  [SkillEnum.LISTEN]: 20,
  [SkillEnum.SLEIGHT_OF_HAND]: 10,
  [SkillEnum.CLIMB]: 20,
  [SkillEnum.RIDE]: 5,
  [SkillEnum.DRIVE_AUTO]: 20,
  [SkillEnum.STEALTH]: 20,
  [SkillEnum.DISGUISE]: 5,
  [SkillEnum.APPEASE]: 15,
  [SkillEnum.ANTHROPOLOGY]: 1,
  [SkillEnum.DODGE]: 'DEX/2', // Special value
  [SkillEnum.FIREARMS_HANDGUN]: 20,
  [SkillEnum.FIREARMS_RIFLE_SHOTGUN]: 25,
  [SkillEnum.OCCULT]: 5,
  [SkillEnum.SURVIVAL]: 10,
  [SkillEnum.PERSUADE]: 10,
  [SkillEnum.LOCKSMITH]: 1,
  [SkillEnum.JUMP]: 20,
  [SkillEnum.THROW]: 20,
  [SkillEnum.LIBRARY_USE]: 20,
  [SkillEnum.PSYCHOLOGY]: 10,
  [SkillEnum.CREDIT_RATING]: 0,
  [SkillEnum.MEDICINE]: 1,
  [SkillEnum.ART_CRAFT]: 5, // General Art/Craft
  [SkillEnum.SWIM]: 20,
  [SkillEnum.OTHER_LANGUAGE]: 1, // General Other Language
  [SkillEnum.OWN_LANGUAGE]: 'EDU', // Special value
  [SkillEnum.SPOT_HIDDEN]: 25,
  [SkillEnum.TRACK]: 10,
  // ART_CRAFT_PHOTOGRAPHY, SCIENCE_BOTANY, OTHER_LANGUAGE_LATIN, CHARM are not in the image with default values
  // They will be handled by specific occupation templates or character choices if needed.
}
