export enum GameFlag {
  LAST_NIGHT_SKILL_CHECK_SUCCESS = 'LAST_NIGHT_SKILL_CHECK_SUCCESS',
  PENALTY_DICE_TODAY = 'PENALTY_DICE_TODAY',
  FOUGHT_LAST_NIGHT = 'FOUGHT_LAST_NIGHT',
  IS_INJURED = 'IS_INJURED',
  APPOINTMENT_WITH_ABOGAIST_9PM_CEMETERY = 'APPOINTMENT_WITH_ABOGAIST_9PM_CEMETERY',
  HAS_TRY_SCIENCE_BOTANY_AT_266 = 'HAS_TRY_SCIENCE_BOTANY_AT_266',
}

export type GameFlagVaule = boolean | number | string

export const GameFlagNames: Record<
  GameFlag,
  { en: string | undefined; cn: string | undefined }
> = {
  [GameFlag.LAST_NIGHT_SKILL_CHECK_SUCCESS]: {
    en: 'Last Night Skill Check Success',
    cn: '你昨晚曾在技能检定中成功过',
  },
  [GameFlag.PENALTY_DICE_TODAY]: {
    en: 'Penalty Dice Today',
    cn: '今日技能检定受惩罚骰',
  },
  [GameFlag.FOUGHT_LAST_NIGHT]: {
    en: 'Fought Last Night',
    cn: '昨晚参与过战斗',
  },
  [GameFlag.IS_INJURED]: {
    en: 'Is Injured',
    cn: '已受伤',
  },
  [GameFlag.APPOINTMENT_WITH_ABOGAIST_9PM_CEMETERY]: {
    en: 'Appointment with Abogast at 9 PM in Cemetery',
    cn: '与阿博加斯特约定晚上9点墓地见',
  },
  [GameFlag.HAS_TRY_SCIENCE_BOTANY_AT_266]: {
    en: undefined,
    cn: undefined,
  },
}
