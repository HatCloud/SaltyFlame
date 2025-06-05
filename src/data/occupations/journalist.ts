import { CheckObjectKey } from '../../constant/enums'
import { OccupationTemplate } from '../../interface/OccupationTemplate'

export const journalistTemplate: OccupationTemplate = {
  name_cn: '记者',
  name_en: 'Journalist',
  description_cn:
    '致力于挖掘、调查和报道新闻事件的专业人士。他们通常好奇心强，善于交际，并敢于揭露真相。',
  description_en:
    'A professional dedicated to uncovering, investigating, and reporting on news events. They are typically curious, sociable, and courageous in exposing the truth.',
  creditRatingRange: [9, 40], // 根据CoC核心规则书，记者信用评级通常不高

  occupationalSkills: [
    CheckObjectKey.FAST_TALK,
    CheckObjectKey.PERSUADE,
    CheckObjectKey.PSYCHOLOGY, // 理解采访对象
    CheckObjectKey.HISTORY, // 提供报道背景
    CheckObjectKey.LIBRARY_USE, // 查资料
    CheckObjectKey.OWN_LANGUAGE, // 写作
    CheckObjectKey.SPOT_HIDDEN, // 发现线索
    CheckObjectKey.ART_CRAFT_PHOTOGRAPHY, // 摄影取证
  ],

  occupationalSkillTargets: {
    [CheckObjectKey.FAST_TALK]: 70,
    [CheckObjectKey.PERSUADE]: 60,
    [CheckObjectKey.PSYCHOLOGY]: 60,
    [CheckObjectKey.HISTORY]: 50,
    [CheckObjectKey.LIBRARY_USE]: 50,
    [CheckObjectKey.OWN_LANGUAGE]: 50,
    [CheckObjectKey.SPOT_HIDDEN]: 40,
    [CheckObjectKey.ART_CRAFT_PHOTOGRAPHY]: 40,
  },

  interestSkills: [
    CheckObjectKey.DRIVE_AUTO, // 快速赶往新闻现场
    CheckObjectKey.STEALTH, // 秘密调查
    CheckObjectKey.CHARM, // 获取信息
    CheckObjectKey.INTIMIDATE, // 必要时的强硬手段
  ],

  background: {
    description:
      '一位总是行色匆匆，外套口袋里塞满了笔记本和铅笔的记者。眼神锐利，似乎总在寻找下一个大新闻。可能戴着一顶软毡帽。',
    ideologyBeliefs:
      '“公众有权知道真相。” 对任何试图掩盖事实的行为都深恶痛绝，坚信文字的力量可以改变世界。',
    significantPeople:
      '报社里一位经验丰富的老编辑，脾气暴躁但总能在关键时刻给出指点；或是一位神秘的线人，只通过加密的信件联系。',
    meaningfulLocations:
      '烟雾缭绕的报社办公室，打字机声此起彼伏；或是某个刚刚发生过大事件的现场，拉着警戒线。',
    treasuredPossessions:
      '一台小巧但坚固的便携式打字机，陪伴多年；或是一张在某个重大事件现场拍摄的、意义非凡的底片。',
    traits:
      '好奇心极强，行动迅速，有时为了新闻不惜冒一些风险。社交能力强，但也容易得罪人。',
    keyConnection: 'significantPeople',
    injuriesScars:
      '额角有一块不明显的疤痕，是在一次追踪报道黑帮活动时被不明人士推搡撞到的。',
    phobiasManias:
      '对“无可奉告”这样的回答有生理性的厌恶；有收集各种报纸头条的习惯。',
  },

  skillPointsFormula:
    'EDU x 2 + DEX x 2 (传统规则参考，记者需要教育和敏捷的头脑与行动)',
}
