import type {SceneData} from '../../interface/Scene'
import {
  CheckObjectKey,
  EffectType,
  CheckDifficulty,
  // ConditionType, // Removed as not used in scenes 141-160
} from '../../interface/enums'

export const scenes_141_160: SceneData = {
  '141': {
    id: '141',
    story:
      '这黑影跑得很快，步伐几乎是悄无声息。但你的直觉让你对它紧追不舍。它溜进一片满是尘土的院子，猛然转向拐进了铁栅栏。你步步逼近，它急忙冲进角落里。\n一阵微风吹过，提醒你这里离悬崖边已经很近了。在你奋力追逐时，提灯上闪烁的光芒照亮了悬崖长着草的边缘。你放慢了步伐，留意脚下，以防意外踏入下方的虚空。注视者和你拉开了一点距离，但它没有冲回街巷的迷宫，而是走向了悬崖。你继续逼近。\n漆黑的身影摆了摆头，又一次盯着你。你感觉到短暂的不安，因为它的脸好像有哪里不对劲。然后它从悬崖边上跳了下去。\n你的下巴都要被惊掉了。你来到悬崖边，提灯在风中摇晃。昏暗的光照着你身下的崖壁。你是不是把别人吓得跳崖了？你的直觉告诉你不是。但你也没法解释刚才到底发生了什么。\n进行一次“理智”检定。如果你失败了，失去1D2点理智值。',
    options: [
      {
        type: 'check',
        text: '进行“理智”检定',
        check: {
          details: {
            object: 'characteristic',
            subObject: CheckObjectKey.POW, // Or SANITY if that's the intent
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '63',
          onFailureSceneId: '63', // Goes to 63 in both cases, but failure applies an effect
          successText: '理智检定成功',
          failureText: '理智检定失败',
          onFailureEffects: [{type: EffectType.CHANGE_SANITY, value: '-1D2'}],
        },
      },
    ],
  },
  // S141_SAN_LOSS_THEN_63 is removed as its logic is integrated above.
  '142': {
    id: '142',
    story:
      '你绕着庄稼地跟随这个男人。他向上看了一眼，往两块岩石之间一迈步，居然消失了！\n仔细观察就会发现，有一道狭窄的通道通往悬崖。光线很微弱，刚刚能看清悬崖下有一个自然形成的小山洞。你如果进去，会和这男人很不舒服地贴在一起。',
    options: [
      {type: 'goto', text: '跟着他进去', goto: '191'},
      {type: 'goto', text: '保持距离', goto: '160'},
    ],
  },
  '143': {
    id: '143',
    story:
      '这头熊把爪子放上树干，爬上了树，动作敏捷得惊人。它在树杈上稳住身形，开始从枝叶上扯下黑色的果子——大概是李子？——塞进嘴里。\n你看了大概十分钟，这头熊似乎吃腻了，从树上落回地面。它朝空地四周望望，打了个呵欠，甩开屁股迈进了森林当中。\n观察熊是次特殊的经历。你可以在你的「博物学」技能上永久增加2点。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '79',
        effects: [
          {
            type: EffectType.SET_FLAG,
            gameFlag: 'FLAG_INCREASE_NATURAL_WORLD_2',
            flagValue: true,
          },
        ],
      },
    ],
  },
  '144': {
    id: '144',
    story:
      '长途车咯吱咯吱地继续行驶，西拉斯又一言不发了。你身后的天色逐渐变暗，随着日落西山，云彩也被染上了一层粉红色。终于，你看到了受人欢迎的景象：坡顶上坐落着一个小村庄。这里和你在照片上见过的奥西皮并不一样。但你也许可以说服西拉斯停一下车，让你伸展伸展腿脚。\n过了几分钟，发动机突然急促地停止，打断了你的沉思。西拉斯皱起眉头，拉了一下变速杆。\n长途车踉踉跄跄地继续上坡。西拉斯用你察觉不到的声音骂了一句，咬紧牙关，和轮子开始死磕。\n你们似乎在一点一点地往上挪动，终于抵达了第一座房子，一座粗糙红石头砌成的低矮住宅。西拉斯费力地把车停在路边的一块小空地上。他爬下自己的座位，走到发动机舱那里。\n你必须选择使用「汽车驾驶」或「心理学」进行一次检定。如果你选用「汽车驾驶」，你投出的结果需要小于等于技能值。如果你选用「心理学」你需要一次困难成功。这个检定的结果需要小于等于技能值的一半（右上角小方格里的数值）。你只能选择一项技能来检定一次。',
    options: [
      {
        type: 'check',
        text: '尝试「汽车驾驶」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.DRIVE_AUTO,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '174',
          onFailureSceneId: '194',
          successText: '汽车驾驶检定成功',
          failureText: '汽车驾驶检定失败',
        },
      },
      {
        type: 'check',
        text: '尝试「心理学」（困难）检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.PSYCHOLOGY,
            difficulty: CheckDifficulty.HARD,
          },
          onSuccessSceneId: '162',
          onFailureSceneId: '194',
          successText: '心理学检定困难成功',
          failureText: '心理学检定失败',
        },
      },
    ],
  },
  // S144_AUTODRIVE_CHECK and S144_PSYCH_CHECK removed as integrated above.
  '145': {
    id: '145',
    story:
      '“好吧......我想我几分钟以后就回来。”梅抓起一件外套，走进夜色之中。你等了一会儿，到看不见她以后，才开始敲卧室的门。没有人回答，一片沉默。脚步声从地面传来，门开了几寸宽的一道缝。露丝的两只眼睛透过门缝向外张望，从左边看到右边。你告诉她她妈妈出门了，问她在烦恼什么。这双眼一下就盯住了你。\n她低声说：“是明天，每年都会有的。他们带走了我大。如果他们得手了，也会带走你的。”\n她坚定的目光令你不寒而栗。你反复追问。她到底说的是什么？\n“所有人。每个人。你刚一来，他们就在看着你。你被盯上了。”她的声音十分空洞。“过几年，等我再大一些......他们也会带走我。”\n你听到门外传过来脚步声。露丝眨了一下眼睛，随即碰上了卧室的大门。你回头去晾干碗碟。梅走进来，脱下她的外套。\n“和这男人讲话是白费时间，”她不忿地嘟哝着回到了卧室里。\n你可以在所用技能左边的小方框里打勾。',
    // entryEffects depend on the skill used in scene 138. This needs to be handled by the CheckPayload's onSuccessEffects from scene 138.
    options: [{type: 'goto', text: '继续', goto: '157'}],
  },
  '146': {
    id: '146',
    story:
      '你拖着脚走过去的时候，一个守卫对你点点头。你的本能要你赶快逃离，保持这种缓慢的步伐相当费力。但你一直没有加速，直到走上东边的盘山路，才将身上的伪装丢进了烂泥坑。\n你可以在「乔装」技能左边的小方框里打勾。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '152',
        effects: [
          {
            type: EffectType.MARK_SKILL_SUCCESS,
            target: CheckObjectKey.DISGUISE,
          },
        ],
      },
    ],
  },
  '147': {
    id: '147',
    story:
      '你检查书脊的时候，注意到了书架和北墙之间的距离。从外面看，窗户边缘和墙之间估计足有三四尺。书架覆盖了整面用砖砌住的窗户。\n进一步检查之下，你发现了用粘在书架上的书套制成的巧妙机关。当你向左拉机关的时候，就会有一整段书架向外敞开。\n灯塔四周活动的哐哐声似乎越来越响，每当有说话声离房门太近，你都会下意识地退缩。',
    options: [
      {type: 'goto', text: '调查书架后面', goto: '153'},
      {type: 'goto', text: '关上书架，趁着还早赶快逃离', goto: '120'},
    ],
  },
  '148': {
    id: '148',
    story:
      '第一名舞者说：“你的牺牲，会让村子重生；”\n第二名舞者说：“你为了我们大家，直升云霄；”\n第三名舞者说：“愿你在这白热之中获得至福 。”\n她们迂回地跳着舞远去，消失在房子后面。',
    options: [{type: 'goto', text: '继续', goto: '18'}],
  },
  '149': {
    id: '149',
    story:
      '你在靠近熊的时候失去了平衡，被一棵小树绊倒了。小树树干折断，发出了步枪开火一般的劈裂声。熊扭过头来，用漆黑的眼珠锁定了你。\n它以惊人的速度向你疾驰而来。这巨兽猛冲起来相当吓人。',
    options: [
      {type: 'goto', text: '逃开熊', goto: '155'},
      {type: 'goto', text: '坚守不动', goto: '173'},
    ],
  },
  '150': {
    id: '150',
    story:
      '你脱离道路开始追逐这人，感受着野草抓着你的脚。他沿着山脊飞奔，试图躲进一块巨石后面；这巨石正支撑着悬崖之上那座金属建筑物。\n要逮住这个男人，你必须进行一次对抗检定，用你的“敏捷”对抗他的“敏捷”。这个男人的“敏捷”是38。他掷出小于等于19点为困难成功，小于等于7点为极难成功。先进行这个男人的“敏捷”检定，再做你的“敏捷”检定。\n比较你们两人的成功等级。极难成功胜过困难成功，困难成功胜过常规（普通）成功，常规成功胜过失败。如果成功等级相同，技能值高的人胜出。',
    // This is a complex opposed roll. For now, representing as two outcomes.
    // True implementation would require more complex reducer logic or a dedicated action.
    options: [
      {type: 'goto', text: '进行对抗检定（假设你胜出）', goto: '172'},
      {type: 'goto', text: '进行对抗检定（假设你落败）', goto: '87'},
    ],
  },
  '151': {
    id: '151',
    story:
      '梅打了个呵欠，摇摇头：“我觉得明天早上去找他才好。我现在必须要管教下露丝。她今天太不让人省心。”她哐当一声把卧室门关上了。',
    options: [{type: 'goto', text: '继续', goto: '157'}],
  },
  '152': {
    id: '152',
    story:
      '落日低垂，你向东离开村庄，前往树林中寻求庇护。灯塔戳破地平线，轮廓雄伟壮观。你用最快地速度赶路，直到头上出现了树荫，你才走到路边，稍事休息。\n差不多两小时以后太阳落山了。黑暗的森林也许很吓人，但成功逃离烬头村让你下定决心。你头也不回地走在黑夜中。\n不久之后，你听到了哒哒的马蹄声，向你飞快地接近。马一共有两匹。你激动不已——但它们是从你身后过来的。',
    options: [
      {
        type: 'check',
        text: '进行「潜行」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.STEALTH,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '211',
          onFailureSceneId: '216',
          successText: '进行「潜行」检定（成功）',
          failureText: '进行「潜行」检定（失败）',
        },
      },
    ],
  },
  '153': {
    id: '153',
    story:
      '你侧身挤进书架后面的暗室。这是个小小的壁龛，大小仅容一人，两边各有一个隐蔽的书架。这种亮度下你没办法看清书名。',
    options: [
      {type: 'goto', text: '冒险把悬崖边的窗户打开一点点', goto: '165'},
      {type: 'goto', text: '抓上几本书就离开', goto: '159'},
    ],
  },
  '154': {
    id: '154',
    story:
      '你梦见了壁炉里的炉火；跳动的火舌之中，闪烁着明亮耀眼的色彩。最开始火苗很小很小，几乎要用显微镜才看得见，但它越烧越大，越烧越大，最后变成了瞬息万变的炼狱火海，它溢出壁炉，顺着地板延烧，爬上了你的床单......\n你在惊吓之中醒了过来。阳光透过窗帘照进屋里。你起床检查壁炉，眨眨眼驱赶睡意。壁炉是冷的。\n你之前如果受过伤害，睡过这一晚之后可以回复1点耐久值。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '166',
        effects: [{type: EffectType.CHANGE_HP, value: '+1'}], // TODO: Conditional logic for "if injured"
      },
    ],
  },
  '155': {
    id: '155',
    story:
      '你慌忙在树丛间攀爬，强行抑制恐惧感，想要回到道路上。\n想要从熊掌下逃脱，你必须用你的“敏捷”和熊的“敏捷”进行一次对抗检定。熊的“敏捷”是58。它掷出小于等于29点为困难成功，小于等于11点为极难成功。先进行熊的“敏捷”检定，再做你的“敏捷”检定。\n比较你们两方的成功等级。极难成功胜过困难成功，困难成功胜过常规（普通）成功，常规成功胜过失败。如果成功等级相同，技能值高的一方胜出。',
    // Opposed roll, similar to scene 150.
    options: [
      {type: 'goto', text: '进行对抗检定（假设你胜出）', goto: '161'},
      {type: 'goto', text: '进行对抗检定（假设你落败）', goto: '167'},
    ],
  },
  '156': {
    id: '156',
    story:
      '所有村民都聚集在灯塔边，马路空荡无人，你可以轻声慢步地远离火场。他们结束之前，你必须离开村子。\n当你转过街角前往南边的道路时，吟诵似乎在加速。当你来到杂货店的时候，你终于遇到了来烬头村以来第一桩幸运的事。杂货店的墙边停着一辆自行车！你在普罗维登斯曾经学过骑车。\n你坐上鞍座。你烧伤的皮肉在拒绝着触碰。',
    options: [
      {type: 'goto', text: '等等看灯塔会发生什么', goto: '168'},
      {type: 'goto', text: '立即骑车出村', goto: '185'},
    ],
  },
  '157': {
    id: '157',
    story:
      '客房里熟悉的陈设似乎愈加狭小。干净的床铺、小巧的衣橱和穿衣镜却令你联想到牢房。你留在烬头村还有什么可做？你的新生活离这里还远得很。\n你躺在床上，瞪着天花板上的一处裂缝。你回想这一天经历的事情，思考你发现的微末细节。\n高海拔和新鲜的空气令你倦怠。但你在这里还有安全感吗？',
    options: [
      {type: 'goto', text: '就这样睡觉', goto: '224'},
      {type: 'goto', text: '还不睡', goto: '230'},
    ],
  },
  '158': {
    id: '158',
    story:
      '你像箭一样地冲进小巷，突然转弯，拐到完全不同的方向。你身后脚步声响个不停。烬头村狭窄凌乱的小巷头一次为你提供了方便。你尝试迂回奔向南边的东盘山路。',
    options: [
      {
        type: 'check',
        text: '进行「潜行」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.STEALTH,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '7',
          onFailureSceneId: '170',
          successText: '进行「潜行」检定（成功，打勾）',
          failureText: '进行「潜行」检定（失败）',
          onSuccessEffects: [
            {
              type: EffectType.MARK_SKILL_SUCCESS,
              target: CheckObjectKey.STEALTH,
            },
          ],
        },
      },
    ],
  },
  '159': {
    id: '159',
    story:
      '你抓上几本能带走的书，溜出了房子，来到工坊后身的阴影下开始查看这些书。\n其中两三本书用你看不懂的文字书写，你很失望。还有一本看上去像是埃及符号。还有一本细长的手写书，好像是从《翡翠石板》上抄写的东西。但最吸引人的是一本小开本、黑封面的奇怪诗集，封面写着《阿撒托斯及其他》，作者是爱德华·德比，1919年在波士顿出版。你必须藏起其他的大型书，但这本书你可以随身携带。\n德比的诗集需要研读约一星期才能完全掌握。如果你度过此次冒险，你可以阅读171得到关于它的更多信息。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '120',
        effects: [{type: EffectType.ADD_ITEM, target: '阿撒托斯及其他'}], // Corrected from itemName to target
      },
    ],
  },
  '160': {
    id: '160',
    story:
      '你回到路上，继续你最重要的任务：离开烬头村，前往奥西皮。山脊上的视野很好，你可以从这里看到道路延伸的方向。它随着山峦弯曲，在林地里消失了一段，又再次浮现，继续向远方伸展。当它向第二片林地连接过去的时候，你终于看不到它了。你觉得往最少里说，整个距离都至少有六七英里。一路上既无村庄，又无车马。\n走过去碰碰运气也许值得尝试。天气还很好。\n但你在尝试之前，还需要不少补给。',
    options: [{type: 'goto', text: '继续', goto: '25'}],
  },
}

// Helper scenes S141_SAN_LOSS_THEN_63, S144_AUTODRIVE_CHECK, S144_PSYCH_CHECK are removed.
