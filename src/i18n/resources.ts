export const translations = {
  cn: {
    common: {
      goBack: '返回上级',
      goTo: '前往',
      notFound: '找不到场景',
    },
    stats: {
      hp: 'HP',
      san: 'SAN',
      str: 'STR',
      con: 'CON',
      siz: 'SIZ',
      dex: 'DEX',
      app: 'APP',
      edu: 'EDU',
      int: 'INT',
      pow: 'POW',
      luck: '幸运', // Added luck
    },
    check: {
      perform: '尝试进行',
      skillCheck: '技能检定',
      difficulty: '难度：',
      targetValue: '成功需要点数：',
      result: '检定结果',
      rollValue: '掷骰点数',
      success: '成功',
      failure: '失败',
      criticalSuccess: '极限成功', // This is a general term, might be different from status
      statusCriticalSuccess: '大成功', // Specific status display
      hardSuccess: '困难成功',
      extremeSuccess: '极限成功',
      fumble: '大失败', // Can be used as status for fumble
      continue: '继续',
      yourValueIs: '你的 {{skillName}} 为 {{value}}',
    },
    condition: {
      // Added condition section
      hasItem: '需要物品：{{item}}',
      hasNotItem: '不能拥有物品：{{item}}',
      flagSet: '需要标记：{{flag}}',
      flagNotSet: '不能有标记：{{flag}}',
    },
    roles: {
      privateInvestigator: '私家侦探',
    },
    skillCategory: {
      combat: '战斗',
      communication: '沟通',
      knowledge: '知识',
      perception: '感知',
      manipulation: '操作',
      artCraft: '艺术/手艺',
      mythos: '克苏鲁神话',
      other: '其他',
    },
    charModal: {
      personalInfo: '个人信息',
      age: '年龄',
      sex: '性别',
      birthplace: '出生地',
      residence: '住所',
      status: '状态',
      majorWound: '重伤昏迷',
      dying: '濒死',
      tempInsane: '暂时性疯狂',
      indefInsane: '永久性疯狂',
      mp: '魔法值',
      characteristics: '属性',
      derivedStats: '派生属性',
      damageBonus: '伤害加值',
      build: '体格',
      dodgeValue: '闪避值', // Distinguish from stats.dodge which is the characteristic name
      skills: '技能',
      inventory: '物品栏',
      inventoryEmpty: '物品栏为空',
      weaponDamage: '伤害',
      weaponRange: '射程',
      weaponAmmo: '弹药',
      weaponMalf: '故障率',
      weaponNotes: '备注',
      markedSkills: '已标记技能',
      noMarkedSkills: '无已标记技能',
      close: '关闭',
      backgroundTitle: '背景信息', // New Title
      background: {
        // New sub-object for background details
        description: '形象描述',
        ideologyBeliefs: '思想与信念',
        significantPeople: '重要之人',
        meaningfulLocations: '意义非凡之地',
        treasuredPossessions: '宝贵之物',
        traits: '特质',
        keyConnection: '关键背景连接',
        injuriesScars: '伤口与疤痕',
        phobiasManias: '恐惧症与躁狂症',
        mythosTomesSpellsArcaneObjects: '神话典籍/法术/奥秘物品',
        encountersWithStrangeEntities: '第三类接触',
      },
    },
  },
  en: {
    common: {
      goBack: 'Go Back',
      goTo: 'Go to',
      notFound: 'Scene not found',
    },
    stats: {
      hp: 'HP',
      san: 'SAN',
      str: 'STR',
      con: 'CON',
      siz: 'SIZ',
      dex: 'DEX',
      app: 'APP',
      edu: 'EDU',
      int: 'INT',
      pow: 'POW',
      luck: 'Luck', // Added luck
    },
    check: {
      perform: 'Attempt',
      skillCheck: 'Skill Check',
      difficulty: 'Difficulty: ',
      targetValue: 'Success Requires Points: ',
      result: 'Check Result',
      rollValue: 'Roll Value',
      success: 'Success',
      failure: 'Failure',
      criticalSuccess: 'Critical Success', // General term
      statusCriticalSuccess: 'Critical Success', // Specific status display
      hardSuccess: 'Hard Success',
      extremeSuccess: 'Extreme Success',
      fumble: 'Fumble', // Can be used as status for fumble
      continue: 'CONTINUE',
      yourValueIs: 'Your {{skillName}} is {{value}}',
    },
    condition: {
      // Added condition section
      hasItem: 'Requires item: {{item}}',
      hasNotItem: 'Must not have item: {{item}}',
      flagSet: 'Requires flag: {{flag}}',
      flagNotSet: 'Must not have flag: {{flag}}',
    },
    roles: {
      privateInvestigator: 'Private Investigator',
    },
    skillCategory: {
      combat: 'Combat',
      communication: 'Communication',
      knowledge: 'Knowledge',
      perception: 'Perception',
      manipulation: 'Manipulation',
      artCraft: 'Art/Craft',
      mythos: 'Cthulhu Mythos',
      other: 'Other',
    },
    charModal: {
      personalInfo: 'Personal Info',
      age: 'Age',
      sex: 'Sex',
      birthplace: 'Birthplace',
      residence: 'Residence',
      status: 'Status',
      majorWound: 'Major Wound',
      dying: 'Dying',
      tempInsane: 'Temporary Insanity',
      indefInsane: 'Indefinite Insanity',
      mp: 'Magic Points',
      characteristics: 'Characteristics',
      derivedStats: 'Derived Stats',
      damageBonus: 'Damage Bonus',
      build: 'Build',
      dodgeValue: 'Dodge Value',
      skills: 'Skills',
      inventory: 'Inventory',
      inventoryEmpty: 'Inventory is empty',
      weaponDamage: 'Damage',
      weaponRange: 'Range',
      weaponAmmo: 'Ammo',
      weaponMalf: 'Malf.',
      weaponNotes: 'Notes',
      markedSkills: 'Marked Skills',
      noMarkedSkills: 'No marked skills',
      close: 'Close',
      backgroundTitle: 'Background Info', // New Title
      background: {
        // New sub-object for background details
        description: 'Description',
        ideologyBeliefs: 'Ideology & Beliefs',
        significantPeople: 'Significant People',
        meaningfulLocations: 'Meaningful Locations',
        treasuredPossessions: 'Treasured Possessions',
        traits: 'Traits',
        keyConnection: 'Key Connection',
        injuriesScars: 'Injuries & Scars',
        phobiasManias: 'Phobias & Manias',
        mythosTomesSpellsArcaneObjects: 'Mythos Tomes/Spells/Arcane Objects',
        encountersWithStrangeEntities: 'Encounters with Strange Entities',
      },
    },
  },
} as const

type TranslationsType = typeof translations
type ResourceKeys<T> = {
  [P in keyof T]: T[P] extends object ? ResourceKeys<T[P]> : string
}

export type I18nResources = ResourceKeys<TranslationsType['cn']>
