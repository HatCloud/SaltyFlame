import { CheckObjectKey } from '../../interface/enums'
import { OccupationTemplate } from '../../interface/OccupationTemplate'

export const professorTemplate: OccupationTemplate = {
  name_cn: '教授',
  name_en: 'Professor',
  description_cn:
    '在高等教育机构从事教学和研究的学者。他们通常在某一领域拥有深厚的知识，并乐于传授和探索新知。',
  description_en:
    'A scholar engaged in teaching and research at an institution of higher education. They typically possess profound knowledge in a specific field and are eager to impart and explore new knowledge.',
  creditRatingRange: [20, 70], // 根据CoC核心规则书，教授信用评级

  occupationalSkills: [
    CheckObjectKey.LIBRARY_USE,
    CheckObjectKey.OWN_LANGUAGE,
    CheckObjectKey.PERSUADE,
    CheckObjectKey.PSYCHOLOGY, // 理解学生和同事
    CheckObjectKey.HISTORY, // 多数教授涉猎历史或有相关背景
    CheckObjectKey.ARCHAEOLOGY, // 某些领域的教授，如历史、人类学
    CheckObjectKey.OTHER_LANGUAGE_LATIN, // 学术研究常用
    CheckObjectKey.APPRAISE, // 可能需要鉴定学术相关物品
  ],

  occupationalSkillTargets: {
    [CheckObjectKey.LIBRARY_USE]: 70,
    [CheckObjectKey.OWN_LANGUAGE]: 60,
    [CheckObjectKey.PERSUADE]: 60,
    [CheckObjectKey.PSYCHOLOGY]: 50,
    [CheckObjectKey.HISTORY]: 50, // 假设为历史或相关人文教授
    [CheckObjectKey.ARCHAEOLOGY]: 50, // 同上
    [CheckObjectKey.OTHER_LANGUAGE_LATIN]: 40,
    [CheckObjectKey.APPRAISE]: 40,
  },

  interestSkills: [
    CheckObjectKey.CHARM, // 课堂魅力或与同事社交
    CheckObjectKey.SPOT_HIDDEN, // 研究中发现细节
    CheckObjectKey.DRIVE_AUTO, // 通勤或外出调研
    CheckObjectKey.NATURAL_WORLD, // 可能的业余爱好或研究方向
  ],

  background: {
    description:
      '一位穿着合身的粗花呢西装，头发可能有些凌乱但眼神睿智的教授。身上带着淡淡的书卷气，说话条理清晰，偶尔会引用经典。',
    ideologyBeliefs:
      '“知识是照亮黑暗的唯一火炬。” 对无知和迷信深感痛惜，坚信理性和逻辑能够解释世间万物（尽管最近遇到的一些事开始动摇这个信念）。',
    significantPeople:
      '大学里一位德高望重的老院长，是其学术道路上的引路人；或是一位曾经的学生，现在在某个意想不到的领域取得了成就，并带来了麻烦的委托。',
    meaningfulLocations:
      '大学图书馆那间布满灰尘的善本室；或是自己那间堆满了书籍和研究资料的办公室，窗外是宁静的校园。',
    treasuredPossessions:
      '一支陪伴多年的钢笔，用它写下了无数的讲稿和论文；或是一本罕见的学术专著，扉页有作者的亲笔签名。',
    traits:
      '博学、健谈，有时会不自觉地陷入学术探讨。对自己的研究领域充满热情，但对世俗事务可能有些迟钝。',
    keyConnection: 'significantPeople',
    injuriesScars: '鼻梁上有一道戴眼镜留下的永久压痕。',
    phobiasManias:
      '对学术剽窃行为有极度的憎恶；有在谈话中不自觉地纠正他人语法或事实错误的习惯。',
  },

  skillPointsFormula: 'EDU x 4 (传统规则参考，教授的核心是教育)',
}
