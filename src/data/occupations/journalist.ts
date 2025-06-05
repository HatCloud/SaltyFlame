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

  background_cn: {
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
  background_en: {
    description:
      'A journalist always in a hurry, with a coat pocket stuffed with notebooks and pencils. Sharp eyes, seemingly always looking for the next big story. Might wear a fedora.',
    ideologyBeliefs:
      "'The public has a right to know the truth.' Abhors any attempt to cover up facts, firmly believing in the power of words to change the world.",
    significantPeople:
      'An experienced old editor at the newspaper, short-tempered but always gives guidance at critical moments; or a mysterious informant who only communicates through encrypted letters.',
    meaningfulLocations:
      'The smoke-filled newspaper office, with typewriters clattering; or the scene of a major event, cordoned off.',
    treasuredPossessions:
      'A small but sturdy portable typewriter, a companion for many years; or a significant negative from a major event scene.',
    traits:
      'Extremely curious, acts quickly, sometimes takes risks for a story. Strong social skills, but also easily offends people.',
    keyConnection: 'significantPeople',
    injuriesScars:
      'An inconspicuous scar on the temple, from being pushed and hitting something during a pursuit while reporting on gang activities.',
    phobiasManias:
      "A physiological aversion to answers like 'no comment'; a habit of collecting newspaper headlines.",
  },

  // Example character pre-fill data
  exampleCharacterName_cn: '托马斯·“汤姆”·莱利',
  exampleCharacterName_en: 'Thomas "Tom" Riley',
  exampleCharacterSex: 'Male',
  exampleCharacterAge: 27,
  exampleCharacterBirthplace_cn: '芝加哥，伊利诺伊州',
  exampleCharacterBirthplace_en: 'Chicago, Illinois',
  exampleCharacterResidence_cn: '纽约市，纽约州',
  exampleCharacterResidence_en: 'New York City, New York',
  // skillPointsFormula field removed
}
