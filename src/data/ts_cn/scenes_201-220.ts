import type { SceneData } from '../../interface/Scene'
import {
  CheckObjectKey,
  EffectType,
  CheckDifficulty,
  ConditionType, // Re-added
} from '../../constant/enums'

export const scenes_201_220: SceneData = {
  '201': {
    id: '201',
    story:
      '熊退后几步，漆黑的眼珠直瞪着你。它从喉咙深处发出低沉的咕哝声，转头蹒跚返回了树林。\n不管怎样，你已经在和熊的搏斗当中活了下来。你可以在你的「格斗(斗殴)」技能左边的小方框里打勾。如果熊击伤了你，你还可以尝试进行一次「急救」检定，若成功可以回复1点耐久值。',
    options: [
      {
        type: 'check',
        text: '（如果受伤）尝试「急救」检定',
        condition: {
          type: ConditionType.FLAG_SET,
          gameFlag: 'IS_INJURED',
          expectedValue: true,
        }, // Placeholder condition
        effects: [
          {
            type: EffectType.MARK_SKILL_SUCCESS,
            target: CheckObjectKey.FIGHTING_BRAWL,
          },
        ],
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.FIRST_AID,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '79',
          onFailureSceneId: '79',
          successText: '急救成功',
          failureText: '急救失败',
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
        text: '（如果未受伤或不急救）继续',
        goto: '79',
        effects: [
          {
            type: EffectType.MARK_SKILL_SUCCESS,
            target: CheckObjectKey.FIGHTING_BRAWL,
          },
        ],
      },
    ],
  },
  // S201_AID_CHECK removed
  '202': {
    id: '202',
    story:
      '你试着把“号令天之火”的字词记到脑海里。这篇文字里尽是些奇怪的字眼，至于它们的发音你只能按最靠谱的猜测来。整篇咒语需要大概二十秒来朗读。注释里提供了一些建议：“当其热中取水之时，万不可直视其火。欲行其道则务须身心俱入，以免自误于审判之中.”\n你发现了一个秘密。如果情形适宜，这段文字可以提供你施法的机会。到那时，如果你想尝试这个仪式，在你所在的条目号上加50，前往对应的条目。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '207',
        effects: [
          {
            type: EffectType.SET_FLAG,
            gameFlag: 'LEARNED_SPELL_COMMAND_FIRE_FROM_SKY',
            flagValue: true,
          },
        ],
      },
    ],
  },
  '203': {
    id: '203',
    story:
      '有什么东西砸中了你的太阳穴，打得你晕头转向。你听到阿博加斯特的呼喊，看到刀刃的寒光：一刀、两刀、三刀，刀锋染上了殷红的鲜血。又有什么东西击中了你，在你倒下的时候，火焰从地上燃起，将夜空照得通亮。火光照出了三个黑影......\n（你）受到1D6点伤害。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '45',
        effects: [{ type: EffectType.CHANGE_HP, value: '-1D6' }],
      },
    ],
  },
  '204': {
    id: '204',
    story:
      '屋顶如你所愿向袭击者倾倒过去。它猛撞到地面上，把他们从视野中遮蔽了。你附近的空气翻腾起大量烟尘。你没法仔细辨认情况，但你可以听见苦痛的哀号。而且，不止一声。\n坍塌使得石墙上裂了个口子。你用精巧的动作挤出了教堂。\n村民从四面八方往教堂赶来。你匍匐爬到墓碑之间，靠茂盛的杂草掩盖身形，向路口挪去。哨兵也加入了教堂的人群，所以你能沿着东盘山路逃走。',
    options: [{ type: 'goto', text: '继续', goto: '152' }],
  },
  '205': {
    id: '205',
    story:
      '外面越来越暗，你的小牢房也变黑了。你可以听到房子四周的各种声音，偶尔还会有橘黄的光芒掠过小窗。束缚之下你唯一舒适的姿势可能就是坐在床头，让手臂自然悬垂。\n你需要集中精力想个办法，想要挣脱束缚明显是不可能了。你搞不明白他们抓住你想要做什么，但有件事你无法忽略——他们用一整天的时间架起了一堆巨大的篝火。',
    options: [{ type: 'goto', text: '继续', goto: '27' }],
  },
  '206': {
    id: '206',
    story:
      '他那肿胀的嘴唇向上歪了一点点。“哎呀？你从哪儿听说这里的？”\n你含糊其辞地向他描述了报纸上的一篇报道。\n“我不读报这么长时间，报纸真的变了.”\n他的语调里带着些你不喜欢的东西。',
    options: [{ type: 'goto', text: '继续', goto: '221' }],
  },
  '207': {
    id: '207',
    story:
      '你非常想拿走这本书，但它太大了根本无法裹藏。你把它推回架子里，将书架滑回原位。\n马上你就听到会堂大门传来钥匙划动的声音。你冲向打开的窗户。',
    options: [
      {
        type: 'check',
        text: '进行“敏捷”检定',
        check: {
          details: {
            object: 'characteristic',
            subObject: CheckObjectKey.DEX,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '213',
          onFailureSceneId: '190',
          successText: '进行“敏捷”检定（成功）',
          failureText: '进行“敏捷”检定（失败）',
        },
      },
    ],
  },
  '208': {
    id: '208',
    story:
      '这带着回响的嗥叫再次响起，这次有什么离你更近的东西在呼应着嗥叫。看起来现在是个逃离地面的好机会。\n你找到一棵有明显立足点的树，选了大概两人高的一个坚实枝杈。你慢慢挪动上去，可你的衣服并不适合爬树。',
    options: [
      {
        type: 'check',
        text: '进行「攀爬」检定',
        check: {
          details: {
            object: 'skill',
            subObject: CheckObjectKey.CLIMB,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '228',
          onFailureSceneId: '222', // PDF: 96 or higher is fumble to 222. Normal fail also to 222.
          successText: '进行「攀爬」检定（成功）',
          failureText: '进行「攀爬」检定（失败，若96+则为大失败）',
        },
      },
    ],
  },
  '209': {
    id: '209',
    story:
      '群星活了过来。它们从天上看见了你，身处熊熊大火的中心。它们也看见了由灯塔延伸出的烬头村，窄小的高地直面夜空。它们也听见村民开始吟诵你刚刚吟诵过的咒语。\n失去1D3点理智值。如果这使你的理智值归零，前往220。',
    options: [
      {
        type: 'goto',
        text: '号令群星返回原位',
        goto: '255',
        effects: [{ type: EffectType.CHANGE_SANITY, value: '-1D3' }], // Apply SAN loss before choice
        // TODO: Check for SAN zero in reducer
      },
      {
        type: 'goto',
        text: '号令群星放你解脱',
        goto: '243',
        effects: [{ type: EffectType.CHANGE_SANITY, value: '-1D3' }],
      },
      {
        type: 'goto',
        text: '号令群星烧尽村民',
        goto: '231',
        effects: [{ type: EffectType.CHANGE_SANITY, value: '-1D3' }],
      },
    ],
  },
  '210': {
    id: '210',
    story:
      '阿博加斯特用哽咽嘶哑的声音嚎叫着。他的手掌直指前方，手指扭曲成怪异的手势。\n火焰从他的脚下涌出，化作闪光的蓝色热浪。这火焰像流水般涌出，就如同沿着一束煤油在延烧，直朝两个攻击者而去。火苗饥渴地攀上了他们的衣服，啃噬着他们的皮肉，他们惊叫起来。\n阿博加斯特单膝跪了下去。火焰的光芒照亮了他惨白的脸。他的头向前倾着；尽管手上震颤不止，眼中却仍然靠着桀骜的意志迸发光芒。\n刺杀者尖叫着四散奔逃，所到之处怪异的光芒映射到屋墙上。转眼人就不见踪影，只余下皮肉烧焦的刺鼻恶臭。草地上还有些小火苗在舞动，但几秒钟后就消失了。阿博加斯特扑倒在地。',
    options: [{ type: 'goto', text: '继续', goto: '236' }],
  },
  '211': {
    id: '211',
    story:
      '你躲到你能找到最粗的树干后面。两匹马越来越近，马车的车夫举着提灯。马车所过之处，枝干投射出游移的阴影，像迷宫一般在你面前晃动。刹那间你看到了其中一个车夫的脸。他面目憔悴，神色紧张。然后他们一直向东离开了。\n当你确信再也听不到马车的声响时，就继续穿越树林赶路。看起来躲开大路要更加明智一些。\n你可以在「潜行」技能左边的小方框里打勾。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '223',
        effects: [
          {
            type: EffectType.MARK_SKILL_SUCCESS,
            target: CheckObjectKey.STEALTH,
          },
        ],
      },
    ],
  },
  '212': {
    id: '212',
    story:
      '你迫不及待地想现在就尝试这道阶梯。但你又想起西拉斯说过，他每星期只来烬头村两次，而且第二次来的时候很可能是往回开的。万一错过长途车，滞留在这里，你就有麻烦了。',
    options: [{ type: 'goto', text: '继续', goto: '192' }],
  },
  '213': {
    id: '213',
    story:
      '你猛然加速，疾速跑过村会堂；在听到大门打开的一瞬间，跳出了打开的窗户。你没有时间掩饰侵入的迹象，但你认为你还没被发现。',
    options: [{ type: 'goto', text: '继续', goto: '120' }],
  },
  '214': {
    id: '214',
    story:
      '他那肿胀的嘴唇向下歪了一点点。\n“王八蛋，烂到骨子里了.”他攥紧了拳头。',
    options: [{ type: 'goto', text: '继续', goto: '221' }],
  },
  '215': {
    id: '215',
    story:
      '虽然在黑暗中一直赶路听起来不怎样，但野兽聚集在树下盘算着杀了你，自己却在树上躲躲藏藏的主意更加让人不快。这条路迟早会领你到下一个村庄。你加快了步伐。',
    options: [{ type: 'goto', text: '继续', goto: '264' }],
  },
  '216': {
    id: '216',
    story:
      '你躲到你能找到最粗的树干后面。两匹马越来越近，马车的车夫举着提灯。马车所过之处，枝干投射出游移的阴影，像迷宫一般在你面前晃动。\n令你失望的是，一个车夫突然停住了他的马。\n“看！在那儿！”他用手指着你。',
    options: [
      { type: 'goto', text: '逃进树林', goto: '229' },
      { type: 'goto', text: '和车夫搏斗', goto: '235' },
    ],
  },
  '217': {
    id: '217',
    story:
      '突然有一张面孔逼近你，沾满血渍，还在熊熊燃烧。有人用利爪挠抓着你，撕扯着你的皮肉，他恐惧的眼中有火焰在跳动。你向后退缩——\n（你）失去1D3点理智值。失去1D2点耐久值。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '45',
        effects: [
          { type: EffectType.CHANGE_SANITY, value: '-1D3' },
          { type: EffectType.CHANGE_HP, value: '-1D2' },
        ],
      },
    ],
  },
  '218': {
    id: '218',
    story:
      '梅正在洗衣服，看到你回来了有点吃惊。“落下东西了？”当你解释了情况之后，她让你在寻找其他交通方式时，暂时把行李寄存下来。你卸下了重荷，十分感激。\n梅摸摸下巴，眯起双眼：“这村里没人有汽车。也许你能找到有马的人，还有马车装你的行李。我一会儿也四处问问。你可以试着去问村会堂的文特斯先生，他会知道谁愿意借的。或者问问那些工匠。他们的工坊在锡尔伯里街左边第一个门.”\n她凑过来握住你的双手，“不要担心，不管你有没有钱，我都不会让你睡在马路上的.”\n你谢过梅，转头面向村子。',
    options: [{ type: 'goto', text: '继续', goto: '6' }],
  },
  '219': {
    id: '219',
    story:
      '你靠近烬头村西北角房子的后面。早上的这个时候你预计工匠的工坊里会有人活动，但那些工作台和铁砧前都根本没有人在工作，只有周围的墙壁在反射你脚步的回声。\n有一间工坊关着门，挂着锁。你从门缝往里窥探，但什么也看不见。',
    options: [
      { type: 'goto', text: '尝试撬开挂锁', goto: '225' },
      { type: 'goto', text: '暴力闯入这间上锁的工坊', goto: '232' },
      { type: 'goto', text: '移动到其他地方', goto: '120' },
    ],
  },
  '220': {
    id: '220',
    story:
      '你终于彻悟，你在地球上的存在只不过是个假象，因为你从来都是一颗星星；你隐藏身形行走在人群之中，收敛着自己的光和热，怕把他们统统烧焦。你微笑着直视天空。\n你在灯塔上被烧死了！\n为何不重新尝试呢？选择不同的选项，你也也许就能逃脱甚至智胜烬头村的村民了。\n【剧终】',
    options: [{ type: 'goto', text: '游戏结束', goto: 'END' }],
  },
}
