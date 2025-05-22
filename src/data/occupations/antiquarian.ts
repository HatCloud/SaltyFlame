import { CheckObjectKey } from '../../interface/enums'
import { OccupationTemplate } from '../../interface/OccupationTemplate'

export const antiquarianTemplate: OccupationTemplate = {
  name_cn: '文物学家',
  name_en: 'Antiquarian',
  description_cn:
    '专注于研究、收集和鉴定古物、手稿和历史遗迹的学者。他们通常对历史的隐秘角落和被遗忘的知识充满热情。',
  description_en:
    'A scholar dedicated to the study, collection, and authentication of antiquities, manuscripts, and historical sites. They are often passionate about the hidden corners of history and forgotten lore.',
  creditRatingRange: [30, 70], // 根据CoC核心规则书，文物学家信用评级范围

  occupationalSkills: [
    CheckObjectKey.APPRAISE,
    CheckObjectKey.ARCHAEOLOGY,
    CheckObjectKey.HISTORY,
    CheckObjectKey.LIBRARY_USE,
    CheckObjectKey.OTHER_LANGUAGE_LATIN, // 假设拉丁文是常见的学术语言
    CheckObjectKey.SPOT_HIDDEN,
    CheckObjectKey.PERSUADE,
    CheckObjectKey.OWN_LANGUAGE, // 母语技能值通常基于EDU，但这里按预设分配
  ],

  occupationalSkillTargets: {
    [CheckObjectKey.APPRAISE]: 70,
    [CheckObjectKey.ARCHAEOLOGY]: 60,
    [CheckObjectKey.HISTORY]: 60,
    [CheckObjectKey.LIBRARY_USE]: 50,
    [CheckObjectKey.OTHER_LANGUAGE_LATIN]: 50,
    [CheckObjectKey.SPOT_HIDDEN]: 50,
    [CheckObjectKey.PERSUADE]: 40,
    [CheckObjectKey.OWN_LANGUAGE]: 40, // 如果EDU%更高，此预设值会覆盖，但上限75%
  },

  interestSkills: [
    CheckObjectKey.CTHULHU_MYTHOS, // 文物学家很容易接触到神话知识
    CheckObjectKey.ART_CRAFT_PHOTOGRAPHY, // 记录发现
    CheckObjectKey.DRIVE_AUTO, // 前往偏远地区
    CheckObjectKey.LISTEN, // 通用技能
  ],

  background: {
    description:
      '一位戴着夹鼻眼镜，衣着略显不合时宜但整洁的学者，身上总带着一股旧书和灰尘的味道。眼神中透露出对古老事物的好奇与审慎。',
    ideologyBeliefs:
      '坚信“历史是过去的政治，政治是现在的历史”。对所有被主流历史所忽略的“细枝末节”抱有浓厚兴趣，认为真相往往隐藏其中。',
    significantPeople:
      '一位隐居的私人收藏家，偶尔会委托鉴定一些来源可疑的古物，此人似乎知道一些不为人知的秘密。',
    meaningfulLocations:
      '城市边缘一家名为“尘封秘卷”的旧书店，店主是个沉默寡言的老头；或是某个被遗忘的古代战场遗址。',
    treasuredPossessions:
      '一把刻有奇特符号的古老铜钥匙，据说是从某个被诅咒的遗迹中找到的，至今未找到对应的锁。',
    traits:
      '博学、细致，有时因过于专注而显得有些不近人情。对细节有近乎偏执的追求。',
    keyConnection: 'significantPeople',
    injuriesScars:
      '左手手背上有一道浅浅的疤痕，是在一次埃及古墓的非正式“考察”中被不明器物划伤的。',
    phobiasManias:
      '对特定的古代符号组合有莫名的不安感（轻微符号恐惧症）；有收集特定时期地图的癖好。',
  },

  skillPointsFormula: 'EDU x 4 (传统规则参考)',
}
