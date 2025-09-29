import { SkillEnum } from '../../constant/enums' // Changed CheckObjectKey to SkillEnum
import { OccupationTemplate } from '../../interface/OccupationTemplate'

export const privateInvestigatorTemplate: OccupationTemplate = {
  name_cn: '私家侦探',
  name_en: 'Private Investigator',
  description_cn:
    '接受私人委托，进行各种调查取证工作的专业人士。他们通常机警、善于观察，并能灵活应对各种复杂情况。',
  description_en:
    'A professional who undertakes various investigative and evidence-gathering tasks on private commission. They are typically alert, observant, and adept at handling complex situations flexibly.',
  creditRating: 20,

  occupationalSkillTargets: {
    [SkillEnum.FAST_TALK]: 70,
    [SkillEnum.SPOT_HIDDEN]: 60,
    [SkillEnum.PERSUADE]: 60,
    [SkillEnum.PSYCHOLOGY]: 50,
    [SkillEnum.LISTEN]: 50,
    [SkillEnum.LAW]: 50,
    [SkillEnum.LIBRARY_USE]: 40,
    [SkillEnum.DISGUISE]: 40,
  },

  interestSkills: [
    SkillEnum.DRIVE_AUTO, // 跟踪，快速移动
    SkillEnum.LOCKSMITH, // 进入搜查
    SkillEnum.FIGHTING_BRAWL, // 自卫
    SkillEnum.DISGUISE, // 伪装身份
  ],

  background_cn: {
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
    keyConnection: '重要之人',
    injuriesScars: '下巴上有一道几乎看不见的旧伤，是在一次追捕嫌疑人时留下的。',
    phobiasManias:
      '对被人跟踪或监视有高度警觉（职业病）；有反复检查门窗是否锁好的习惯。',
  },
  background_en: {
    description:
      "A detective in a trench coat, hat brim pulled low, with eyes as sharp as an eagle's. Might carry a faint scent of tobacco and an indelible air of mystery.",
    ideologyBeliefs:
      "'There's a truth behind everything, if you're willing to look for it.' Has a natural intuition for lies and deceit, believing justice sometimes requires unconventional methods.",
    significantPeople:
      'An old friend on the police force who sometimes provides case leads off the record; or a former client who now serves as an important informant.',
    meaningfulLocations:
      'Their dimly lit, slightly messy office, walls covered with case-related photos and notes; or the back alley of a city bar frequented by shady characters.',
    treasuredPossessions:
      'A small revolver (perhaps never actually used, more for deterrence); or a black notebook detailing every case handled.',
    traits:
      'Observant, cautious, and resourceful. Accustomed to thinking independently and not trusting anyone easily.',
    keyConnection: 'Significant People',
    injuriesScars:
      'A barely visible old scar on the chin, from a pursuit of a suspect.',
    phobiasManias:
      'Highly alert to being followed or watched (an occupational hazard); a habit of repeatedly checking if doors and windows are locked.',
  },

  // Example character pre-fill data
  exampleCharacterName_cn: '塞缪尔·斯佩德',
  exampleCharacterName_en: 'Samuel Spade',
  exampleCharacterSex: 'Male',
  exampleCharacterAge: 35,
  exampleCharacterBirthplace_cn: '旧金山，加利福尼亚州',
  exampleCharacterBirthplace_en: 'San Francisco, California',
  exampleCharacterResidence_cn: '旧金山，加利福尼亚州',
  exampleCharacterResidence_en: 'San Francisco, California',
  // skillPointsFormula field removed
}
