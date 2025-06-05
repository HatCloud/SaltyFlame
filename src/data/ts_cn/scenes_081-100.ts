import type { SceneData } from '../../interface/Scene'
import {
  CheckObjectKey,
  EffectType,
  CheckDifficulty,
  // ConditionType, // Removed as not used in current scenes 81-100
} from '../../constant/enums'

export const scenes_081_100: SceneData = {
  '81': {
    id: '81',
    story:
      '没有出版资料论述烬头村的节日，你并不觉得奇怪。文特斯到处拨找，找到了一盒专题文章，这些文章手写在泛黄的纸上，署名是阿尼奥洛夫斯基博士(Dr. Aniolowski)。“我认为这是我父亲的熟人，”文特斯说。\n这篇手稿读起来有些吃力，你读得很慢。\n阿尼奥洛夫斯基推测，这个节日来源于凯尔特移民带来的原始宗教仪式，这些人还在庆祝古老的五朔节、萨温节、圣布里吉德节和秋收节(Lughnasadah)。还有一些讨论是关于季节的辩论，和一些与烬头村的“校准”有关的间接引文。\n文章正要开始讨论现代的仪式时，在第28页末尾戛然而止，句子都断开了。你问文特斯还有没有后面的页数。\n他说：“没有。后面的可能放错了。也许还在这间藏书室里，但......”他耸耸肩，“我必须花时间做一次彻底的盘点。”',
    options: [{ type: 'goto', text: '继续', goto: '99' }],
  },
  '82': {
    id: '82',
    story:
      '五分钟以后，你才勉强站起身来，一瘸一拐地挪到悬崖边上倚着。你的身影从棚屋后面露出来。两个路过的村民发现了你，跑过来帮忙。他们一人架住你一只胳膊，走回了烬头村高原。你受伤太重，连挣扎的力气都没有。\n一名村妇带你到一间屋子里，处理你的伤口。湿毛巾冰凉的触感让你舒服了一些。但男人们一直站在在旁边守着。村妇处理完后，他们走出房间，锁上了门。\n你抵挡不住疲惫的侵袭。',
    options: [{ type: 'goto', text: '继续', goto: '108' }],
  },
  '83': {
    id: '83',
    story:
      '尽管梅很热情，可你还是不能相信她。你大大方方地又折回了她的房子。难道还有其他地方能去吗？\n房间里仍然空无一人。你敲敲卧室门，等了一会儿。里面没有动静。你小心地推开了门。\n莱德贝特自己的卧室和你干净的客房形成了鲜明的对比。地板上到处都堆着脏衣服，乱烘烘的被褥上散落着课本和廉价小说。你还看到床沿下面丢着一个陈旧破烂的洋娃娃。',
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
          onSuccessSceneId: '95',
          onFailureSceneId: '89',
          successText: '进行「侦查」检定（成功）',
          failureText: '进行「侦查」检定（失败）',
        },
      },
    ],
  },
  '84': {
    id: '84',
    story:
      '村会堂背靠着锡尔伯里街东头的悬崖。这是你到烬头村以来看见的最大的一座建筑物了。但它现在大门紧闭，还上着锁。你围着它走了一圈，从百叶窗的缝隙向里窥视。看上去里面有一间大厅，大概是用作村民集会；还有较小的配楼，用作办公室和档案室。有一扇窗户被砖头砌死了。\n你回到大门口后也看不到门口有任何开放时间表。\n一个灰衣女人经过说：“文特斯先生上午不开门，每年这时候都是。下午再来吧。”\n你问办公室里能不能拍电报。\n“不知道。”她耸耸肩，“我们要拍给谁？”\n你得之后才能再来尝试。',
    options: [{ type: 'goto', text: '继续', goto: '25' }],
  },
  '85': {
    id: '85',
    story:
      '你开始沿小径行走，进展还不错。有几棵爬满青苔的树桩标示着路线，你怀疑这条小径的路线是精心选取的。可是大概十分钟以后，树枝越靠越近，辨认道路向前走变得越来越困难。正当你认为你能看见前方道路出口的时候，你脚底踩了个空。',
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
          onSuccessSceneId: '91',
          onFailureSceneId: '97',
          successText: '进行“幸运”检定（成功）',
          failureText: '进行“幸运”检定（失败）',
        },
      },
    ],
  },
  '86': {
    id: '86',
    story:
      '一个漆黑如墨的身影站在马路中央，大约在你身后20码的位置。它正盯着你。你突然感觉，它会冲向你，然后把你从悬崖边丢下去。太令人不安了。\n黑影看自己被发现，冲进了一条小道。',
    options: [
      { type: 'goto', text: '返回莱德贝特的房子确保安全', goto: '100' },
      { type: 'goto', text: '直面黑影', goto: '121' },
    ],
  },
  '87': {
    id: '87',
    story:
      '你转过一块庄稼地，发现这男人已经消失了。山脊延伸到西面的远方，边缘最外面连接着一片危险的断崖。你跟丢了他。',
    options: [
      {
        type: 'check',
        text: '进行困难「侦查」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.SPOT_HIDDEN,
            difficulty: CheckDifficulty.HARD,
          },
          onSuccessSceneId: '181',
          onFailureSceneId: '160',
          successText: '进行困难「侦查」检定（成功）',
          failureText: '放弃追逐（侦查失败）',
        },
      },
    ],
  },
  '88': {
    id: '88',
    story:
      '你挑出来的科学书籍相当枯燥，后来你换了一本天文书。书里夹着一张太平洋天文学会（旧金山）发放的宣传页，认为太阳系的第四颗行星——火星上可能存在生命。人们普遍认为，尽管这颗行星不像地球一样有湖泊海洋之类的永久水体，但它有随着季节变化而消长的极地冰盖。\n不仅如此，火星南半球的暗区还有其他的季节变化，颜色会从绿色变成褐色，这可能是植被存在的迹象。虽然大家意见各不一致，但火星仍可能有生命。也许威尔斯的小说并不是那么地牵强附会。\n“您是天文学家吗？”文特斯赞许地点点头。“想要观察夜空，烬头村是理想的地点。这几天，连北落师门也可以看到。从飞马座的右边向下找，您就能在地平线上看到它。我希望我也有一架望远镜。”\n（译注：赫伯特·乔治·威尔斯，英国科幻作家。）',
    options: [{ type: 'goto', text: '继续', goto: '99' }],
  },
  '89': {
    id: '89',
    story:
      '你仔细搜索莱德贝特的抽屉。抽屉里只有一张结婚照还算有点意思。梅的丈夫瘦长结实，脸型方正。虽然他们的姿势很正式，但你还是能看出他们之间的爱意。你突然对自己的闯入感到后悔。而且梅任何时候都有可能回来。\n如果你希望孤注一掷，重新投掷「侦查」检定。如果你成功了，前往 95。如果你失败了，前往 101。如果你不想冒险继续，前往 120。\n（译注：如果你刚才的「侦查」检定掷出大失败，不能孤注一掷。前往 120。）',
    options: [
      {
        type: 'check', // Changed from goto to check
        text: '孤注一掷，重新投掷「侦查」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.SPOT_HIDDEN,
            difficulty: CheckDifficulty.NORMAL, // Assuming re-roll is normal difficulty
          },
          onSuccessSceneId: '95',
          onFailureSceneId: '101',
          successText: '（重新侦查成功）',
          failureText: '（重新侦查失败）',
        },
      },
      { type: 'goto', text: '不想冒险继续', goto: '120' },
    ],
  },
  '90': {
    id: '90',
    story:
      '你清清嗓子，开始吟诵你在奇怪书本上找到的仪式，尽力将怪异的音节念得正确。你的脸上翻腾着热浪，明白火焰越来越逼近，但你放下自己的恐慌，集中精力完成吟唱。\n当你说出这些奇怪的字眼时，你发现村民的歌唱改变了，他们也在吟诵咒语。你的手心和太阳穴发出一阵阵奇异的刺痛。\n你正在施放法术。你在本法术中最多可以消耗10点魔法值。如果你的魔法值不足10点，可以在耗尽魔法值之后继续消耗耐久值——但你不能消耗到使耐久值归零。决定消耗的点数以后，前往 198。',
    options: [{ type: 'goto', text: '决定消耗的点数后继续', goto: '198' }], // Player needs to decide MP/HP to spend. This might need a UI element or a different scene structure.
  },
  '91': {
    id: '91',
    story:
      '根须绊住了你的脚踝，你一个趔趄摔倒了。茂密的草丛起到了缓冲作用，你没受什么伤，重新爬了起来。下次有机会的话，你的夹克需要用硬毛刷和海绵好好护理一下。\n你在前方又发现了道路。小径省下的路程并没有你想象的那样多。',
    options: [{ type: 'goto', text: '继续', goto: '79' }],
  },
  '92': {
    id: '92',
    story:
      '看来悬崖折断了你的身体。你逐渐感觉不到疼痛，意识渐渐远去。\n你跌下烬头村的悬崖后，因伤出血过多而死！\n为何不重新尝试这次冒险呢？不同的选择可能会改变你的故事。\n【剧终】',
    options: [{ type: 'goto', text: '游戏结束', goto: 'END' }],
  },
  '93': {
    id: '93',
    story:
      '绝望赐予你力量，你猛力拉扯着你觉得铁链上最薄弱的环节。它断了！你丢下铁链，跌跌撞撞地走过一具红布覆盖的尸体，离开围观的村民。\n你咳嗽不止，头发和眉毛在冒烟。\n你因为火焰受到 1D6 点耐久值伤害。如果你的耐久值因此归零，你就会失去意识，被烈焰烧死！【剧终】。否则，前往 137。',
    options: [
      {
        type: 'goto',
        text: '（若未死）继续',
        goto: '137',
        effects: [{ type: EffectType.CHANGE_HP, value: '-1D6' }],
        // TODO: Add HP check for death in reducer or via a condition
      },
    ],
  },
  '94': {
    id: '94',
    story:
      '当你拿着破破烂烂的杂志坐下来时，文特斯挑起了一只眉毛，但什么也没说。《幻丽诡谭》上的故事尽是些异想天开：什么轨道上的监牢、囚禁中年妇女的恶魔，还有靠无线电波往来星际的机械蜘蛛。\n你看其中一篇科幻小说入了迷：这篇文章讲了难以捉摸的高跷人大步穿越月球表面下冒着蒸汽的沼泽，沼泽中漂浮的迷人大脑引诱着它们。这荒诞奇异的文章让你愉悦放松，把你当前的困境都丢进了字缝。\n如果你之前损失过理智值，你可以回复 1 点。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '99',
        effects: [
          {
            type: EffectType.CHANGE_SANITY,
            value: '+1',
            // TODO: condition: 'HAD_LOST_SANITY', // Conditional logic to be handled by reducer
          },
        ],
      },
    ],
  },
  '95': {
    id: '95',
    story:
      '你在地板上看见了和床腿相对应的拖痕。你费了很大劲才把床拉开。床下铺着一块地毯，地毯的下方是一扇活板门。你打开了它。门下面阴暗的空间大概是地窖。',
    options: [
      { type: 'goto', text: '下到地窖', goto: '114' },
      { type: 'goto', text: '宁愿放弃', goto: '120' },
    ],
  },
  '96': {
    id: '96',
    story:
      '在锡尔伯特街北边，离莱德贝特家不远处，有一座开阔的大院。有节奏的锤击声，好像在告诉你已经到了目的地。\n这座院子是你在烬头村见到的最忙碌的地方。它的周围是一圈工坊。有些是砖石建筑，有些只是简陋的棚屋。有个铁匠停下了他的锤子，将一块发着红光的东西急速塞进凉水桶里。还有个织布工，从织布机上抬起头对你眨了眨眼，就继续摆弄他的梭子。一个陶工、一个雕工和一个木匠各自在自己的位置上工作，互相开着友善的玩笑。\n你在这些工匠之中穿行，和他们谈论他们的工作。最后你提到了出售的问题。他们中有些人会让西拉斯偶尔捎些包裹，有些则完全将产品留给村民使用。你完全没得到关于其他交通方式的消息。',
    options: [
      {
        type: 'check',
        text: '进行「心理学」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.PSYCHOLOGY,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '106',
          onFailureSceneId: '25',
          successText: '进行「心理学」检定（成功）',
          failureText: '进行「心理学」检定（失败）',
        },
      },
    ],
  },
  '97': {
    id: '97',
    story:
      '根须绊住了你的脚踝，你重重地扑倒在地。你痛苦地喘息，手臂针刺一般地疼痛。一条枯枝刺破了你的前臂，削出一道约莫三寸长的口子，鲜血滴到草上。\n你在树丛中发现了道路。也许你应该坚持沿道路走，而不是前往未知的地域。\n失去 1D3 点耐久值。你可以用普通六面骰来投掷：只需要将结果除以二，小数进位。这算是挺严重的伤，但幸运的是它并不足以让你失去意识。\n你可以尝试一次「急救」检定。如果你成功了，回复 1 点耐久值并在「急救」技能左边的小方框里打勾。',
    // entryEffects moved to options
    options: [
      {
        type: 'check',
        text: '尝试「急救」检定',
        effects: [{ type: EffectType.CHANGE_HP, value: '-1D3' }], // Apply damage before check option
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.FIRST_AID,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '79', // Both lead to 79
          onFailureSceneId: '79',
          successText: '（急救成功）',
          failureText: '（急救失败）',
          onSuccessEffects: [
            { type: EffectType.CHANGE_HP, value: '+1' },
            {
              type: EffectType.MARK_SKILL_SUCCESS,
              target: CheckObjectKey.FIRST_AID,
            },
          ],
        },
      },
      {
        type: 'goto',
        text: '不尝试急救，继续',
        goto: '79',
        effects: [{ type: EffectType.CHANGE_HP, value: '-1D3' }], // Apply damage if not attempting first aid
      },
    ],
  },
  '98': {
    id: '98',
    story:
      '正当你考虑下一步该去哪里的时候，你看见了一个光头还缺了一只耳朵的村民专注地盯着你。\n你本能地调转方向。很快，你就见到了其他人从你的面前和两侧冒出：机警的少年、凶神恶煞的中年主妇，还有扛着棍子的男人。他们并不像一开始那样好奇地盯着你，但他们始终监视着你，而且还在逐渐接近。你不能指望同时制服这四个人。',
    options: [
      { type: 'goto', text: '尝试绕着建筑物跑使他们跟丢', goto: '158' },
      { type: 'goto', text: '直接逃跑', goto: '164' },
    ],
  },
  '99': {
    id: '99',
    story:
      '下午的时间在流逝。你还没彻底完成研读，文特斯就看看窗外，站起身来。他清了清嗓子。',
    options: [
      {
        type: 'check',
        text: '进行「信用评级」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.CREDIT_RATING,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '111',
          onFailureSceneId: '105',
          successText: '进行「信用评级」检定（成功）',
          failureText: '进行「信用评级」检定（失败）',
        },
      },
    ],
  },
  '100': {
    id: '100',
    story:
      '你沿着狭窄的街道往回逃，拽着油灯不住地摇晃。你回到门前，急速地咚咚敲门。梅看你这么快就回来了也很惊讶。\n她说：“你要是不适应这里的气氛，很快就会累趴的。”\n你关门之前又往回瞥了一眼。那漆黑的身影站在街道尽头的墙边，仍然紧盯着你。可是，是它吗？黑暗会欺骗你的眼睛。你把沉重的门闩插到了顶。\n梅坐回自己的椅子，但她现在眼皮开始打架，打起了呵欠。“不早了，我想我该睡觉了。你想几点钟吃早饭？”',
    options: [{ type: 'goto', text: '继续', goto: '63' }],
  },

  // Helper scenes S89_REROLL_CHECK and S97_AID_CHECK are now integrated into their respective parent scenes (89 and 97)
  // and can be removed.
}
