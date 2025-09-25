import type { SceneData } from '../../interface/Scene'
import {
  CoreCharacteristicEnum,
  SkillEnum,
  EffectType,
  CheckDifficulty,
  ConditionType,
} from '../../constant/enums'
import { GameFlag } from '../../constant/GameFlags'
import { OccupationKey } from '../occupations'

export const scenes_061_080: SceneData = {
  '61': {
    id: '61',
    story:
      '你静悄悄地趴在草丛里，观察着灯塔周围的活动。村民们扛来了更多的柴火，把它们整齐地捆扎成束。还有一组人负责把柴火束送给站在灯塔平台上的两个男人。他们在建造一种三角形的结构，看上去像是巨大的篝火。\n你越看，越因这些劳作者的举止而震惊。这是他们的节日。你本希望看到欢乐的气氛和轻松愉快的交谈，但他们表情有些是顺从、冷漠，也有些是赤裸裸的恐惧。\n你观察了足有半个钟头才溜走。',
    options: [{ type: 'goto', text: '继续', goto: '120' }],
  },
  '62': {
    id: '62',
    story:
      '你对他架子上那些书册做了简单而讨好的评论。文特斯高兴地涨红了脸。\n他说：“哎，这当然不是我私人的收藏。这是属于全村的。但最新的书的确是我精挑细选过的。我挂上‘私用’的牌子，是防止别人在集会时随便进出。但这里其实还是公用的。”\n你扫了一眼书架。书架上是零散但为数不少的数学与科学书、还说得过去的文史书，还有一架文学书。他还在角落里藏了几本通俗小说和破烂的《幻丽诡谭》杂志。\n“恐怕质量和人气并不总是相配。”文特斯带着歉意对你微笑道。',
    options: [
      { type: 'goto', text: '花点时间在图书馆里研究研究', goto: '68' },
      { type: 'goto', text: '趁天色还早时离开', goto: '180' },
    ],
  },
  '63': {
    id: '63',
    story:
      '当梅站起身的时候，你听到身后传来撞门的声音。你扭头往回看，却只能看见关得严严实实的木门。\n梅咂了咂嘴。“是我们家的小女主人。她准是在偷听我们说话。露丝！出来和客人打个招呼。”\n一阵短暂的沉默之后，门吱嘎一声开了。门后的人披着乱蓬蓬的头发，穿着粗糙的睡衣；她的一双大眼睛透过门缝盯着你。\n“你该说什么？”\n她眨了眨眼。“很高兴见到你。”\n“现在回去睡觉。”\n门又合上了。\n“我女儿露丝。今年夏天就十岁了。她是个既快乐又痛苦的孩子。不用担心，她会和我一起睡，不会打扰你的。那么，该说晚安了。”\n你走进你的房间躺下。房间里有点冷，但你实在太疲倦了，压根没有考虑生火。床上铺着洁净的床单，躺下不久就暖和起来。你在城市里生活了那么久，感觉外面的寂静很奇怪，但很快就睡着了。',
    options: [{ type: 'goto', text: '继续', goto: '154' }],
  },
  '64': {
    id: '64',
    story:
      '莱德贝特家的厨房空空荡荡，不过桌上摆出了面包和鸡蛋充当早餐。还有一张梅写的纸条，说她要带露丝出门几个小时。',
    options: [
      {
        type: 'goto',
        text: '如果你昨天夜里卷入了一场战斗，并想进一步勘查其后果',
        goto: '70',
        condition: {
          type: ConditionType.FLAG_SET,
          gameFlag: GameFlag.FOUGHT_LAST_NIGHT,
          expectedValue: true,
        },
      },
      { type: 'goto', text: '否则', goto: '78' },
    ],
  },
  '65': {
    id: '65',
    story:
      '火舌舔上你的双腿。你的眼中充满泪水。你被烟幕笼罩了；也许是你的想象，但你认为你感觉到铁链有一点点松动。你用尽全力挣扎，全然不顾铁链在你的手腕上拴得有多么牢固。\n你因为火焰受到 1D6 点耐久值伤害。',
    info: '如果你的耐久值因此归零，你就会失去意识，被烈焰烧死！【剧终】。否则，进行一次“力量”检定。如果你成功了，前往 93。如果你失败了，前往 77',
    effects: [{ type: EffectType.CHANGE_HP, value: '-1D6' }],
    options: [
      {
        type: 'goto',
        text: '你的意识消失在火焰中【剧终】',
        goto: 'END',
        condition: {
          type: ConditionType.ALIVE,
          expectedValue: false,
        },
      },
      {
        type: 'check',
        text: '你强忍着痛苦，进行着殊死一搏，尝试用力挣脱铁链',
        condition: {
          type: ConditionType.ALIVE,
          expectedValue: true,
        },
        check: {
          details: {
            object: 'characteristic',
            subObject: CoreCharacteristicEnum.STR,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '93',
          onFailureSceneId: '77',
          successText: '你成功了！',
          failureText: '你绝望地发现自己无法挣脱铁链。',
        },
      },
    ],
  },
  '66': {
    id: '66',
    story:
      '太阳的位置令你困惑。它让你想起你看过的一本杂志上的东西；一篇关于英国巨石阵的文章，你查看自己的位置、北面群山的位置，闭上眼睛，根据你早上探索的结果，在心底描绘烬头村的布局。金属建筑物如同钥匙一般，坐落在它的峭壁之上。是的，这完全有可能。\n当然，你并没有得到确切的方位，也无法查找天文表，所以不能肯定。但如果你的猜测正确的话，烬头村中央大街的位置正好能让夏至日的晨光照过金属建筑物，直接投射到大街中央。\n这也许只是大胆的猜测。但是你觉得它还有些道理。',
    info: '你可以在「考古学」技能左边的小方框里打勾。',
    effects: [
      {
        type: EffectType.MARK_SKILL_SUCCESS,
        target: SkillEnum.ARCHAEOLOGY,
      },
    ],
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '79',
      },
    ],
  },
  '67': {
    id: '67',
    story:
      '你以奇怪的角度落地，身上有哪里断掉了。你摸摸身下面，手指上沾上了湿湿的东西。你视野边缘的黑幕在徐徐关闭。\n你受到了重伤。',
    info: '进行一次“体质”检定。如果你成功了，前往 82。如果你失败了，前往 92。',
    options: [
      {
        type: 'check',
        text: '尝试凝聚最后的力气，站起来',
        check: {
          details: {
            object: 'characteristic',
            subObject: CoreCharacteristicEnum.CON,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '82',
          onFailureSceneId: '92',
          successText: '你成功了！',
          failureText: '最后的尝试也是徒劳的。',
        },
      },
    ],
  },
  '68': {
    id: '68',
    story:
      '文特斯很高兴你能花掉整个下午的时间读书，找了一把直挺但舒适的椅子让你坐。你有足够的时间顺着一条线索做深入的研究。',
    options: [
      { type: 'goto', text: '研读本地历史相关的内容', goto: '74' },
      { type: 'goto', text: '研读节日相关的内容', goto: '81' },
      { type: 'goto', text: '研读科学书籍', goto: '88' },
      { type: 'goto', text: '研读怪诞小说', goto: '94' },
    ],
  },
  '69': {
    id: '69',
    story:
      '当你从这座铁铸的建筑走开时，你注意到这村子的布局有些怪异。所有的木屋都集中在村西和村西南。而到了接近灯塔的村东和村东北，建筑则变成了深色的砖房和土房。这是不是说明村庄是从灯塔开始，逐渐向西扩张的呢？',
    info: '你可以在「侦查」技能左边的小方框里打勾。',
    effects: [
      {
        type: EffectType.MARK_SKILL_SUCCESS,
        target: SkillEnum.SPOT_HIDDEN,
      },
    ],
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '25',
      },
    ],
  },
  '70': {
    id: '70',
    story:
      '你如惊弓之鸟一般来到你和阿博加斯特被袭击的地方。你对战斗的记忆暧昧不明，但有几个生动的影像你记得非常清楚。\n一开始你认为这里没什么值得看的东西：没有被扔掉的武器，也没有倒在地上的人。但仔细检验之下，你还是找到了凝固发黏的斑块，还有草丛上熏黑的线条。\n若是村里有警察局，你大可以前去。但有些迹象让你意识到，事情的发展早已超过了你的判断。',
    options: [{ type: 'goto', text: '继续', goto: '78' }],
  },
  '71': {
    id: '71',
    story:
      '你的行程重新开始了。司机转弯时变得更加小心。他转过头看了你好几次。\n“刚才对不住，”他说，“那货比猪还蠢。我叫西拉斯。你的名字是？”\n刚才的事件里，西拉斯和农民的责任至少要对半分。但是，当他开车带你穿过这前不着村、后不着店的地方时，和他对抗可能并不明智。\n长途车开上了一条窄一些的路，这条路迂回上升，穿过树林。西拉斯的话变得多了起来。\n“去阿卡姆吗，哈？都没听说过这地方。就去过一次波士顿。不喜欢。人太多，太闹腾。你家在那里吗？有特别的人等你吗？”\n下午的时间在缓慢地流逝。你觉得向西拉斯透露自己的新生活也没有什么坏处。\n“工作哈？你干哪行？”',

    info: '为你的角色起一个名字，把它记在自己的调查员角色卡上。你还可以加上你的年龄；对本冒险来说，你的角色年龄应当在23到36岁之间。',
    options: [
      {
        type: 'goto',
        text: '阿瑟·彭德尔顿（文物学家）',
        goto: '102',
        applyOccupation: 'antiquarian' as OccupationKey,
      },
      {
        type: 'goto',
        text: '埃莉诺·安斯沃思（医生）',
        goto: '226',
        applyOccupation: 'doctor' as OccupationKey,
      },
      {
        type: 'goto',
        text: '托马斯·莱利（记者）',
        goto: '239',
        applyOccupation: 'journalist' as OccupationKey,
      },
      {
        type: 'goto',
        text: '塞缪尔·斯佩德（私家侦探）',
        goto: '249',
        applyOccupation: 'privateInvestigator' as OccupationKey,
      },
      {
        type: 'goto',
        text: '伊芙琳·海耶斯（教授）',
        goto: '265',
        applyOccupation: 'professor' as OccupationKey,
      },
    ],
  },
  '72': {
    id: '72',
    story:
      '你一想到自己的行李箱还丢在山上，由一个24小时之前还素不相识的女人保管着的时候，就感到一阵自我怀疑。他们手上有你一切财物，只有你孑然一身站在这里。\n但你却觉得有一点点喜悦，尽管这次莽撞探险没有地图，也没有多少补给，夜色降临之时仍在继续前往未知的地方。你的生命第一次失去了庇护。这危险的自由带给你的无疑是快乐。',
    options: [{ type: 'goto', text: '继续', goto: '79' }],
  },
  '73': {
    id: '73',
    story: '你一下撞到地面上。肺里的空气直冲出你的喉咙，鲜血渗出你的头顶。',
    info: '如果你的耐久值已经归零，前往 92。否则，前往 82。',
    options: [
      {
        type: 'goto',
        text: '虽然伤势严重，但你咬牙坚持了下来',
        goto: '82',
        condition: {
          type: ConditionType.ALIVE,
          expectedValue: true,
        },
      },
      {
        type: 'goto',
        text: '你的伤势过于严重，已经回天乏术了【剧终】',
        goto: '92',
        condition: {
          type: ConditionType.ALIVE,
          expectedValue: false,
        },
      },
    ],
  },
  '74': {
    id: '74',
    story:
      '这里并没有单独记述本地历史的书籍，你只能从大量薄薄的专述卷册中拼凑出大概的模样。\n有些暗示表明，阿布纳基人，或者阿贝纳基人曾经将烬头村所在的山头当成祭祀场所。这个土著民族名字的意思是“黎明之地的人民”。这个民族每年“在树叶的颜色变成日落最浓的颜色时”会上山举行仪式。有些文章涉及到当地的太阳崇拜，但并没有可信的证据证明仪式属于太阳崇拜。\n后来此地卷入了乔治王战争（译注：1744—1748年英法争夺北美殖民地的战争），1746年英国殖民军在被瓦巴纳基联盟袭击后发动了反击，阿布纳基人也是攻击目标。英国人见人就杀，土著幸存者所剩无几，被永远驱离了这片地区。\n烬头村建立的时间没有确凿的记载，但独立战争之后不久山上就有人定居的记录了。',
    options: [{ type: 'goto', text: '继续', goto: '99' }],
  },
  '75': {
    id: '75',
    story:
      '当你说你打算出门散步时，梅皱起了眉头：“路上你要小心。烬头村四面都是悬崖，我们也没有你们城里那种贼亮的路灯。拿上这盏灯，注意脚下 。”\n你刚走出门，就知道了她说这话的含义。天空浓云密布，只有几缕黯淡的月光透过云层照下来。没有这把沉重的提灯，你就要彻底摸黑走路了。\n你没法靠今晚就了解村子的全貌。\n梅的家门口是一条被低矮阴暗的住宅包围的窄巷。但到了巷子出口，街道就宽敞多了。你的右方延伸出一条大街。一块简陋的牌子上写着街道的名字：“锡尔伯里街”。而在左边，顺着灯光可以看见歪歪扭扭的简易篱笆桩，篱笆桩后就看不见地面，只有一片黑暗。你走近了几步，可还是什么也看不见。下面的冷气吹拂着你的脸。这时，本能驱使你向四周张望。',
    options: [{ type: 'goto', text: '继续', goto: '86' }],
  },
  '76': {
    id: '76',
    story:
      '这种粉末散发的独特气味，令你联想到以前你的一位老教授做过的关于危险草药的演示实验。虽然原料可能不只一种，但你相当肯定这种粉末含有莨菪，具有催眠和致幻的作用。\n你扑灭了这一小堆粉末，把它分散撒到壁炉的各处。',
    info: '你可以在自己「科学(植物学)」技能左边的小方框里打勾。',
    effects: [
      {
        type: EffectType.MARK_SKILL_SUCCESS,
        target: SkillEnum.SCIENCE_BOTANY,
      },
    ],
    options: [
      {
        type: 'goto',
        text: '小睡一会',
        goto: '58',
      },
      {
        type: 'goto',
        text: '彻夜不眠',
        goto: '52',
      },
    ],
  },
  '77': {
    id: '77',
    story:
      '你在灯塔上被烧死了。\n为何不重新尝试呢？选择不同的选项，你也许就能逃脱甚至智胜烬头村的村民了。\n【剧终】',
    options: [{ type: 'goto', text: '游戏结束', goto: 'END' }],
  },
  '78': {
    id: '78',
    story:
      '你悄悄在烬头村巡回，在不引人注意的地方停下来观察村民们。天色尚早，这个时候的村庄却显得挺忙碌。村民打着呵欠沿路往返穿梭，把整束整束的薪柴搬到他们称作灯塔的地方。你看见已经有两个人影登上灯塔上层，正在整理薪柴。\n节日的篝火是最引人注目的。但你打算要留在这里看篝火吗？你现在怀疑这里有什么不对劲。\n村民们正忙于其他事，所以你可以做一些秘密的调查。你也可以毫不留恋，直接出村。\n现在你可以：',
    options: [
      { type: 'goto', text: '搜索梅·莱德贝特的卧室', goto: '83' },
      { type: 'goto', text: '独自前往村会堂', goto: '126' },
      { type: 'goto', text: '仔细勘查工匠的工坊', goto: '219' },
      { type: 'goto', text: '窥探灯塔前的活动', goto: '29' },
      { type: 'goto', text: '沿东盘山路下山，溜之大吉', goto: '7' },
    ],
  },
  '79': {
    id: '79',
    story:
      '你回到道路上，继续向东走。至少，你希望自己仍然在向东走。道路的转弯使人难以辨认方向，而且天色也渐渐暗下来，云彩遮住了星光。\n看起来天黑之前你无法抵达下个村庄了，而且你的腿脚也已经疲劳。空气已经带上了凉意。',
    options: [
      {
        type: 'check',
        text: '忽然你的耳朵似乎捕捉到了一些细微的声音',
        check: {
          details: {
            object: 'skill',
            subObject: SkillEnum.LISTEN,
            difficulty: CheckDifficulty.HARD,
          },
          onSuccessSceneId: '240',
          onFailureSceneId: '234',
          successText: '你刚刚的确实听到了什么。',
          failureText: '你摇摇头，也许刚刚是你的错觉。',
        },
      },
    ],
  },
  '80': {
    id: '80',
    story:
      '你清清嗓子，开始吟诵你在奇怪书本上找到的仪式，尽力将怪异的音节念得正确。你的脸上翻腾着热浪，明白火焰越来越逼近，但你放下自己的恐慌，集中精力完成吟唱。\n当你说出这些奇怪的字眼时，你发现村民的歌唱改变了，他们也在吟诵咒语。你的内心一震。\n他们发的声音和你毫无二致！\n火焰爬上你的衣服，你疼痛难忍，苦状万分。你抬头想探出无情的火焰，这一瞬看到的东西使你忘记了自己的痛苦。因为群星自身在坠落——\n它们从天而降，像雨点一样落到烬头村。\n朦胧中你感觉村民又开始吟诵另外一段咒语。但你的身体已经猛烈燃烧起来，有那么一瞬间，你觉得自己也化作了星辰。尔后，一切都融入白炽之中。\n你在灯塔上被烧死了。\n为何不重新尝试呢？选择不同的选项，你也也许就能逃脱甚至智胜烬头村的村民了。\n【剧终】',
    options: [{ type: 'goto', text: '游戏结束', goto: 'END' }],
  },
}
