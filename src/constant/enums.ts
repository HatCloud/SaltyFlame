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
  [CheckObjectKey.ACCOUNTING]: { en: 'Accounting', cn: '会计' },
  [CheckObjectKey.ANTHROPOLOGY]: { en: 'Anthropology', cn: '人类学' },
  [CheckObjectKey.APPRAISE]: { en: 'Appraise', cn: '估价' },
  [CheckObjectKey.APPEASE]: { en: 'Appease', cn: '取悦' },
  [CheckObjectKey.ARCHAEOLOGY]: { en: 'Archaeology', cn: '考古学' },
  [CheckObjectKey.ART_CRAFT]: { en: 'Art/Craft', cn: '艺术/手艺' },
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
  [CheckObjectKey.ELECTRICAL_REPAIR]: {
    en: 'Electrical Repair',
    cn: '电气维修',
  },
  [CheckObjectKey.FAST_TALK]: { en: 'Fast Talk', cn: '话术' },
  [CheckObjectKey.FIGHTING_BRAWL]: { en: 'Fighting (Brawl)', cn: '格斗(斗殴)' },
  [CheckObjectKey.FIREARMS_HANDGUN]: {
    en: 'Firearms (Handgun)',
    cn: '射击(手枪)',
  },
  [CheckObjectKey.FIREARMS_RIFLE_SHOTGUN]: {
    en: 'Firearms (Rifle/Shotgun)',
    cn: '射击(步枪/霰弹枪)',
  },
  [CheckObjectKey.FIRST_AID]: { en: 'First Aid', cn: '急救' },
  [CheckObjectKey.HISTORY]: { en: 'History', cn: '历史' },
  [CheckObjectKey.INTIMIDATE]: { en: 'Intimidate', cn: '恐吓' },
  [CheckObjectKey.JUMP]: { en: 'Jump', cn: '跳跃' },
  [CheckObjectKey.LAW]: { en: 'Law', cn: '法律' },
  [CheckObjectKey.LIBRARY_USE]: { en: 'Library Use', cn: '图书馆使用' },
  [CheckObjectKey.LISTEN]: { en: 'Listen', cn: '聆听' },
  [CheckObjectKey.LOCKSMITH]: { en: 'Locksmith', cn: '锁匠' },
  [CheckObjectKey.MANIPULATE]: { en: 'Manipulate', cn: '操纵' },
  [CheckObjectKey.MECHANICAL_REPAIR]: {
    en: 'Mechanical Repair',
    cn: '机械维修',
  },
  [CheckObjectKey.MEDICINE]: { en: 'Medicine', cn: '医学' },
  [CheckObjectKey.NATURAL_WORLD]: { en: 'Natural World', cn: '博物学' },
  [CheckObjectKey.NAVIGATE]: { en: 'Navigate', cn: '导航' },
  [CheckObjectKey.OCCULT]: { en: 'Occult', cn: '神秘学' },
  [CheckObjectKey.OPERATE_HEAVY_MACHINERY]: {
    en: 'Operate Heavy Machinery',
    cn: '操作重机',
  },
  [CheckObjectKey.OTHER_LANGUAGE]: { en: 'Other Language', cn: '语言' },
  [CheckObjectKey.OTHER_LANGUAGE_LATIN]: {
    en: 'Other Language (Latin)',
    cn: '其他语言（拉丁文）',
  },
  [CheckObjectKey.OWN_LANGUAGE]: { en: 'Own Language', cn: '母语' },
  [CheckObjectKey.PERSUADE]: { en: 'Persuade', cn: '说服' },
  [CheckObjectKey.PSYCHOANALYSIS]: { en: 'Psychoanalysis', cn: '精神分析' },
  [CheckObjectKey.PSYCHOLOGY]: { en: 'Psychology', cn: '心理学' },
  [CheckObjectKey.RIDE]: { en: 'Ride', cn: '骑术' },
  [CheckObjectKey.SCIENCE]: { en: 'Science', cn: '科学' },
  [CheckObjectKey.SCIENCE_BOTANY]: {
    en: 'Science (Botany)',
    cn: '科学(植物学)',
  },
  [CheckObjectKey.SLEIGHT_OF_HAND]: { en: 'Sleight of Hand', cn: '妙手' },
  [CheckObjectKey.SPOT_HIDDEN]: { en: 'Spot Hidden', cn: '侦查' },
  [CheckObjectKey.STEALTH]: { en: 'Stealth', cn: '潜行' },
  [CheckObjectKey.SURVIVAL]: { en: 'Survival', cn: '生存' },
  [CheckObjectKey.SWIM]: { en: 'Swim', cn: '游泳' },
  [CheckObjectKey.THROW]: { en: 'Throw', cn: '投掷' },
  [CheckObjectKey.TRACK]: { en: 'Track', cn: '追踪' },
  // Note: This list is not exhaustive for all CoC skills, but covers those most likely in this scenario.
  // Will add more as they appear in the PDF.
}

// --- Type Aliases for specific categories of CheckObjectKey ---

// Core characteristics directly from the character sheet
export type CoreCharacteristicKey =
  | CheckObjectKey.STR
  | CheckObjectKey.CON
  | CheckObjectKey.SIZ
  | CheckObjectKey.DEX
  | CheckObjectKey.APP
  | CheckObjectKey.INT
  | CheckObjectKey.POW
  | CheckObjectKey.EDU

// Rolls like Luck, Sanity, and potentially Move if treated as a rollable value
export type RollKey =
  | CheckObjectKey.LUCK
  | CheckObjectKey.SANITY
  | CheckObjectKey.MOV // MOV is sometimes a derived stat but can be "checked"

// All skills available for checks
export type SkillKey =
  | CheckObjectKey.ACCOUNTING
  | CheckObjectKey.ANTHROPOLOGY
  | CheckObjectKey.APPRAISE
  | CheckObjectKey.APPEASE
  | CheckObjectKey.ARCHAEOLOGY
  | CheckObjectKey.ART_CRAFT
  | CheckObjectKey.ART_CRAFT_PHOTOGRAPHY
  | CheckObjectKey.CHARM
  | CheckObjectKey.CLIMB
  | CheckObjectKey.CREDIT_RATING
  | CheckObjectKey.CTHULHU_MYTHOS
  | CheckObjectKey.DISGUISE
  | CheckObjectKey.DODGE
  | CheckObjectKey.DRIVE_AUTO
  | CheckObjectKey.ELECTRICAL_REPAIR
  | CheckObjectKey.FAST_TALK
  | CheckObjectKey.FIGHTING_BRAWL
  | CheckObjectKey.FIREARMS_HANDGUN
  | CheckObjectKey.FIREARMS_RIFLE_SHOTGUN
  | CheckObjectKey.FIRST_AID
  | CheckObjectKey.HISTORY
  | CheckObjectKey.INTIMIDATE
  | CheckObjectKey.JUMP
  | CheckObjectKey.LAW
  | CheckObjectKey.LIBRARY_USE
  | CheckObjectKey.LISTEN
  | CheckObjectKey.LOCKSMITH
  | CheckObjectKey.MANIPULATE
  | CheckObjectKey.MECHANICAL_REPAIR
  | CheckObjectKey.MEDICINE
  | CheckObjectKey.NATURAL_WORLD
  | CheckObjectKey.NAVIGATE
  | CheckObjectKey.OCCULT
  | CheckObjectKey.OPERATE_HEAVY_MACHINERY
  | CheckObjectKey.OTHER_LANGUAGE
  | CheckObjectKey.OTHER_LANGUAGE_LATIN
  | CheckObjectKey.OWN_LANGUAGE
  | CheckObjectKey.PERSUADE
  | CheckObjectKey.PSYCHOANALYSIS
  | CheckObjectKey.PSYCHOLOGY
  | CheckObjectKey.RIDE
  | CheckObjectKey.SCIENCE
  | CheckObjectKey.SCIENCE_BOTANY
  | CheckObjectKey.SLEIGHT_OF_HAND
  | CheckObjectKey.SPOT_HIDDEN
  | CheckObjectKey.STEALTH
  | CheckObjectKey.SURVIVAL
  | CheckObjectKey.SWIM
  | CheckObjectKey.THROW
  | CheckObjectKey.TRACK

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
  // Characteristics (not typically defaulted here but included for completeness if ever needed)
  [CheckObjectKey.STR]: 0, // Defaulting to 0 as per standard character sheets, actual value from generation
  [CheckObjectKey.CON]: 0,
  [CheckObjectKey.SIZ]: 0,
  [CheckObjectKey.DEX]: 0,
  [CheckObjectKey.APP]: 0,
  [CheckObjectKey.INT]: 0,
  [CheckObjectKey.POW]: 0,
  [CheckObjectKey.EDU]: 0,
  [CheckObjectKey.MOV]: 0,
  [CheckObjectKey.LUCK]: 0, // Luck is usually POW or rolled
  [CheckObjectKey.SANITY]: 0, // Sanity is usually POW

  // Skills from the image
  [CheckObjectKey.NATURAL_WORLD]: 10,
  [CheckObjectKey.MANIPULATE]: 1,
  [CheckObjectKey.OPERATE_HEAVY_MACHINERY]: 1,
  [CheckObjectKey.NAVIGATE]: 10,
  [CheckObjectKey.ELECTRICAL_REPAIR]: 10,
  [CheckObjectKey.LAW]: 5,
  [CheckObjectKey.FIGHTING_BRAWL]: 25,
  [CheckObjectKey.APPRAISE]: 5,
  [CheckObjectKey.FAST_TALK]: 5,
  [CheckObjectKey.MECHANICAL_REPAIR]: 10,
  [CheckObjectKey.FIRST_AID]: 30,
  [CheckObjectKey.PSYCHOANALYSIS]: 1,
  [CheckObjectKey.ARCHAEOLOGY]: 1,
  [CheckObjectKey.SCIENCE]: 1, // General Science
  [CheckObjectKey.CTHULHU_MYTHOS]: 0,
  [CheckObjectKey.INTIMIDATE]: 15,
  [CheckObjectKey.ACCOUNTING]: 5,
  [CheckObjectKey.HISTORY]: 5,
  [CheckObjectKey.LISTEN]: 20,
  [CheckObjectKey.SLEIGHT_OF_HAND]: 10,
  [CheckObjectKey.CLIMB]: 20,
  [CheckObjectKey.RIDE]: 5,
  [CheckObjectKey.DRIVE_AUTO]: 20,
  [CheckObjectKey.STEALTH]: 20,
  [CheckObjectKey.DISGUISE]: 5,
  [CheckObjectKey.APPEASE]: 15,
  [CheckObjectKey.ANTHROPOLOGY]: 1,
  [CheckObjectKey.DODGE]: 'DEX/2', // Special value
  [CheckObjectKey.FIREARMS_HANDGUN]: 20,
  [CheckObjectKey.FIREARMS_RIFLE_SHOTGUN]: 25,
  [CheckObjectKey.OCCULT]: 5,
  [CheckObjectKey.SURVIVAL]: 10,
  [CheckObjectKey.PERSUADE]: 10,
  [CheckObjectKey.LOCKSMITH]: 1,
  [CheckObjectKey.JUMP]: 20,
  [CheckObjectKey.THROW]: 20,
  [CheckObjectKey.LIBRARY_USE]: 20,
  [CheckObjectKey.PSYCHOLOGY]: 10,
  [CheckObjectKey.CREDIT_RATING]: 0,
  [CheckObjectKey.MEDICINE]: 1,
  [CheckObjectKey.ART_CRAFT]: 5, // General Art/Craft
  [CheckObjectKey.SWIM]: 20,
  [CheckObjectKey.OTHER_LANGUAGE]: 1, // General Other Language
  [CheckObjectKey.OWN_LANGUAGE]: 'EDU', // Special value
  [CheckObjectKey.SPOT_HIDDEN]: 25,
  [CheckObjectKey.TRACK]: 10,

  // Skills that were in the enum but not explicitly in the image with a value,
  // default them to a common base if applicable or leave them out if they are too specific
  // For now, only adding those from the image.
  // [CheckObjectKey.ART_CRAFT_PHOTOGRAPHY]: 5, // Example if we assume it's a specific Art/Craft
  // [CheckObjectKey.SCIENCE_BOTANY]: 1, // Example if we assume it's a specific Science
  // [CheckObjectKey.OTHER_LANGUAGE_LATIN]: 1, // Example if we assume it's a specific Language
  // [CheckObjectKey.CHARM]: 15, // Charm is often 15% base in some rule sets
}
