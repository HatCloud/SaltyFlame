import type { SceneData } from '../../interface/Scene'
import {
  EffectType,
  CoreCharacteristicEnum,
  SkillEnum,
  CheckDifficulty,
} from '../../constant/enums'
import { GameFlag } from '../../constant/GameFlags'

export const scenes_041_060: SceneData = {
  '41': {
    id: '41',
    story:
      '你犹豫不决。你是在镇子里长大的，只熟悉城里。你可从来没和野生动物打过交道。独自走进未知的树林是不是不太明智呢？',
    options: [
      { type: 'goto', text: '决意前行', goto: '54' },
      { type: 'goto', text: '回到烬头村确保安全', goto: '47' },
    ],
  },
  '42': {
    id: '42',
    story:
      '泥土随着你的踩踏下陷，石头从断崖边缘崩落。你小心翼翼地扶住墙壁，慢慢前行。最后你终于找到了一个观察灯塔的好位置。',
    options: [{ type: 'goto', text: '继续', goto: '61' }],
  },
  '43': {
    id: '43',
    story:
      '你走进标着“私用”的门。村会堂的这一边和公用空间形成了鲜明的对比。房间布置非常紧凑，书架和文件柜整齐地排成几排。有一个角落留作小型的食品储藏处，可能同时还兼作盥洗室。\n在文特斯先生填满咖啡壶时，你上下审视了他一番。他的头发虽然稀薄，却打了头油，仔细地梳成背头。他的外套简朴素雅，纵然样式有点过时，但做工着实精良。换作其他人独自工作的话，可能早就图个舒服解开蝴蝶领结了。\n在对面墙边的桌子上，你发现了像是电报机的装置。',
    options: [
      { type: 'goto', text: '立即询问电报的事', goto: '56' },
      { type: 'goto', text: '先和文特斯先生先聊聊', goto: '49' },
    ],
  },
  '44': {
    id: '44',
    story:
      '你已经精疲力竭，你的肉体本应无从撼动黑铁打造的锁链。但你感觉到它们松动了一点点。这铁链的其中一节有弱点。',
    options: [
      {
        type: 'check',
        text: '进行困难“力量”检定', // Text for the option itself
        check: {
          details: {
            object: 'characteristic',
            subObject: CoreCharacteristicEnum.STR,
            difficulty: CheckDifficulty.HARD,
          },
          onSuccessSceneId: '53',
          onFailureSceneId: '40',
          successText: '进行困难“力量”检定（成功）',
          failureText: '进行困难“力量”检定（失败）',
        },
      },
    ],
  },
  '45': {
    id: '45',
    story:
      '你一个激灵醒了过来，手上和毯子角力，随时准备攻击——\n莱德贝特家的客房寂静无声，洒满晨光。这里除了你，根本没有其他人。你放开毯子，等着砰砰乱跳的心脏逐渐平复。',
    options: [{ type: 'goto', text: '继续', goto: '64' }],
  },
  '46': {
    id: '46',
    story:
      '这里面充斥着泥土和发霉的气息。但你察觉到一缕与之不同的气息：是马的气味。你四下里搜寻，在阴暗的角落里找到了残留的蹄印，还有些干燥的马粪。这座废弃的教堂曾经被用作马棚——而且还是不久之前。这些马现在去了哪里？',
    options: [{ type: 'goto', text: '继续', goto: '25' }],
  },
  '47': {
    id: '47',
    story:
      '又有一阵呼啸响起，回应着前一阵呼啸。你想象自己在林子里被群狼逼入绝境，扑倒在地，衣不蔽体，皮开肉绽；狼王踱到你的面前，尖牙闪着寒光，对你垂涎三尺。它无情的大嘴直取你的喉咙——\n回村的路好像比出村时长得多。你尽量不去回头看走过的路。在你上坡时，日头渐渐下沉。你的时间还够，还可以去村会堂碰运气。',
    options: [{ type: 'goto', text: '继续', goto: '11' }],
  },
  '48': {
    id: '48',
    story:
      '你挥动手臂，手指紧紧地握住了屋墙上的一处凸起。你依靠它支撑全身的重量，直到脚再次触碰到坚固的地面才松开手。\n你向下张望，断崖大概有二十英尺深。你差点就没命了。\n你可以在「攀爬」技能左边的小方框里打勾。然后前往 61。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '61',
        effects: [
          { type: EffectType.MARK_SKILL_SUCCESS, target: SkillEnum.CLIMB },
        ],
      },
    ],
  },
  '49': {
    id: '49',
    story:
      '咖啡壶开始咕噜噜地响起来，你和文特斯先生互相说着客套话。\n“住在这里吗？这是一种交易，和生活中的其他东西一样。”他的视线落在你身后的高架子上。“我当然也希望能拥有真正的图书馆。但是我也有自知之明。我不过是个半吊子。而城里......”他的脸嫌恶地皱了皱。“人太多了。人人都在跑，在嚷。我们烬头村这个地方得天独厚，必须有人负起责任来维护它。以前我父亲就这么做的，现在这责任落到我头上了。”他抬抬下颏，端正了坐姿。\n“今天晚上，夕阳落山时，出去看看村子四周的美景吧。我们和平地住在这片地方，正处在群星之路的中途。我们不是荣幸之至吗？这难道值不上我们要忍受的艰辛吗？”\n他若有所思地看着你。现在是个问电报的好时机。',
    options: [{ type: 'goto', text: '询问电报的事', goto: '56' }],
  },
  '50': {
    id: '50',
    story:
      '当你回忆阿博加斯特的咒语时，火焰在逐渐逼近。脚下的热量在累积，你难以整理思绪。你不断地咳嗽，几乎说不出一句完整的话，但你并没有停止诵读。最终你读到了最重要的一节，即便你的衣服已经烧着，你仍连呼三遍：\nPh’nglui mglw’nafh Cthugha Fomalhaut \nn’ghaghaa naf ’l thagn! Iä! Cthugha!',
    options: [{ type: 'goto', text: '继续', goto: '270' }],
  },
  '51': {
    id: '51',
    story:
      '随着时间流逝，梅的话语多少有些变成了疲累的游览指导，你听起来感觉有些好笑。\n“当然了，如果天气好，这里的景色真的相当壮观。每个方向的视野都清晰无阻。如果你是画家，你会感觉像回了家一样。如果你的口味更喜欢工艺品，锡尔伯里街上还有工坊。走到头右转就是了。他们不是为了游客干活的，你懂吧？但你可以看见真正在工作的工匠。真正的独具匠心。然后，如果你想吃新鲜出炉的面包......”\n你觉得不好意思去说自己不久还要继续上路。你让梅继续讲下去，直到她打起呵欠。\n“你还要听我瞎唠吗？不早了，我该睡觉了。你想几点钟吃早饭？”',
    options: [{ type: 'goto', text: '继续', goto: '63' }],
  },
  '52': {
    id: '52',
    story:
      '你瞪着窗外，看太阳从地平线升起，给村子笼罩上病态的橙色。这一夜格外漫长，你身体僵硬、心烦意乱，不停地搓着眼睛。\n几分钟以后，你听到梅在厨房忙碌，还有前门打开又关上的声音。\n进行一次“体质”检定。如果你失败了，今天你的技能检定受到一颗惩罚骰。额外投一颗十位骰，分别计算结果后取最高值。这不影响幸运、理智和伤害检定。',
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
          onSuccessSceneId: '64',
          onFailureSceneId: '64', // Goes to 64 in both cases, but failure applies an effect
          successText: '体质检定成功',
          failureText: '体质检定失败 (有惩罚骰)',
          onFailureEffects: [
            {
              type: EffectType.SET_FLAG,
              gameFlag: GameFlag.PENALTY_DICE_TODAY,
              flagValue: true,
            },
          ],
        },
      },
    ],
  },
  '53': {
    id: '53',
    story:
      '当火舌跳动着，沿着薪柴向你靠近时，你紧闭双眼，一下下拽着链子。它又松动了一点点，然后——啪嚓！铁链的一角掉了下去。即使火焰正在烧焦你的脚踝，你仍然在捆链里蠕动，挣松束缚。\n高台上的人盯着你的动作。然后他从人群中喊出两个年轻人，用手直指向你。\n你刚刚抖落铁链，从铁架上获得自由，两个年轻人就登上了炽热的平台。火焰蔓延上他们的裤子。当他们的披风开始起火时，他们一猛子扎入火中，向你扑来。',
    options: [
      {
        type: 'check',
        text: '进行困难“闪避”检定',
        check: {
          details: {
            object: 'skill',
            subObject: SkillEnum.DODGE,
            difficulty: CheckDifficulty.HARD,
          },
          onSuccessSceneId: '109',
          onFailureSceneId: '123',
          successText: '进行困难“闪避”检定（成功）',
          failureText: '进行困难“闪避”检定（失败）',
        },
      },
    ],
  },
  '54': {
    id: '54',
    story:
      '第二声嗥叫回应着前一声，但听起来距离远一些。你在树林中沿着道路穿行。两侧的树枝斜伸到路的上方。树叶的颜色颇为美丽，有金色，有棕褐色，还有鲜艳的深红色。落叶在你的脚下喀吱作响。\n大约半小时以后，你走出了树丛。道路懒洋洋地转了一个弯，绕过前面的山麓，进入另一片树林。有一条崎岖的小径，似乎是穿越树林的近道。',
    options: [
      { type: 'goto', text: '上山辨认别的村庄', goto: '60' },
      { type: 'goto', text: '尝试小径', goto: '85' },
      { type: 'goto', text: '继续沿着道路走确保安全', goto: '103' },
    ],
  },
  '55': {
    id: '55',
    story:
      '你弓身向上扑，寻找支撑点，手指在墙壁上乱抓。还没有一秒种的工夫，你再次下坠，结结实实地摔到了岩石地面上——\n你撞上地面时受到 2D6 点伤害。如果这次伤害的数值大于等于你最大耐久值的一半，前往 67。否则，前往 73。',
    // entryEffects removed. The damage effect should be part of the option leading to this state,
    // or if it's an unavoidable consequence of failing the climb check in scene 36,
    // it should be part of onFailureEffects of that check.
    // For now, assuming the text implies the player makes a choice AFTER damage is assessed.
    // This might require a special "conditional goto" based on HP, or a new scene to handle the HP check.
    // Simplified: options will just be gotos, damage is assumed to be applied by prior action.
    options: [
      {
        type: 'goto',
        text: '（若伤害 >= 最大HP一半）继续',
        goto: '67',
        // Condition for this option would be: HP <= MaxHP/2 after damage.
        // This needs a way to check current HP vs MaxHP/2.
        // For now, this will be a player-interpreted choice.
        // Effects: [{type: EffectType.CHANGE_HP, value: '-2D6'}] // Apply damage here if not before
      },
      {
        type: 'goto',
        text: '（若伤害 < 最大HP一半）继续',
        goto: '73',
        // Effects: [{type: EffectType.CHANGE_HP, value: '-2D6'}] // Apply damage here if not before
      },
      // The -2D6 damage should ideally be an effect on the *failure* of the climb check in scene 36.
      // If scene 36's climb check's onFailureSceneId was this scene (55), then
      // onFailureEffects of that check in scene 36 should include this -2D6 damage.
    ],
  },
  '56': {
    id: '56',
    story:
      '“电报？呣呣。虽然我们很珍惜自己的独立，但有时也需要联络......您想发消息吗？我得说声对不起。这条电报线已经坏了两个星期了。我已经报修了，但因为问题出在乡下，他们当然不会快到哪里去。我希望后天能有人来修。它对您造成的失望，我深表歉意。长途车应该，大概，三天以后到？但我觉得他会往西走。也许您能遇上辆马车？附近农民可能......”\n你解释说，你已经问过几个村民了，但完全没有用。\n文特斯给你倒上一杯冒着热气的咖啡。这杯深色热饮散发着醇厚的香气。“我跟您说，维修队来了以后我会叫他们把你捎走。这样行不行？他们也许会要一两美元的车马费......”\n后天？这可不太理想。不过你终于得到了一次真正的机会。',
    options: [
      { type: 'goto', text: '谢过文特斯先生并离开', goto: '180' },
      { type: 'goto', text: '询问他的藏书室', goto: '62' },
    ],
  },
  '57': {
    id: '57',
    story:
      '你沿着中央大街走着，这是三条大街居中的一条，朝着那奇怪的金属建筑物笔直而去。当你走出周围建筑物的阴影时，展现在你面前的是从北方一直延伸到东南方的壮丽全景。深秋的最后一抹色彩将山丘的轮廓染成睡意朦胧的金色。\n相比之下，这座建筑物则是用熟铁铸成，外面烤成漆黑。它上边是一个巨大的弧形平台，大致和你的头顶一般高。再上边的撑架蛇行汇聚到中心点。它们似乎在很久以前有某种雕刻，但现在已经扭曲熔化，早就无法辨识。\n一位老绅士走过，用一双红肿的老眼看着你。“你来参加节日的吗？”他问道。“这就是灯塔。明天晚上他们点亮它的时候，你在二十里外都能看得见。”他愉悦地点了点头，然后拄着手杖继续走他的路。\n你还发现建筑物的附近堆着许多成捆成捆的木头。也许这次节日会是一次有趣的消遣，但你真的应该尽快赶往阿卡姆了。',
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
          onSuccessSceneId: '69',
          onFailureSceneId: '25',
          successText: '进行「侦查」检定（成功）',
          failureText: '进行「侦查」检定（失败）',
        },
      },
    ],
  },
  '58': {
    id: '58',
    story:
      '你被房外街道上的脚步声吵醒了。一晚上的休息为你带来了新的目标。今天，你要凭借自己的努力面对烬头村。\n如果你受过伤，你可以回复 1 点耐久值。',
    options: [
      {
        type: 'goto',
        text: '继续',
        goto: '64',
        effects: [{ type: EffectType.CHANGE_HP, value: '+1' }], // TODO: Conditional logic for "if injured" needs to be handled by the reducer or a condition on the effect
      },
    ],
  },
  '59': {
    id: '59',
    story:
      '你被一阵绝望的叫喊惊醒了。你感觉自己从座位上往下滑，因为司机猛打方向盘，长途车跌出了路沿。太迟了，你撞上了前面的座位。你滚落到走道上，肋骨磕上对面座位的棱角。你大口喘着粗气。长途车发出一声闷响，停了下来。\n你的司机从座位上跳到了马路上。在你晕乎乎地趴在走道上的时候，你听见了一连串挑拨的咒骂。\n司机爬回车里，看到你趴在走道上。他看上去很担心，扶你坐回座位上。现在你才看到发生了什么事。一辆福特森拖拉机停在了路中央，你的司机刚才必须紧急转弯躲避这只铁皮拦路虎。\n“对不住，”他说，“两边都是地，他只能停路上。你没事吧？”\n你觉得自己没受什么大伤。可是，要有一块色彩斑斓的瘀伤在你身上留几天了。司机往后倒了倒车，绕开了拖拉机，对农民怒目而视。\n你在这次事件中损失了1点HP。在之后的旅程中你会有机会恢复HP，但恢复后的HP不会超过初始值。如果你的HP值归零，你就会失去意识，甚至死亡。',
    effects: [{ type: EffectType.CHANGE_HP, value: '-1' }],
    options: [
      {
        type: 'goto',
        text: '继续行程',
        goto: '71',
      },
    ],
  },
  '60': {
    id: '60',
    story:
      '平缓的坡度使人误入歧途，等于你抵达山顶的时候，额头都湿透了。你停了一会儿喘口气，又向东面望去。前方的山谷是郁郁葱葱的树林，不过你可以瞧见一条狭窄的水流。但仍旧没有村庄的迹象。地平线上似乎有什么东西——也许是座尖塔？但肯定又要走八九个小时才能到达。\n你回头看向烬头村。山顶的村庄漆黑一片，只有落日的余晖映衬出它的大概轮廓。',
    options: [
      {
        type: 'check',
        text: '进行「考古学」检定',
        check: {
          details: {
            object: 'skill',
            subObject: SkillEnum.ARCHAEOLOGY,
            difficulty: CheckDifficulty.NORMAL,
          },
          onSuccessSceneId: '66',
          onFailureSceneId: '72',
          successText: '进行「考古学」检定（成功）',
          failureText: '进行「考古学」检定（失败）',
        },
      },
    ],
  },
}
