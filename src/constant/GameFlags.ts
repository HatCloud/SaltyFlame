export enum GameFlag {
  LAST_NIGHT_SKILL_CHECK_SUCCESS = 'LAST_NIGHT_SKILL_CHECK_SUCCESS',
  PENALTY_DICE_TODAY = 'PENALTY_DICE_TODAY',
  FOUGHT_LAST_NIGHT = 'FOUGHT_LAST_NIGHT',
  LEARNED_ABOGASTR_CHANT = 'LEARNED_ABOGASTR_CHANT',
  IS_INJURED = 'IS_INJURED',
  LEARNED_SPELL_COMMAND_FIRE_FROM_SKY = 'LEARNED_SPELL_COMMAND_FIRE_FROM_SKY',
  LEARNED_SPELL_SUMMON_FIRE_FROM_SKY = 'LEARNED_SPELL_SUMMON_FIRE_FROM_SKY',
  APPOINTMENT_WITH_ABOGAIST_9PM_CEMETERY = 'APPOINTMENT_WITH_ABOGAIST_9PM_CEMETERY',
}

export type GameFlagVaule = boolean | number | string

export const GameFlagNames: Record<GameFlag, { en: string; cn: string }> = {
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
  [GameFlag.LEARNED_ABOGASTR_CHANT]: {
    en: "Learned Abogast's Chant",
    cn: '已学会阿博加斯特的咒语',
  },
  [GameFlag.IS_INJURED]: {
    en: 'Is Injured',
    cn: '已受伤',
  },
  [GameFlag.LEARNED_SPELL_COMMAND_FIRE_FROM_SKY]: {
    en: 'Learned Spell: Command Fire from Sky',
    cn: '已学会法术：号令天火',
  },
  [GameFlag.LEARNED_SPELL_SUMMON_FIRE_FROM_SKY]: {
    en: 'Learned Spell: Summon Fire from Sky',
    cn: '已学会法术：召唤天火',
  },
  [GameFlag.APPOINTMENT_WITH_ABOGAIST_9PM_CEMETERY]: {
    en: 'Appointment with Abogast at 9 PM in Cemetery',
    cn: '与阿博加斯特约定晚上9点墓地见',
  },
}
