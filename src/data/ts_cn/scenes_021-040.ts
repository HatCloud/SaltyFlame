import type { SceneData } from '../../interface/Scene'
import {
  CoreCharacteristicEnum,
  SkillEnum,
  EffectType,
  CheckDifficulty,
  ConditionType,
} from '../../constant/enums'
import { GameFlag } from '../../constant/GameFlags'
import { ItemBox } from '../../constant/items'

export const scenes_021_040: SceneData = {
  '21': {
    id: '21',
    story:
      '“嗯，我觉得人们大概只可能是因为节日才会来烬头村。我以为你来这里也是来研究节日或者来拍照片的。不过，节日不是明天晚上，而是后天晚上。我想对于过路客来说，这很奇怪。”\n梅又为你满上了茶水。壶嘴和茶杯相碰，发出清脆的铿声。\n“你知道吗，我们有一座灯塔。每年的这个晚上我们都要举行火把游行，点燃悬崖上的灯塔。你以前肯定没见识过这类仪式。他们说这样可以保佑村庄全年平安无事。这是庆典。是庆典......”\n她沉吟了一会儿，眨了眨眼。\n“但你来这儿不是听我唠叨的，你肯定也饿了。我可以给你凑一点炖菜。你觉得如何？”\n你又问了一遍她要价多少，梅讲了个相当便宜的价钱，你毫不犹豫地接受了。这间房子虽小但舒适，炖菜熟烂又丰盛。吃过饭以后，离你平常睡觉的时间还有几个小时。',
    options: [
      { type: 'goto', text: '和梅多聊聊天', goto: '31' },
      { type: 'goto', text: '到外面转转，确认自己的方位', goto: '75' },
      { type: 'goto', text: '提前上床早睡觉', goto: '63' },
    ],
  },
  '22': {
    id: '22',
    story:
      '你别过莱德贝特母女，向她们家走去。房门一下就打开了。在低矮的厨房里，你用干硬的面包和剩下的炖菜凑合了一顿午餐。厨房里有扇小窗户，可以望见群山。\n这一上午你的唯一收获就是——烬头村并没有什么可以吸引外界游客的东西。但现在白昼还剩下差不多五个小时。你可以准备一点干粮，带上自己行李里仅有的必需品，继续出发，希望能在天黑之前抵达下一个村庄。你也可以去文特斯先生那里寻求帮助。',
    options: [
      { type: 'goto', text: '稍作准备出村去', goto: '28' },
      { type: 'goto', text: '转而造访村会堂', goto: '11' },
    ],
  },
  '23': {
    id: '23',
    story:
      '你折腾了几秒钟，司机走上前你给你搭了把手，嘴里还叼着烟。“小不点，包可够大的。”他说道。你觉得你最好简单地感谢一下他作为回应。',
    options: [{ type: 'goto', text: '感谢司机并准备出发', goto: '233' }],
  },
  '24': {
    id: '24',
    story:
      '你抬手敲门，但还没敲响，门就打开了。门后的中年绅士下意识地后退了一步，扶正他的眼镜。你连忙道歉，并做了自我介绍。他镇定下来，注视着你。\n“我知道了。我是克莱德·文特斯。您说您是来做客？然后就来找我了？嗯！要不要来点儿咖啡？我下午这个时间一般会喝一杯。”\n他的邀请相当真诚，这是个好机会，你可以把脑海里积攒的问题都问出来。',
    options: [{ type: 'goto', text: '接受邀请', goto: '43' }],
  },
  '25': {
    id: '25',
    story: '你已经能大概摸清自己在烬头村的位置了。\n你想继续深入调查吗？',
    options: [
      {
        type: 'goto',
        text: '在本地杂货店询问交通方式',
        goto: '16',
        condition: {
          type: ConditionType.NOT_GONE,
          expectedValue: '16',
        },
      },
      {
        type: 'goto',
        text: '找到村会堂',
        goto: '84',
        condition: {
          type: ConditionType.NOT_GONE,
          expectedValue: '84',
        },
      },
      {
        type: 'goto',
        text: '沿着道路下坡，查看东盘山路',
        goto: '115',
        condition: {
          type: ConditionType.NOT_GONE,
          expectedValue: '115',
        },
      },
      {
        type: 'goto',
        text: '调查巨大的金属建筑物',
        goto: '57',
        condition: {
          type: ConditionType.NOT_GONE,
          expectedValue: '57',
        },
      },
      {
        type: 'goto',
        text: '探索教堂',
        goto: '34',
        condition: {
          type: ConditionType.NOT_GONE,
          expectedValue: '34',
        },
      },
      {
        type: 'goto',
        text: '寻找拥有交通工具的当地居民',
        goto: '96',
        condition: {
          type: ConditionType.NOT_GONE,
          expectedValue: '96',
        },
      },
      {
        type: 'goto',
        text: '结束调查，前往村中',
        goto: '3',
        condition: {
          type: ConditionType.HAS_GONE_SOME_SCENE,
          expectedValue: 4,
          sceneGoneIds: ['16', '84', '115', '57', '34', '96'],
        },
      },
    ],
  },
  '26': {
    id: '26',
    story:
      '你在晨光中浑浑噩噩地醒了过来。太阳已经升得很高，但你感到自己一点也没有休息好。你发现自己的思绪被房间里的各种细节占据了：门框上的木材纹路，还有衣橱上一个有缺口的把手。\n当你翻身下床时，腹部却一阵绞痛，脚下不稳，差点扑倒在地。可能你是生了什么病？你眨眨眼，小心翼翼地直起腰来。房间里的空气芳香馥郁。\n你凝视窗外，直到你感觉自己已经稳住，可以离开了。',
    info: '今天你的技能检定受到一颗惩罚骰。额外投一颗十位骰，分别计算结果后取最高值。这不影响幸运、理智和伤害检定。',
    effects: [
      {
        type: EffectType.SET_FLAG,
        gameFlag: GameFlag.PENALTY_DICE_TODAY,
        flagValue: true,
      },
    ],
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '64',
      },
    ],
  },
  '27': {
    id: '27',
    story:
      '门吱呀一声打开，将你的思绪猛然拉回现实。门口的人握着熊熊燃烧的火把，橘黄的光芒涌进房间。两个身躯庞大的村民走进来，一把将你抓住。\n至少，你认为他们是村民。他们穿着厚实的黑色长袍，脸上手上全都涂成漆黑，只有左眼的位置画着一个红三角。\n你想尽力拖延，但他们架起你的胳膊，把你从床上连根拔起。似乎整个村子都聚集到门外围观你。每个人都涂着黑脸，画着红三角装饰图案。火把噼啪作响，火星喷溅而出。\n你奋力挣扎，但明白身体抵抗徒劳无益。你被游行队伍押到中央大街，拐了个弯，直冲灯塔而去。',
    options: [{ type: 'goto', text: '继续', goto: '117' }],
  },
  '28': {
    id: '28',
    story:
      '你带上钱、水还有几块三明治，还礼貌地给梅·莱德贝特留了一张字条，解释情况并许诺你会尽快回来取行李。天空飘浮着斑驳的云朵，但并没有马上要下雨的迹象。\n在几个村民的注视下，你走下南边的道路，顺着它转到东边。那黑色的金属建筑物突兀地挺立在山崖上。你走过烬头村外低矮的棚屋时，不禁打了个寒战。\n你受够了烬头村鄙陋闭塞的街道，在开阔的环境和成就感中恢复了精力。但是一小时以后，空旷的道路带来的新鲜感渐渐消失了。你刚刚进入第一片树林，就听到北面传来一阵轻快而怪异的呼啸。',
    options: [
      {
        type: 'check',
        text: '进行「博物学」检定',
        check: {
          details: {
            object: 'skill',
            subObject: SkillEnum.NATURAL_WORLD,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '35',
          onFailureSceneId: '41',
          successText: '你成功辨别出来了那是什么',
          failureText: '你没有辨别出来那是什么',
        },
      },
    ],
  },
  '29': {
    id: '29',
    story:
      '村子北边十分繁忙，你在那里大概隐蔽不了多久。你向教堂的方向前进，然后沿着房子背面向村东头前进。你右边出现了一段断崖。有一部分地面非常狭窄，你必须扶住屋墙作支撑',
    info: '你可以选择放弃这条路，前往120。如果要前进，比较你的“体型”和“敏捷”。如果你的“敏捷”较高，前往42。如果你的“体型”较高，进行一次“敏捷”检定。如果你成功了，前往42。如果你失败了，前往36。\n（译注: 如果你的“体型”和“敏捷”相等, 请检定。）',
    options: [
      { type: 'goto', text: '放弃这条路', goto: '120' },
      {
        type: 'goto',
        text: '选择断崖前进，你完全能应付这条小路',
        goto: '42',
        condition: {
          type: ConditionType.COMPARE,
          targetObject: CoreCharacteristicEnum.DEX,
          comparisonObject: CoreCharacteristicEnum.SIZ,
          comparisonOperator: 'gt',
        },
      },
      {
        type: 'check',
        text: '选择断崖前进，但你知道自己得十分小心才能通过',
        condition: {
          type: ConditionType.COMPARE,
          targetObject: CoreCharacteristicEnum.SIZ,
          comparisonObject: CoreCharacteristicEnum.DEX,
          comparisonOperator: 'gte',
        },
        check: {
          details: {
            object: 'characteristic',
            subObject: CoreCharacteristicEnum.DEX,
            difficulty: CheckDifficulty.NORMAL,
          },
          successText: '你小心翼翼地走过了这段路段',
          onSuccessSceneId: '42',
          failureText: '看来你还是不够小心',
          onFailureSceneId: '36',
        },
      },
    ],
  },
  '30': {
    id: '30',
    story:
      '午后的阳光照射到地面上，你发现了一些有意思的东西。窗户下面的地板比房间中央的地板要新。窗框也有最近曾经更换过的痕迹。也许是雨水漏进来，木头被腐蚀了。',
    info: '你可以在「侦查」技能左边的小方框里打勾。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '37',
        effects: [
          {
            type: EffectType.MARK_SKILL_SUCCESS,
            target: SkillEnum.SPOT_HIDDEN,
          },
        ],
      },
    ],
  },
  '31': {
    id: '31',
    story:
      '梅开始说起她在烬头村的生活。“我妹妹每次来信都会问我有没有过够这种日子。她住在纽约。然后她就开始讲自己晚上走回家时有多么害怕！我也该问问你。”\n你说到你希望在阿卡姆开始新生活。梅好像没有听进去你的话。\n“这里的确是小地方没错，但也就是说我们有真正的群体性。所有人的脸都是熟脸，所有人都一起工作。我们不排斥任何人，当然，要刨掉那些自己选择离开群体的人。我现在已经不好再住到别的地方了。”',
    options: [
      {
        type: 'check',
        text: '进行「魅惑」检定',
        check: {
          details: {
            object: 'skill',
            subObject: SkillEnum.CHARM,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '39',
          onSuccessEffects: [
            {
              type: EffectType.SET_FLAG,
              gameFlag: GameFlag.LAST_NIGHT_SKILL_CHECK_SUCCESS,
              flagValue: true,
            },
          ],
          onFailureSceneId: '51',
          successText: '虽然梅没有说什么，但你感觉她对你有好感',
          failureText: '你能感觉到梅对你和其他人并没有什么不同',
        },
      },
    ],
  },
  '32': {
    id: '32',
    story:
      '梅的眼中升起怒火，厉声喝道：“你敢在女人的家里打人吗？这街上可住着十八个人。只要我喊一声，所有人都会跑过来。”\n她从客房夺路而出，回到她的卧室。你考虑继续追究这个问题，但最终决定放弃。',
    options: [
      { type: 'goto', text: '用椅子堵住门再小睡一会', goto: '58' },
      { type: 'goto', text: '彻夜不眠', goto: '52' },
    ],
  },
  '33': {
    id: '33',
    story:
      '看来整个村子的人都围到了灯塔前，看你怎么烧死。你能隔着脸上的颜料认出梅·莱德贝特，还有——对，那个巴士司机西拉斯，就站在她旁边。\n这场骗局竟如此庞大无耻，令你心惊胆寒。\n一个男人登上高台，在全场寂静之下扬起手臂。他的眼镜遮挡着脸上的红三角。\n“现在，我们像往年一样，在今夜再度聚集到这里。我们要感谢将村庄从虚空之火中拯救的人。您将代替我们，被从天而降者带走。您的牺牲将给我们的街道带来生机，为我们的田野送去丰收。它将保佑我们的孩子和老人度过安稳的一年。我们向您致敬。”他俯首示意。\n举火者从灯塔四周迈进，将手中的火把举到高台的边缘上。一圈小小的火苗开始沿着高台四周闪烁起来。火光明灭之中，村民们的歌唱逐渐变得低沉，化作超脱尘世的韵律。',
    options: [
      { type: 'goto', text: '用尽剩余的气力挣脱锁链', goto: '44' },
      { type: 'goto', text: '静观其变', goto: '40' },
    ],
  },
  '34': {
    id: '34',
    story:
      '你穿过街道，走向教堂。当你向左张望时，视线正好落到巨大的金属建筑物上。它的位置令你有点在意。你转身回去重新端详。没错！烬头村的中央大街笔直地朝那建筑物而去。太精确了，怎么看也不像是巧合。\n你继续前进，来到教堂的阴影下。这建筑物状态相当凄惨。尖塔的顶已经没了，残破的木板上粗糙不平的裂痕标志着它早已不见踪影，正下方的地板也已经塌陷。貌似尖顶在掉下去的时候，也把主楼的房顶给砸坏了。只有后半边是完整的无缺的。曾经涂覆在教堂墙上的白漆，现在也泛黄剥落了。\n在后半边探索似乎足够安全。古旧的长椅排列在内墙两侧，几乎完全被霉斑覆盖。窗户也破得差不多了。你猜测这教堂大概已经废弃二十年了。但这里还有些其他有趣的东西。',
    options: [
      {
        type: 'check',
        text: '进行「骑术」检定',
        check: {
          details: {
            object: 'skill',
            subObject: SkillEnum.RIDE,
            difficulty: CheckDifficulty.NORMAL,
            bonusDice: 1,
          },
          onSuccessSceneId: '46',
          onFailureSceneId: '25',
          successText: '你闻到了一些奇怪的气味',
          failureText: '你没能找到任何有趣的东西，于是决定离开。',
        },
      },
    ],
  },
  '35': {
    id: '35',
    story:
      '那是郊狼的嗥叫，在这个地区很常见。狼嗥听上去很吓人，尤其是晚上的时候，但郊狼懂得躲避人类。你可以毫无惧色地前进',
    effects: [
      {
        type: EffectType.MARK_SKILL_SUCCESS,
        target: SkillEnum.NATURAL_WORLD,
      },
    ],
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '54',
      },
    ],
  },
  '36': {
    id: '36',
    story:
      '泥土随着你的踩踏下陷，断崖的边缘崩落了。你开始下坠，感觉自己的脏腑都在倾斜。',
    options: [
      {
        type: 'check',
        text: '进行「攀爬」检定',
        check: {
          details: {
            object: 'skill',
            subObject: SkillEnum.CLIMB,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '48',
          onFailureSceneId: '55',
          successText: '你平日的锻炼让你在这次意外中幸存了下来',
          failureText: '你没能在下落过程中抓住机会',
        },
      },
    ],
  },
  '37': {
    id: '37',
    story:
      '你身后的门发出吱嘎的响声。一个戴眼镜的中年绅士出现在门前：“有什么需要吗？”\n你解释说，梅·莱德贝特建议自己来这里。\n“啊。好吧。我是克莱德·文特斯。我不知道我能不能帮上您的忙，但......您要不要来点儿咖啡？我下午总爱喝一杯。”\n他用手指向身后敞开的大门。这看起来是次值得把握的机会，而且你也有点渴了。',
    options: [{ type: 'goto', text: '接受邀请', goto: '43' }],
  },
  '38': {
    id: '38',
    story:
      '司机继续享受他的烟卷，饶有兴致地看着你和箱子拼命。你咬咬牙，终于把第二个行李举起来，放到了位。兴许阿卡姆的人会比他有礼貌点儿。',
    options: [{ type: 'goto', text: '放好行李，准备出发', goto: '233' }],
  },
  '39': {
    id: '39',
    story:
      '随着时间流逝，梅乐观的态度变成了沉吟。\n“生活也不是一帆风顺的。你知道吗，我是个寡妇。我手头有点儿钱，当然也欢迎像你这样的旅行者做客。只要我们住在这里就不会挨饿，但我觉得我是不可能再嫁出去了。村里的每个男人我都认识。我太了解他们了，你懂我的意思吧。”\n她撇了撇嘴，打了个呵欠，伸手拢了几下头发。\n“不早了，我该睡觉了。你想几点钟吃早饭？”',
    info: '在你的调查员角色卡上「魅惑」左边的小方框里打勾。如果你成功完成了本次冒险，你有机会通过这次和梅的经历，学到一些东西。\n现在前往63。',
    effects: [{ type: EffectType.MARK_SKILL_SUCCESS, target: SkillEnum.CHARM }],
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '63',
      },
    ],
  },
  '40': {
    id: '40',
    story:
      '火焰蜿蜒爬过薪柴，一边延烧一边升腾。烟雾开始弥漫，村民的身影已经难于辨认。你身边三具人体也被点燃，红色的火焰里带着黑烟。浓烟钻进了你的肺，你开始咳嗽，努力压抑涌上心头的强烈恐惧。\n如果你学过奇怪的咒语又想尝试的话，现在就抓住时机。',
    options: [
      {
        type: 'goto',
        text: '尝试阿博加斯特的咒语',
        goto: '50',
        condition: {
          type: ConditionType.HAS_ITEM,
          item: ItemBox.AbogastChant.cn.name,
        },
      },
      {
        type: 'goto',
        text: '尝试咒语：号令天之火',
        goto: '90',
        condition: {
          type: ConditionType.HAS_ITEM,
          item: ItemBox.SpellCommandFireFromSky.cn.name,
        },
      },
      {
        type: 'goto',
        text: '尝试咒语：召唤天之火',
        goto: '80',
        condition: {
          type: ConditionType.HAS_ITEM,
          item: ItemBox.SpellSummonFireFromSky.cn.name,
        },
      },
      { type: 'goto', text: '不尝试咒语/未学过咒语', goto: '65' },
    ],
  },
}
