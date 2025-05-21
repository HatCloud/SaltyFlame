import type {SceneData} from '../../interface/Scene'
import {
  CheckObjectKey,
  EffectType,
  CheckDifficulty,
  // ConditionType, // Removed as not used in scenes 101-120
} from '../../interface/enums'

export const scenes_101_120: SceneData = {
  '101': {
    id: '101',
    story:
      '忽然一片阴影笼罩了你。“那么，”梅·莱德贝特说，“你明白的。”\n你试图站起身。但一大群村民从她身后蜂拥而出，瞬间围住了你。你奋力挣扎，但他们的人数占绝对优势，你无从抵抗。很快你就被制服了。',
    options: [{type: 'goto', text: '继续', goto: '108'}],
  },
  '102': {
    // This scene was already present
    id: '102',
    story:
      '你说道，自己刚刚在亲戚的远方朋友强烈推荐下，得到了“阿卡姆珍本舆图行”的助理职位。收到录用通知函的时候的那份兴奋，只要想一想那些必须来店一游的文物，你就能回忆起来三分。你心里一阵痒痒；你恨不得马上就开始工作。\n“书，哈？”西拉斯没有再继续对话。你感觉他不像是喜欢读书的人。\n你的「信用评级」技能是20%。\n你的本职技能是：「估价」，「艺术/手艺」（选择一个专业领域），「历史」，「图书馆使用」，「外语」（选择一种），「侦查」，还有「魅惑」、「话术」、「恐吓」、「说服」四项中其中一项。你还可以选择除了「克苏鲁神话」以外的其他任意一项技能作为个人专长。将以下数值分配到各项本职技能当中，写到旁边的大方格里：70%，60%，60%，50%，50%，50%，40%，40%。分配时忽略调查员角色卡上已写出的初始值。\n然后前往128。',
    options: [{type: 'goto', text: '分配技能并继续', goto: '128'}],
  },
  '103': {
    id: '103',
    story:
      '你没法保证小径会重新返回你现在走的路。尽管可能绕远，但你还是觉得沿着路走更好。可是你走的时候，总是不安地回头看西沉的太阳。\n十五分钟以后，你经过一片自然形成的空地时，眼睛的余光发现有什么大东西在动。它在三十码外的一棵树下徘徊，和你差不多高，通体漆黑，还长着一对小圆耳朵。你看它的时候，它用后腿站了起来。是一头熊！它似乎对树上挂着的果子特别感兴趣。',
    options: [
      {type: 'goto', text: '进一步观察熊', goto: '110'},
      {type: 'goto', text: '无动于衷', goto: '116'},
      {type: 'goto', text: '慎重行事，慢慢退却', goto: '122'},
    ],
  },
  '104': {
    id: '104',
    story:
      '你喝下了杯里的东西。杯里是清凉解渴的水，你咕咚咕咚喝光了它。她见杯子已空，就离开了。\n你向她讲话，但她已经走出去，关上了门。\n此后，你试图呐喊。你的声音肯定已经传到了外面，但毫无效果。似乎整个村子都无动于衷。',
    options: [{type: 'goto', text: '继续', goto: '205'}],
  },
  '105': {
    id: '105',
    story:
      '“恐怕我天黑前有些差事要干，所以今天图书室必须关门了。如果您特别有需要的话，我希望您明天下午再来？”\n你和文特斯先生一起离开了房子，等着他锁上门。你感谢他请你喝咖啡，还有查阅藏书室的书。\n他走进小巷消失了。你希望明天下午之前你已经离开村子了，但知道这里有一个可以专注的地方总是一件好事。',
    options: [{type: 'goto', text: '继续', goto: '180'}],
  },
  '106': {
    id: '106',
    story:
      '有一间工坊是关着门的。当你漫步走近这里时，工匠们会从应答如流变得紧张不安——几乎是强迫的。真有趣。\n你可以在你的「心理学」技能左边的小方框里打勾。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '25',
        effects: [
          {
            type: EffectType.MARK_SKILL_SUCCESS,
            target: CheckObjectKey.PSYCHOLOGY,
          },
        ],
      },
    ],
  },
  '107': {
    id: '107',
    story:
      '是悬崖边的阶梯！你折回村子里。无论你走到哪儿，都有人监视着你。最后，你返回莱德贝特的房子，打了个大大的呵欠。独自呆了一会儿之后，你顺着小巷溜走，在建筑物背后寻找路径。\n你终于找到了位置，把脚伸出崖边，试探着阶梯，尽量不去思考你身下有20英尺深的落差。你抓住悬崖上冰冷的岩石。一步、两步......有人在附近的房子外巡逻，你扭过头去躲避他们的视线。\n六十秒以后，你的脚终于触碰到了地面。附近的棚屋已经全都毁坏了。你轻声慢步走向东边的盘山路。',
    options: [{type: 'goto', text: '继续', goto: '152'}],
  },
  '108': {
    id: '108',
    story:
      '窄窗透进的光逐渐变暗，你明白下午已经过去，夜晚即将到来。你的手被反绑在背后，甚至无法在粗糙的床上躺下。一个陌生女人走进来。\n她脸上满是皱纹，眼睛空洞无神。她并没有把视线朝向你，只是端出一个杯子碰到你嘴边。',
    options: [
      {type: 'goto', text: '接受饮料', goto: '104'},
      {type: 'goto', text: '拒绝', goto: '113'},
    ],
  },
  '109': {
    id: '109',
    story:
      '你用滑步躲开了年轻人的抓捕。火焰顺着他们的肩膀流淌，引燃了他们的头发。你的面前笼罩着烟雾，腿上在燃烧。你必须立刻离开灯塔。\n你因为火焰受到1D6点耐久值伤害。如果你的耐久值因此归零，你就会失去意识，被烈焰烧死！【剧终】。',
    options: [
      {
        type: 'goto',
        text: '（若未死）继续',
        goto: '137',
        effects: [{type: EffectType.CHANGE_HP, value: '-1D6'}],
        // TODO: Add HP check for death in reducer or via a condition
      },
    ],
  },
  '110': {
    id: '110',
    story: '你鬼鬼祟祟地靠近熊，想要在树后保持隐蔽。',
    options: [
      {
        type: 'check',
        text: '进行极难「潜行」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.STEALTH,
            difficulty: CheckDifficulty.EXTREME,
          },
          onSuccessSceneId: '143',
          onFailureSceneId: '129', // TODO: Handle fumble (96+) for STEALTH check leading to 149.
          successText: '进行极难「潜行」检定（成功）',
          failureText: '进行极难「潜行」检定（失败）',
        },
      },
    ],
  },
  '111': {
    id: '111',
    story:
      '他笑道：“我很高兴留您在这里再看半个小时左右。如果没有借书卡，不要带走这里的书。”\n你感谢文特斯的信任，继续读了一会儿。在光线逐渐昏暗时，你在闭塞的房间里开始打呵欠。\n现在也许该换本书读了。',
    options: [
      {
        type: 'check',
        text: '进行「侦查」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.SPOT_HIDDEN,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '118',
          onFailureSceneId: '124',
          successText: '进行「侦查」检定（成功）',
          failureText: '进行「侦查」检定（失败）',
        },
      },
    ],
  },
  '112': {
    id: '112',
    story:
      '你敏锐的眼睛在崖壁上搜索了几分钟以后有了发现。这里有一串突出的岩石，中间还夹杂看上去像是人工开凿的豁口。它们连起来就是一道巧妙的隐藏梯子，可以爬下悬崖。无疑，昨晚那个黑影正是使用它来安全下落的。\n你沿着底下的岩盘观察，但只能看见一些土褐色的小棚屋，在你右手边稍远的地方。若不是你马上要永远离开烬头村的话，这倒可以算是个有趣的发现。\n你发现了一个秘密。如果有朝一日你需要爬上或爬下东北方的这段悬崖，这段文字可以为你提供一条线索。到那时，如果你想尝试这道梯子，在你所在的条目号上加100，前往对应的条目。如果新条目看上去不符合剧情，你必须返回原来的条目并继续。\n回复1点理智值。你可以在自己「侦查」技能左边的小方框里打勾。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '192',
        effects: [
          {type: EffectType.CHANGE_SANITY, value: '+1'},
          {
            type: EffectType.MARK_SKILL_SUCCESS,
            target: CheckObjectKey.SPOT_HIDDEN,
          },
        ],
      },
    ],
  },
  '113': {
    id: '113',
    story:
      '你扭过脸去，当她再次尝试的时候，你用头去撞她的手，把杯子打翻在地。清澈的液体洒在地面上。\n老妪轻轻耸耸肩，转身离开了房间。你在她身后呐喊，但她无动于衷。\n你很快就口渴了。',
    options: [{type: 'goto', text: '继续', goto: '205'}],
  },
  '114': {
    id: '114',
    story:
      '日光几乎无法照亮下面，但大白天打灯又太容易招人怀疑。你挤进地板下面，四处张望。\n你的第一印象是梅在这里堆放垃圾，因为有各种尺寸的箱子又脏又乱地摞成好几堆。过了几秒钟，你才弄清这些全都是旅行用的行李箱，或者公文包。一共有二十个左右。\n这些东西的含义令你如同挨了当头一棒。但你仍然控制住自己，开始检查行李标签。你数了八个或者九个不同的名字，就再也数不下去了。\n你连忙爬回卧室，用颤抖的手指关上活板门，将床推回原位。',
    options: [{type: 'goto', text: '继续', goto: '120'}],
  },
  '115': {
    id: '115',
    story:
      '空气很是清新，沿路走下山坡令人精神鼓舞。你看到烬头村周围的低地上铺展着庄稼地，在庄稼之中还有些牲畜，但看不到马匹。接下来的旅途你要徒步而行吗？\n再走远一些，道路迂回越过山脊，开始下坡。这里有几间散乱的棚屋，有人在居住的迹象。它们之间的距离相当远。\n在你端详这些棚屋的时候，一扇门打开了，出来一个上了年纪的男人。他身穿一件破烂脏污的外套，但多了一块布；他把这块布扯过头顶，像头巾一样裹起头部。他正这样做的时候看见了你，愣住了。',
    options: [
      {
        type: 'check',
        text: '进行“幸运”检定',
        check: {
          details: {
            object: 'characteristic',
            subObject: CheckObjectKey.LUCK,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '127',
          onFailureSceneId: '135',
          successText: '进行“幸运”检定（成功）',
          failureText: '进行“幸运”检定（失败）',
        },
      },
    ],
  },
  '116': {
    id: '116',
    story: '你屏息凝神看着这头熊。它停下来环视空地。',
    options: [
      {
        type: 'check',
        text: '进行“幸运”检定',
        check: {
          details: {
            object: 'characteristic',
            subObject: CheckObjectKey.LUCK,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '136',
          onFailureSceneId: '129',
          successText: '进行“幸运”检定（成功）',
          failureText: '进行“幸运”检定（失败）',
        },
      },
    ],
  },
  '117': {
    id: '117',
    story:
      '中央大街上的队伍缓慢而肃穆，除了你骨软筋麻，还在抓着你的人手中挣扎。\n当你看见三具披着红布的人体被扛在前面的时候，你打了个寒战。灯塔靠得越来越近，越来越高大，令人畏惧的轮廓如同乌黑的三角形直刺星空。披红布的人体开始发出低沉的嗡嗡声——你的头脑中不由自主地浮现出“送丧人”这个词。\n他们手中的火把冒着烟，呛得你直咳嗽。你能感受到脸上的热量。\n当你被押到灯塔前的空旷地时，三个舞者分开人群走出来：都是年轻女孩，手中挥着燃烧的火球，划出壮观的弧线，在夜空中形成数道圆圈。她们依次接近你，用涂黑的手指触碰你的前额。每人在你的左脸颊、右脸颊和前额各亲吻一次，然后在你耳边低语。你的鼻孔里充满了煤油的气味。',
    options: [
      {
        type: 'check',
        text: '进行“外貌”检定',
        check: {
          details: {
            object: 'characteristic',
            subObject: CheckObjectKey.APP,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '10',
          onFailureSceneId: '148',
          successText: '进行“外貌”检定（成功）',
          failureText: '进行“外貌”检定（失败）',
        },
      },
    ],
  },
  '118': {
    id: '118',
    story:
      '你搜寻书架，试图挪开三卷本的《沃波尔简明安第斯人语法》。它纹丝不动，进一步检查之下，你发现这三本书其实是黏在一起，贴在了墙上。这是不是什么隐蔽地加固书架的办法呢？\n你听到大厅里响起了脚步声，本能地离开了这个奇特的发现。\n你可以在自己「侦查」技能左边的小方框里打勾。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '124',
        effects: [
          {
            type: EffectType.MARK_SKILL_SUCCESS,
            target: CheckObjectKey.SPOT_HIDDEN,
          },
        ],
      },
    ],
  },
  '119': {
    id: '119',
    story:
      '南边的一群似乎比西边的一群好对付一些。你大步走上前去，说灯塔那边需要他们。他们看上去十分怀疑。你提出由你替他们把守道路，伸手要去拿干草叉。\n第一个人说：“不，你和我们一起走。”他皱起了猿猴一般的眉毛。',
    options: [
      {
        type: 'check',
        text: '进行极难「话术」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.FAST_TALK,
            difficulty: CheckDifficulty.EXTREME,
          },
          onSuccessSceneId: '132',
          onFailureSceneId: '139',
          successText: '进行极难「话术」检定（成功）',
          failureText: '进行极难「话术」检定（失败）',
        },
      },
    ],
  },
  '120': {
    id: '120',
    story:
      '你对烬头村感到越来越不安，今天尤为惶恐。\n一旦下面的选项你已经试过三个，前往 98。\n否则你可以：',
    options: [
      {type: 'goto', text: '搜索梅·莱德贝特的卧室', goto: '83'},
      {type: 'goto', text: '独自前往村会堂', goto: '126'},
      {type: 'goto', text: '仔细勘查工匠的工坊', goto: '219'},
      {type: 'goto', text: '窥探灯塔前的活动', goto: '29'},
      {type: 'goto', text: '沿东盘山路下山，溜之大吉', goto: '7'},
      // TODO: Need a way to track "tried three options" to enable goto: '98'
      // This might require a counter in game state and a conditional option.
      // For now, adding a placeholder option that the player would manually choose if applicable.
      {type: 'goto', text: '(若已尝试三个选项) 前往98', goto: '98'},
    ],
  },
}
