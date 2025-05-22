import type { SceneData } from '../../interface/Scene'
import {
  CheckObjectKey,
  EffectType,
  CheckDifficulty,
  // ConditionType, // Removed as not used
} from '../../interface/enums'

export const scenes_121_140: SceneData = {
  '121': {
    id: '121',
    story:
      '你接近这身影一步，它就后退一步。一步，两步。它溜进了两座房子之间的小巷。\n要抓住你的目标，你必须进行一次「追踪」检定。',
    options: [
      {
        type: 'check',
        text: '进行「追踪」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.TRACK,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '141',
          onFailureSceneId: '130',
          successText: '进行「追踪」检定（成功）',
          failureText: '进行「追踪」检定（失败）',
        },
      },
    ],
  },
  '122': {
    id: '122',
    story:
      '你听说过熊并没有攻击性，但你现在孤身一人，别人要走几里路才能来救你，为什么要冒险呢？你轻声慢步地挪走了。熊对你完全没表现出兴趣。',
    options: [{ type: 'goto', text: '继续', goto: '79' }],
  },
  '123': {
    id: '123',
    story:
      '他们把你推回了火堆。狂热和恐惧蒙蔽了他们的双眼。即使火焰在他们身上蔓延、在你的衣服上肆虐，即使热度越来越强烧灼着你的皮肉，即使浓烟令你窒息视野模糊，他们仍然在火焰中紧紧压着你。你的尖叫和他们的混合在一起，直到火焰完成自己的使命。\n你在和两个年轻人的僵持之中被烧死了。\n为何不重新尝试呢？选择不同的选项，你也也许就能逃脱甚至智胜烬头村的村民了。\n【剧终】',
    options: [{ type: 'goto', text: '游戏结束', goto: 'END' }],
  },
  '124': {
    id: '124',
    story:
      '门打开了，文特斯重新回到了藏书室。他露出浅浅的满意笑容，视线落到站在书架前面的你身上。他吃吃地笑道：“已经没有想看的了？我们当然也接受捐赠。现在恐怕到关门的时间了。”\n你和文特斯先生一起离开了房子，等着他锁上门。你感谢他请你喝咖啡，还有查阅藏书室的书。\n他沿着锡尔伯里街离开了。',
    options: [{ type: 'goto', text: '继续', goto: '180' }],
  },
  '125': {
    id: '125',
    story:
      '你在梅·莱德贝特家的另一头看到一根晾衣绳，上面有些松垮垮皱巴巴的衣服。能用的衣服并不算多，但你把自己的衣服塞起来充当临时的帽子，走路也改成弓腰驼背地拖着脚走。\n你跛着脚走到村子南边的出口，一路上再没有人打量你。那些守卫还守在原地，审视着出入的人。但他们看上去已经开始厌烦了。',
    options: [
      {
        type: 'check',
        text: '进行困难「乔装」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.DISGUISE,
            difficulty: CheckDifficulty.HARD,
          },
          onSuccessSceneId: '146',
          onFailureSceneId: '139',
          successText: '进行困难「乔装」检定（成功）',
          failureText: '进行困难「乔装」检定（失败）',
        },
      },
    ],
  },
  '126': {
    id: '126',
    story:
      '你远远离开街道，绕过北边的崖壁，从后面接近了村会堂。它离灯塔不远，你没法在不引人注意的情况下从正门进去。你检查周围的窗户。\n东边面朝灯塔的窗户被砖砌死了。\n最西边的窗户有一扇百叶窗很松弛，你能打开它，潜进会堂，关上身后的窗子。你跳进村民集会室，悄声慢行；透过昏暗的光线，听着外面村民兴奋的讨论。对面的门上写着“私用”。你没听到门对面有声音，于是推动了门把手。',
    options: [{ type: 'goto', text: '继续', goto: '133' }],
  },
  '127': {
    id: '127',
    story:
      '这男人仰望村子的方向，视野扫过悬崖的顶部。一瞬间，你看到了他的脸。似乎有什么东西让你不安。然后他转过身，沿着路走远。但这时，他扬起一只手，慢慢地向你招手示意。',
    options: [
      { type: 'goto', text: '跟上这个奇怪的人', goto: '142' },
      { type: 'goto', text: '觉得这不明智', goto: '160' },
    ],
  },
  '128': {
    id: '128',
    story:
      '你发现，西拉斯自从和拖拉机发生冲突之后，再没有停站。长途车沿着山坡盘曲上行。但是，当道路攀上了山顶，山下绝佳的美景一览无余地展现在你面前时，你的思绪被打断了。\n色彩斑斓的树叶，铺成了深秋的调色板；一条溪流从谷底蜿蜒流过，又将这调色板打破成两半。远方白山山脉在朦胧的云雾之中若隐若现。\n极目远眺，视野之中没有一座村庄，甚至连一座小木屋都见不到。你能看到鸟儿在树冠之上翱翔，还能勉强捕捉到两只白尾鹿在水边流连的身影。\n也许你搬家到大城市去是个错误。在这繁盛的大自然当中，你能不能独自生存下去呢？\n你在大多数技能上都有着基础的能力，分别列在调查员角色卡的各项技能名称后面的括号里。比如，你的「攀爬」技能基础是20%，「闪避」技能基础值等于你“敏捷”的一半。\n选择四项本职技能以外的技能（同样不可以选择「克苏鲁神话」）。这是你的个人兴趣技能。将这四项技能每项增加20点。\n这个时候你可以为每个技能计算半值和五分之一值，和你对属性的计算方法一致。记得舍去小数。如果你懒得计算，可以不去填，到必要时再计算。或者如果你使用交互PDF角色卡的话，你会发现它已经将所有计算都完成了！',
    options: [{ type: 'goto', text: '继续', goto: '144' }],
  },
  '129': {
    id: '129',
    story:
      '好像有什么东西让熊受了惊。它背朝着你，甩着屁股，蹒跚走进了森林。你等了五分钟，这头熊仍没回来。但对熊这种奇妙的动物，仅仅观察这么一小会儿也是值得的。',
    options: [{ type: 'goto', text: '继续', goto: '79' }],
  },
  '130': {
    id: '130',
    story:
      '这黑影跑得很快，步伐几乎是悄无声息。你拽着一盏沉重的灯，又身处不熟悉的环境，受到了相当的阻碍。你走出小巷，进了一片满是尘土的院子，再也找不到你追的那个身影的一点痕迹。\n你四处扒拉了几分钟，但那个身影早就不见了。\n外面有着这样险恶的东西，再在陌生黑暗的街道上散步，显然太不明智了。你返回莱德贝特的房子。梅让你进了屋，坐回到椅子上。很快她开始打起呵欠。“不早了，我想我该睡觉了。你想几点钟吃早饭？”',
    options: [{ type: 'goto', text: '继续', goto: '63' }],
  },
  '131': {
    id: '131',
    story:
      '你在烬头村的街道上闲逛。你觉得你似乎已经了解了这里的每一个角落，每一扇房门。因为根本就没什么角落也没多少房子。当你走到一片开阔地时，头顶的星空毫无保留地展现在你的面前。你家乡有路灯，即便天气晴朗也会妨碍人们观察星空。但在这里，在这片高耸的黑暗里，熟悉的星星之中仿佛布满了散碎的钻石，在闪烁着微光。\n你被这样的奇景吸引，驻足观察了几分钟。当你的视线回到地面上时，你注意到有一个漆黑的身影贴在房子后面。一块松动的石头飞掠过你的身后。还有另一个黑影在小巷里盯着你。',
    options: [
      { type: 'goto', text: '返回莱德贝特的房子确保安全', goto: '157' },
      { type: 'goto', text: '直面这些黑影', goto: '163' },
    ],
  },
  '132': {
    id: '132',
    story:
      '你的急切令他们信服，一个村民把干草叉递给了你。你走到路中央，拿着草叉摆出哨兵的姿势。\n几个村民向灯塔慢慢挪过去，还回头看了几次。\n等到他们挪出了视线，你立刻丢掉笨重的叉子，顺东盘山路俯冲而下。',
    options: [{ type: 'goto', text: '继续', goto: '152' }],
  },
  '133': {
    id: '133',
    story:
      '房间里排满了书籍。角落里是狭小的盥洗室和食品储藏处。你快速搜索了一遍房间的其他部分，但没什么发现，所以你又回到了书架前。光线很暗，你难以看清书脊上的字。这里有什么有用的东西吗？',
    options: [
      {
        type: 'check',
        text: '进行「侦查」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.SPOT_HIDDEN,
            difficulty: CheckDifficulty.NORMAL,
            // TODO: Implement logic for bonus dice if player previously checked shelves.
            // bonusDice: true,
          },
          onSuccessSceneId: '147',
          onFailureSceneId: '140',
          successText: '进行「侦查」检定（成功）',
          failureText: '进行「侦查」检定（失败）',
        },
      },
    ],
  },
  '134': {
    // This scene was already present
    id: '134',
    story:
      '长途车突突地响着，在乡间缓慢挪动。车里的气氛令人窒息，每当车转弯的时候，你的肚子里就一阵翻腾。不过司机身边的窗户是开着的，你换了几个座，找到了一个可以让微风吹到脸上的位置。没多久你就放松下来，开始享受旅程，观察着长途车经过的富有古趣的小小村落。在一个村庄，一位体格粗壮的女人上了车，对你礼貌地点点头。到了下一个村庄，她就下车了。\n道路升高了一些，穿越一片又一片的玉米地和果园。树叶正在变色，把树木装点成鲜红、金黄，灿烂缤纷，富有生机。当你快要打起瞌睡的时候，司机开始快速通过一个急弯。',
    info: '将你的“体型”和“体质”加到一起并除以10，舍去小数。这是你耐久值(HP)的初始值。在你的调查员角色卡上记下这个值。你的当前耐久值可能增减，但它不太可能超过初始值。\n你还拥有一个幸运值。投掷3颗六面骰子。我们称它为“3D6”。如果你刚刚接触角色扮演游戏，你可以阅读快速开始规则第6页（规则书第17页）上关于角色扮演骰子和相关术语的内容。将3D6的结果乘以5得到你的幸运值，将它记在你的角色卡上。\n现在你必须要进行一次敏捷检定。投掷1D100。这表示投掷两颗十面骰子，一颗骰子结果为十位，另一颗为个位。你必须在投掷之前选择哪个是十位，哪个是个位！\n如果你投出来的结果等于或小于你的“敏捷”，你的检定就成功了。如果结果大于你的“敏捷”，你的检定就失败了。\n你可以试图略过检定的过程，直接假设你总能通过检定。但《克苏鲁的呼唤》是神秘和恐怖主题的游戏。可能降临到你角色身上的可怕灾难，也是乐趣的一部分。如果每次检定都能通过，你得到的乐趣也未见得比你可能会失败时来得多。\n如果你通过了“敏捷”检定，前往261。\n如果你没有通过“敏捷”检定，前往59。\n（译注：如果你掷出00+0，这次掷骰的结果要读成100。）',
    options: [
      {
        type: 'check',
        text: '进行敏捷检定', // This text might not be shown if the check is immediate
        check: {
          details: {
            object: 'characteristic',
            subObject: CheckObjectKey.DEX,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '261',
          onFailureSceneId: '59',
          successText: '你眼疾手快的抓住了前面的座位',
          failureText: '看起来你的身手不足以应对这种情况',
        },
      },
    ],
  },
  '135': {
    id: '135',
    story:
      '这个怪男人拔腿就跑，沿着山路逃离你。他的步伐一瘸一拐，但步速简直激烈得像发了狂。',
    options: [
      { type: 'goto', text: '追逐他', goto: '150' },
      { type: 'goto', text: '有更重要的事情要做', goto: '160' },
    ],
  },
  '136': {
    id: '136',
    story:
      '这头熊把爪子放上树干，爬上了树，动作敏捷得惊人。它在树杈上稳住身形，开始从枝叶上扯下黑色的果子——大概是李子？——塞进嘴里。\n你看了大概十分钟，这头熊似乎吃腻了，从树上落回地面。它朝空地四周望望，打了个呵欠，甩开屁股迈进了森林当中。\n观察熊是次非常有教育意义的经历。你可以在你的「博物学」技能上永久增加1点。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '79',
        effects: [
          {
            type: EffectType.SET_FLAG, // This should ideally be a direct skill increase effect
            gameFlag: 'FLAG_INCREASE_NATURAL_WORLD_1',
            flagValue: true,
            // Or: { type: EffectType.INCREASE_SKILL, target: CheckObjectKey.NATURAL_WORLD, value: 1 }
          },
        ],
      },
    ],
  },
  '137': {
    id: '137',
    story:
      '你从灯塔另一边的大火中一跃而下。你看见下方陡峭的断崖时心脏瞬间开始狂跳，但你在离悬崖几寸远的地方安全降落了。你打着滚，扑灭了燃烧的衣服。你的肺像已经烧焦了一样，全身没有一处不在灼痛。村民们还在高声歌唱。你端详一下灯塔周围，汹涌的浓烟之中，他们似乎并没注意到你已经不在了。大多数人都在仰望天空。\n你以最快的速度匍匐离开，躲到最近的房子后面寻求掩护。',
    options: [{ type: 'goto', text: '继续', goto: '156' }],
  },
  '138': {
    id: '138',
    story:
      '过了一会儿，梅回到厨房开始洗涮。要想和露丝说话，你需要让梅离开一会儿。你一边帮她刷盘子，一边考虑计策。没多久，你就想到了一 个主意，问起了西拉斯和他村子里的朋友。\n梅眯起眼睛说：“他认识村那头的特洛伊，我不好说他们是朋友；他俩更像是一对欢喜老冤家。但他昨天晚上可能是在特洛伊家过的夜。”\n你问梅可不可以见见特洛伊，问问他西拉斯有没有提到过返回的计划。梅听着半信半疑，问道：“现在就去？”\n现在，不要查看自己的角色卡，决定自己如何让梅信服：是让梅感情用事？还是解释说再耽搁下去自己的事业就会受到影响？或者是让她草率遵从你的决定？请根据自己的选择，分别进行「魅惑」、「说服」或者「话术」检定。',
    options: [
      {
        type: 'check',
        text: '尝试「魅惑」说服梅',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.CHARM,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '145',
          onFailureSceneId: '151',
        },
      },
      {
        type: 'check',
        text: '尝试「说服」说服梅',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.PERSUADE,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '145',
          onFailureSceneId: '151',
        },
      },
      {
        type: 'check',
        text: '尝试「话术」说服梅',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.FAST_TALK,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '145',
          onFailureSceneId: '151',
        },
      },
    ],
  },
  '139': {
    id: '139',
    story: '村民可没你想得那么傻。他们捉住你，把你带回了村子中心。',
    options: [{ type: 'goto', text: '继续', goto: '108' }],
  },
  '140': {
    id: '140',
    story:
      '你发现，在两册书中间，夹着一张烬头村周边的详尽地图。它画出了森林、等高线、东西两条盘山路。虽然地图上没有画出其他村庄，但如果你今天决意离开，它可能也会有用处。\n灯塔四周活动的哐哐声似乎越来越响，每当有说话声离房门太近，你都会下意识地退缩。差不多是原路返回，沿着窗户溜走的时候了。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '120',
        effects: [{ type: EffectType.ADD_ITEM, target: '烬头村地图' }], // Player acquires map
      },
    ],
  },
}

// Helper scenes S138_CHARM_CHECK, S138_PERSUADE_CHECK, S138_FASTTALK_CHECK are now integrated into scene 138.
