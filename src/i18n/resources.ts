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
    },
    check: {
      perform: '尝试进行',
      skillCheck: '技能检定',
      difficulty: '难度：',
      result: '检定结果',
      rollValue: '掷骰点数',
      success: '成功',
      failure: '失败',
      criticalSuccess: '极限成功',
      hardSuccess: '困难成功',
      extremeSuccess: '极限成功',
      fumble: '大失败',
      continue: '继续',
    },
    roles: {
      privateInvestigator: '私家侦探',
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
    },
    check: {
      perform: 'Attempt',
      skillCheck: 'Skill Check',
      difficulty: 'Difficulty: ',
      result: 'Check Result',
      rollValue: 'Roll Value',
      success: 'Success',
      failure: 'Failure',
      criticalSuccess: 'Critical Success',
      hardSuccess: 'Hard Success',
      extremeSuccess: 'Extreme Success',
      fumble: 'Fumble',
      continue: 'Continue',
    },
    roles: {
      privateInvestigator: 'Private Investigator',
    },
  },
} as const

type TranslationsType = typeof translations
type ResourceKeys<T> = {
  [P in keyof T]: T[P] extends object ? ResourceKeys<T[P]> : string
}

export type I18nResources = ResourceKeys<TranslationsType['cn']>
