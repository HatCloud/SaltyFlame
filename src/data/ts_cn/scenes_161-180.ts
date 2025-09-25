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

export const scenes_161_180: SceneData = {
  '161': {
    id: '161',
    story:
      '你甩掉了熊，回到道路上，心脏咚咚地锤打着你的胸腔。你又奔跑了几分钟，直到你确认它不再理会你，才停了下来。',
    options: [{ type: 'goto', text: '继续', goto: '79' }],
  },
  '162': {
    id: '162',
    story:
      '你觉得西拉斯的行动有些不真实。他在演戏。也许他并不像他的行动显示的那样处理不了这次故障，也许这次故障整个儿都是假的。\n如果这是个诡计，为了让你花钱花时间在路上的商店买东西的话，西拉斯会因为你空荡的钱包而非常失望的。\n在你的调查员角色卡上「心理学」左边的小方框里打勾。如果你成功完成了本次冒险，你有机会通过这次和西拉斯的经历，学到一些东西。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '194',
        effects: [
          {
            type: EffectType.MARK_SKILL_SUCCESS,
            target: SkillEnum.PSYCHOLOGY,
          },
        ],
      },
    ],
  },
  '163': {
    id: '163',
    story:
      '你追上一个黑影，大声呼喊。它滑进了阴影之中。等到你转过墙角，它已经不见踪影。你压住怒火，去追另一个黑影。在你接近时，它也融入黑暗。但第一个黑影又从你身后的阴暗院子里浮现出来。\n你可以这样持续追一整晚，但这些监视者对村子的了解比你多得多。你可能已经让他们明白你不会轻易被吓倒了。你疲惫地返回了莱德贝特的房子。',
    options: [{ type: 'goto', text: '继续', goto: '157' }],
  },
  '164': {
    id: '164',
    story:
      '这些人比你更熟悉村子。你瞅准他们当中最大的空档，一头钻过去。他们紧随其后。你朝南边的路跑过去。你跑到的时候，发现四个村民正在东盘山路口中央把守，明显是守卫。你换个方向，跑向残破的教堂，不住地喘着粗气。\n你从破窗户里溜进教堂，猫腰穿过划分空间的古旧木板，移向另一边的门。这扇门相当完整，长满青苔，而且锁着。\n追你的人有两个已经从窗户爬进了教堂，另外两个从正门进来。\n“投降吧。”男人用棍子嘭嘭地敲击着手掌。“放弃抵抗对你有好处.”\n你几乎没有选择。',
    options: [
      { type: 'goto', text: '放弃抵抗', goto: '108' },
      { type: 'goto', text: '弄塌他们头上的一段屋顶', goto: '176' },
    ],
  },
  '165': {
    id: '165',
    story:
      '光线照射到房间里，你可以辨认书名了。壁龛里的书和图书室的书有很大区别：这里的书要旧得多，很多都是手写的，更有不少用奇特的文字写成，你根本不认识。仅仅浏览这些奇异的书卷，就足够你在这里花去一星期的时间。',
    options: [
      {
        type: 'check',
        text: '进行「图书馆使用」检定',
        check: {
          details: {
            object: 'skill',
            subObject: SkillEnum.LIBRARY_USE,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '177',
          onFailureSceneId: '184',
          successText: '进行「图书馆使用」检定（成功）',
          failureText: '进行「图书馆使用」检定（失败）',
        },
      },
    ],
  },
  '166': {
    id: '166',
    story:
      '梅的家里好像没有自来水，但有一个陶坛子，里面积了一些水。你在盥洗室梳洗一番，走进屋子里。梅又做了一顿丰盛的早餐，让你安心享用。\n差不多七点半的时候，你付了钱，打点好行李，准备继续上路。你向梅告别，她祝愿你在阿卡姆工作顺利。',
    options: [
      {
        type: 'goto',
        text: '进一步勘查后果',
        goto: '178',
        condition: {
          type: ConditionType.FLAG_SET,
          gameFlag: GameFlag.LAST_NIGHT_SKILL_CHECK_SUCCESS,
          expectedValue: true,
        },
      },
      { type: 'goto', text: '上路', goto: '192' },
    ],
  },
  '167': {
    id: '167',
    story:
      '就在你离道路还有差不多十步的时候，熊在你身后几寸远的地方咆哮一声，爪子撕破了你的夹克。\n熊会用双爪攻击，每一爪都是一次单独的攻击。它每次都有35%的概率击中你，造成3D6点伤害。若任一次攻击对你造成的伤害大于等于你最大耐久值的一半，你就受到了重伤。\n在两爪都结算完成后，如果你受到了重伤，前往 179。否则前往 186。',
    options: [
      { type: 'goto', text: '（假设受到重伤）', goto: '179' },
      { type: 'goto', text: '（假设未受重伤）', goto: '186' },
    ],
  },
  '168': {
    id: '168',
    story:
      '你四下里确认自己没有被监视，就往回看向大道尽头。整个村子的人都在专注地望着灯塔。\n他们的吟诵升到了狂热的新音调。你不太清楚为什么，但你模糊地感觉到有哪里出了差错。吟诵开始被打断，人群在动摇。然后——\n轰！！有什么白热的东西像雷霆一样劈进灯塔前面的人群，在你的视野里留下一道炽烈的印迹。你觉得自行车下的地面都在震颤。轰！！又有一发坠落附近，火星四射。吟诵支吾不清，逐渐被尖叫声压过。\n火焰扫过灯塔前的建筑物，烟雾顺着街巷翻滚。一个女子脚步蹒跚地走向你，放声哭号。她的手臂上着着火，在墙上不住地拍打着。\n轰！！又一发坠落到你的视线之外，向着村会堂而去。是时候离开了。',
    options: [{ type: 'goto', text: '离开', goto: '185' }],
  },
  '169': {
    id: '169',
    story:
      '阿博加斯特带着你穿过大道，躲过一座座房子。金属建筑物耸立在道路尽头。他说：“灯塔现在很安静，但它明天就会复活.”\n他领你到了村学校后面的壁凹里，往后扫视一圈，然后坐了下来。你挨着这个伤疤满脸的人，还是感觉不舒服。他抬起一只变形的眼皮。\n“你的时间不多了。听懂我的话。以前我是中转者，也是解密者。但后来文特斯这个蠢材用他的花言巧语改变了一切。来烬头村的东西才不理睬什么语言。那些白痴认为这是人祭仪式！”他向草地上吐了口痰。“这是控制的仪式。他们只懂得咒语，但他们不懂得自己召唤的是什么力量.”\n他抽了抽鼻子，坐了回去。“他们不懂！你没有时间问这问那。我来告诉你，在一切都要结束的时候，怎样让它终结。你可以把这山丘还给大地，送回四十年前造访过这里的死亡。我自己已经试过了。但......”他垂下头，“我已经没有那种集中力了。咒语很简单；我可以教给你。但你使用时必须有清晰的头脑，我已经失去它很久了.”',
    options: [
      {
        type: 'goto',
        text: '学习奇怪的咒语',
        goto: '175',
        effects: [
          {
            type: EffectType.ADD_ITEM,
            item: ItemBox.AbogastChant.cn,
          },
        ],
      },
      { type: 'goto', text: '已经受够阿博加斯特了', goto: '182' },
    ],
  },
  '170': {
    id: '170',
    story:
      '你转过一个街角，直接朝那个眼神凶狠的难对付女人冲了过去。她揪过你的肩膀，一下就把你扳倒。少年和拿着棍子的男人一齐冲上来，你很快就被制服了。',
    options: [{ type: 'goto', text: '继续', goto: '108' }],
  },
  '171': {
    id: '171',
    story:
      '你花了一个星期才学懂德比的诗作。他的诗作表述了宇宙核心的东西：振荡的、吞噬一切的质量，撕裂着宇宙的每一根纤维。它的信使，时而称作无面者，时而称作伏行的混沌，所触之处皆堕入混乱。他的文字风格独特：并非生动的联想，而是无望的揭示。\n学习诗集的时候，你还注意到诗篇之间潜藏的联系，令你开始心绪不宁。进行一次“理智”检定。如果你成功了，失去1点理智值。如果你失败了，失去1D4点理智值。你可以增加4点「克苏鲁神话」技能。你将再也难以轻松入眠。\n【剧终】',
    effects: [
      {
        type: EffectType.CHANGE_SKILL,
        target: SkillEnum.CTHULHU_MYTHOS,
        value: 4,
      },
    ],
    options: [
      {
        type: 'check',
        text: '进行“理智”检定',
        check: {
          details: {
            object: 'characteristic',
            subObject: CoreCharacteristicEnum.POW,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: 'END',
          onFailureSceneId: 'END',
          successText: '理智检定成功',
          failureText: '理智检定失败',
          onSuccessEffects: [{ type: EffectType.CHANGE_SANITY, value: '-1' }],
          onFailureEffects: [{ type: EffectType.CHANGE_SANITY, value: '-1D4' }],
        },
      },
    ],
  },
  '172': {
    id: '172',
    story:
      '你逐渐靠近那个男人。他回头怒视着你。“你这混账，”他啐道，放慢了脚步。“你能离开我吗？”\n你向他保证自己对他没有恶意。\n他说：“我们不能在这里说话。跟我来.”',
    options: [{ type: 'goto', text: '继续', goto: '142' }],
  },
  '173': {
    id: '173',
    story:
      '熊并没有被你的勇气打动。它立起身，挥爪向你袭来。\n处理近身战斗时，使用快速开始规则的第14～16页（规则书第102～111页）。你需要先阅读第8页（规则书第33页）来查询自己的伤害加值。\n参战者中“敏捷”最高的最先行动。你每个战斗轮可以进行一个动作。熊每向你攻击一次，你都可以选择反击（投掷「格斗(斗殴)」）或者闪避（投掷「闪避」）。战斗技能检定是对抗检定：谁的成功度高，谁得手。\n黑熊的“敏捷”为58，耐久值为20。它浓密厚实的皮毛会吸收你每轮造成伤害的前3点。它第一轮会用两只爪子各攻击一次。它的「爪击」技能为35%（半值17%/五分之一值7%），每次攻击成功后都能造成2D6点伤害。第二轮它会用一只爪子攻击并用嘴咬。它的「啃咬」技能是25%（半值12%/五分之一值5%），造成1D8点伤害。第三轮它会再次使用双爪攻击。\n如果你带着小刀或类似的武器，你每次攻击成功都会造成1D4点加上伤害加值点数的伤害。如果你赤手空拳，伤害是1D3点加上伤害加值点数。\n如果你受了重伤，进行一次“体质”检定。如果你失败了，前往193。如果你在三轮结束后仍然没有倒下，前往201。',
    options: [
      { type: 'goto', text: '（战斗后，假设失败并受重伤）', goto: '193' },
      { type: 'goto', text: '（战斗后，假设三轮后未倒下）', goto: '201' },
    ],
  },
  '174': {
    id: '174',
    story:
      '你听到的刺耳噪声当然可以表征引擎的故障，但这也可能和选错档位或者离合器故障有关。即使已经连续驾驶了一天，有经验的公交车司机也几乎不可能突然搞错这种事情。\n如果这是个诡计，为了让你花钱花时间在路上的商店买东西的话，西拉斯会因为你空荡的钱包而非常失望的。',
    info: '在你的调查员角色卡上「汽车驾驶」左边的小方框里打勾。如果你成功完成了本次冒险，你有机会通过这次和西拉斯的经历，学到一些东西。',
    effects: [
      {
        type: EffectType.MARK_SKILL_SUCCESS,
        target: SkillEnum.DRIVE_AUTO,
      },
    ],
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '194',
      },
    ],
  },
  '175': {
    id: '175',
    story:
      '天色已晚，你坐在学校后面的悬崖顶上，跟着一个疯子学他背下来的咒语，颇有脱离现实之感。阿博加斯特小心翼翼地一段一段教你。\n他望了一眼天空。“现在没有用。云挡住了星星.”但他仍然特别留心，不会一次说出整句咒语。\n它的开头很有韵律，还有各种精巧的设计，但最核心的是重复三次的段落：\nPh’nglui mglw’nafh Cthugha Fomalhaut \nn’ghaghaa naf ’l thagn! Iä! Cthugha!\n最后，阿博加斯特听了你的背诵，点点头。“每个字都要记住。但只要你在这地上还有活路，就千万不要念出它.”\n你发现了一个秘密。如果有朝一日你的状况绝望到需要用到阿博加斯特的仪式，这段文字可以提供你施法的机会。\n阿博加斯特侧回身。“它会让你变成和活——”',
    info: '到那时，如果你想尝试这个仪式，在你所在的条目号上加10，前往对应的条目。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '188',
        effects: [
          {
            type: EffectType.ADD_ITEM,
            item: ItemBox.AbogastChant.cn,
          },
        ],
      },
    ],
  },
  '176': {
    id: '176',
    story:
      '尽管你转来转去寻找薄弱点，但你也知道这个计划过于痴心妄想。不到两天之前你还在长途车上赴任新职，现在你却呆在破教堂里还打算毁了它。\n你在一段塌了一部分的房顶下发现了一根已经弯曲的木柱子。你抓起一段坏掉的铁棍。',
    options: [
      {
        type: 'check',
        text: '进行困难“力量”检定',
        check: {
          details: {
            object: 'characteristic',
            subObject: CoreCharacteristicEnum.STR,
            difficulty: CheckDifficulty.HARD,
          },
          onSuccessSceneId: '189',
          onFailureSceneId: '183',
          successText: '进行困难“力量”检定（成功）',
          failureText: '进行困难“力量”检定（失败）',
        },
      },
    ],
  },
  '177': {
    id: '177',
    story:
      '绝大多数的书对你来说都太过晦涩，除非能在好的图书馆驻留多日，否则你根本读不懂。一个厚重的书套吸引了你，书套上压印着一个暗红色的三角形。它的内文字形细长，但版面很洁净，你可以勉强读懂。\n它好像来自一套讨论基本元素的书：全书共有七卷，分别讨论地、水、风、火、盐、硫、汞。这本书讨论的是火。你翻开书页，书里有各种天文学图表、炼金符号、引用自但丁的诗句，还有对天罚原理的猜测。\n书的末尾讨论火焰祭祀，还转录了两篇关键仪式：“召唤天之火”和“号令天之火”。你能够记住其中一篇，但是需要时间。这些到底是无稽之谈，还是值得冒险一记呢？',
    info: '你可以在「图书馆使用」技能左边的小方框里打勾。',
    effects: [
      {
        type: EffectType.MARK_SKILL_SUCCESS,
        target: SkillEnum.LIBRARY_USE,
      },
    ],
    options: [
      {
        type: 'goto',
        text: '记住“召唤天之火”',
        goto: '197',
      },
      {
        type: 'goto',
        text: '记住“号令天之火”',
        goto: '202',
      },
      {
        type: 'goto',
        text: '把书放回去然后离开',
        goto: '120',
      },
    ],
  },
  '178': {
    id: '178',
    story:
      '你循着昨晚的脚印找过去。在你拖着行李，沿路穿行在北面的悬崖上时，几个村民看着你，向你投去礼貌而好奇的目光。不久你认为你找到了那个地方。你伸出悬崖张望，心脏在胸膛里扑腾扑腾地跳。\n什么都没有。\n借着阳光帮助，你看见悬崖并没有你想象的那样深不见底；它底下是差不多20码深的岩盘。但人若一跤跌下去，肯定会摔个半死。但你没见到尸体，也看不见血迹。',
    options: [
      {
        type: 'check',
        text: '进行「侦查」检定',
        check: {
          details: {
            object: 'skill',
            subObject: SkillEnum.SPOT_HIDDEN,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '112',
          onFailureSceneId: '192',
          successText: '进行「侦查」检定（成功）',
          failureText: '进行「侦查」检定（失败）',
        },
      },
    ],
  },
  '179': {
    id: '179',
    story: '温热的鲜血从你的后背汩汩流出。你一阵头晕目眩。',
    options: [
      {
        type: 'check',
        text: '进行“体质”检定',
        check: {
          details: {
            object: 'characteristic',
            subObject: CoreCharacteristicEnum.CON,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '186',
          onFailureSceneId: '193',
          successText: '进行“体质”检定（成功）',
          failureText: '进行“体质”检定（失败）',
        },
      },
    ],
  },
  '180': {
    id: '180',
    story:
      '天色渐晚，你回到莱德贝特家，简单地吃了一顿晚饭。梅反常地沉默。吃饭时，露丝轻轻瞟了你几眼，似乎有一种你难以理解的急迫感。吃完饭，梅就拉着女儿回了屋。\n你在烬头村已经停留将近一整天了，这里从地理到社会无不给你一种闭塞的感觉。这一晚似乎没有什么事可做。',
    options: [
      { type: 'goto', text: '到外面眺望星空', goto: '131' },
      { type: 'goto', text: '试着和露丝说说话', goto: '138' },
      {
        type: 'goto',
        text: '如果你之前和人有约，现在是时候赴约了。',
        goto: '200',
        condition: {
          type: ConditionType.FLAG_SET,
          gameFlag: GameFlag.APPOINTMENT_WITH_ABOGAIST_9PM_CEMETERY,
          expectedValue: true,
        },
      },
    ],
  },
}
