import {CheckObjectKey} from '../../interface/enums'
import {OccupationTemplate} from '../../interface/OccupationTemplate'

export const privateInvestigatorTemplate: OccupationTemplate = {
  name_cn: '私家侦探',
  name_en: 'Private Investigator',
  description_cn:
    '接受私人委托，进行各种调查取证工作的专业人士。他们通常机警、善于观察，并能灵活应对各种复杂情况。',
  description_en:
    'A professional who undertakes various investigative and evidence-gathering tasks on private commission. They are typically alert, observant, and adept at handling complex situations flexibly.',
  creditRatingRange: [9, 40], // 根据CoC核心规则书，私家侦探信用评级与记者类似

  occupationalSkills: [
    CheckObjectKey.FAST_TALK,
    CheckObjectKey.PERSUADE,
    CheckObjectKey.INTIMIDATE,
    CheckObjectKey.SPOT_HIDDEN,
    CheckObjectKey.LISTEN,
    CheckObjectKey.LIBRARY_USE, // 调查背景资料
    CheckObjectKey.PSYCHOLOGY, //洞察人心
    CheckObjectKey.STEALTH, // 跟踪与潜入
  ],

  occupationalSkillTargets: {
    [CheckObjectKey.FAST_TALK]: 70,
    [CheckObjectKey.SPOT_HIDDEN]: 60,
    [CheckObjectKey.PERSUADE]: 60,
    [CheckObjectKey.PSYCHOLOGY]: 50,
    [CheckObjectKey.LISTEN]: 50,
    [CheckObjectKey.INTIMIDATE]: 50,
    [CheckObjectKey.LIBRARY_USE]: 40,
    [CheckObjectKey.STEALTH]: 40,
  },

  interestSkills: [
    CheckObjectKey.DRIVE_AUTO, // 跟踪，快速移动
    CheckObjectKey.LOCKSMITH, // 进入搜查
    CheckObjectKey.FIGHTING_BRAWL, // 自卫
    CheckObjectKey.DISGUISE, // 伪装身份
  ],

  background: {
    description:
      '一位穿着风衣，帽檐压得很低，眼神锐利如鹰的侦探。身上可能带着淡淡的烟草味和一丝挥之不去的神秘感。',
    ideologyBeliefs:
      '“每件事背后都有真相，只是看你愿不愿意去寻找。” 对谎言和欺骗有天生的直觉，相信正义有时需要用非传统手段来实现。',
    significantPeople:
      '一位在警局工作的老朋友，有时会私下提供一些案件线索；或是一位过去帮助过的客户，现在成了重要的情报来源。',
    meaningfulLocations:
      '自己那间灯光昏暗、略显凌乱的办公室，墙上贴满了案件相关的照片和笔记；或是城市中某个龙蛇混杂的酒吧后巷。',
    treasuredPossessions:
      '一把小巧的左轮手枪（可能并未实际使用过，更多是威慑）；或是一个记录了所有经手案件细节的黑色笔记本。',
    traits: '观察力敏锐，行事谨慎，足智多谋。习惯独立思考，不轻易相信任何人。',
    keyConnection: 'significantPeople',
    injuriesScars: '下巴上有一道几乎看不见的旧伤，是在一次追捕嫌疑人时留下的。',
    phobiasManias:
      '对被人跟踪或监视有高度警觉（职业病）；有反复检查门窗是否锁好的习惯。',
  },

  skillPointsFormula:
    'EDU x 2 + (DEX x 2 or STR x 2) (传统规则参考，侦探依赖教育，以及敏捷或力量)',
}
