import { SkillEnum } from '../../constant/enums' // Changed CheckObjectKey to SkillEnum
import { OccupationTemplate } from '../../interface/OccupationTemplate'

export const doctorTemplate: OccupationTemplate = {
  name_cn: '医生',
  name_en: 'Doctor',
  description_cn:
    '受过专业医学训练，致力于诊断、治疗疾病和损伤的专业人士。他们通常具有冷静的头脑和强烈的责任感。',
  description_en:
    'A professional trained in medicine, dedicated to diagnosing and treating illnesses and injuries. They typically possess a calm demeanor and a strong sense of responsibility.',
  creditRatingRange: [30, 80], // 根据CoC核心规则书，医生信用评级范围较广

  occupationalSkills: [
    SkillEnum.FIRST_AID,
    SkillEnum.MEDICINE,
    SkillEnum.PSYCHOLOGY, // 医生需要理解病人心理
    SkillEnum.SCIENCE_BOTANY, // 假设包含药理学或相关生物科学知识
    SkillEnum.OTHER_LANGUAGE_LATIN, // 拉丁文在医学领域常用
    SkillEnum.PERSUADE, // 安抚病人，解释病情
    SkillEnum.SPOT_HIDDEN, // 观察细微症状
    SkillEnum.OWN_LANGUAGE,
  ],

  occupationalSkillTargets: {
    [SkillEnum.FIRST_AID]: 70,
    [SkillEnum.MEDICINE]: 60,
    [SkillEnum.PSYCHOLOGY]: 60,
    [SkillEnum.SCIENCE_BOTANY]: 50, // 调整为植物学，更符合年代和可能涉及的草药学
    [SkillEnum.OTHER_LANGUAGE_LATIN]: 50,
    [SkillEnum.PERSUADE]: 50,
    [SkillEnum.SPOT_HIDDEN]: 40,
    [SkillEnum.OWN_LANGUAGE]: 40,
  },

  interestSkills: [
    SkillEnum.LIBRARY_USE, //查阅医学文献
    SkillEnum.DRIVE_AUTO, // 出诊或应对紧急情况
    SkillEnum.CHARM, // 建立病人信任
    SkillEnum.INTIMIDATE, // 有时需要强硬态度处理不合作的病人或家属
  ],

  background_cn: {
    description:
      '一位穿着熨烫平整的白大褂（或在1920年代可能是深色西装），神情专注而略带疲惫的医生。手指修长，适合进行精细操作。',
    ideologyBeliefs:
      '坚信科学能够战胜一切病痛，但私下里对某些无法用现代医学解释的“病症”感到困惑与好奇。生命至上。',
    significantPeople:
      '一位在医学院时期的导师，现在是某家著名医院的院长，偶尔会介绍一些棘手的“特殊”病例。',
    meaningfulLocations:
      '自己诊所的手术室或实验室，充满了消毒水味；或是城里唯一一家24小时营业的药房。',
    treasuredPossessions:
      '一本磨损严重的解剖学图谱，扉页有导师的赠言；或是一个银质的柳叶刀，据说是祖传的。',
    traits:
      '冷静、理性，富有同情心但从不感情用事。在压力下能保持清晰的判断力。',
    keyConnection: '重要之人',
    injuriesScars: '右手虎口处有一道因早年操作不慎被手术刀划伤的细小疤痕。',
    phobiasManias:
      '对血液有超乎常人的冷静（甚至可以说是麻木）；对无法治愈的疾病有一种职业性的挫败感和恐惧。',
  },
  background_en: {
    description:
      'A doctor in a neatly pressed white coat (or perhaps a dark suit in the 1920s), with a focused and slightly weary expression. Long fingers, suitable for delicate procedures.',
    ideologyBeliefs:
      "Firmly believes that science can overcome all ailments, but privately is perplexed and curious about certain 'conditions' inexplicable by modern medicine. Life is paramount.",
    significantPeople:
      "A mentor from medical school, now the dean of a renowned hospital, who occasionally refers tricky 'special' cases.",
    meaningfulLocations:
      "Their clinic's operating room or laboratory, filled with the scent of disinfectant; or the city's only 24-hour pharmacy.",
    treasuredPossessions:
      'A well-worn anatomical atlas with a dedication from their mentor on the flyleaf; or a silver lancet, said to be an heirloom.',
    traits:
      'Calm, rational, compassionate but never sentimental. Maintains clear judgment under pressure.',
    keyConnection: 'Significant People',
    injuriesScars:
      'A small, fine scar on the web of their right hand, from an accidental scalpel cut during an early procedure.',
    phobiasManias:
      'An unusually calm (perhaps even numb) demeanor towards blood; a professional frustration and fear of incurable diseases.',
  },

  // Example character pre-fill data
  exampleCharacterName_cn: '埃莉诺·安斯沃思',
  exampleCharacterName_en: 'Eleanor Ainsworth',
  exampleCharacterSex: 'Female',
  exampleCharacterAge: 29,
  exampleCharacterBirthplace_cn: '费城，宾夕法尼亚州',
  exampleCharacterBirthplace_en: 'Philadelphia, Pennsylvania',
  exampleCharacterResidence_cn: '纽约市，纽约州',
  exampleCharacterResidence_en: 'New York City, New York',
  // skillPointsFormula field removed
}
