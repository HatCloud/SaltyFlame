import { Item, Weapon } from '../interface/Character'

export const ItemBox: Record<string, { en: Item | Weapon; cn: Item | Weapon }> =
  {
    Knife: {
      en: {
        type: 'weapon',
        name: 'Knife',
        damage: '1d4+DB',
        description: 'A sharp knife suitable for close combat.',
      },
      cn: {
        type: 'weapon',
        name: '小刀',
        damage: '1d4+DB',
        description: '一把锋利的小刀，适合近战使用。',
      },
    },
    SecretPaper: {
      en: {
        type: 'item',
        name: 'Secret Paper',
        description: 'A piece of paper containing secret information.',
      },
      cn: {
        type: 'item',
        name: '秘密文件',
        description: '一张包含秘密信息的纸张。',
      },
    },
    Map: {
      en: {
        type: 'item',
        name: 'Map of Village',
        description: 'A detailed map of Jintou Village.',
      },
      cn: {
        type: 'item',
        name: '烬头村地图',
        description: '一张详细的烬头村地图。',
      },
    },
    AzatothBook: {
      en: {
        type: 'item',
        name: 'The Book of Azathoth and Others',
      },
      cn: {
        type: 'item',
        name: '《阿撒托斯及其他》',
      },
    },
    SpellCommandFireFromSky: {
      en: {
        type: 'item',
        name: 'Spell: Command Fire from the Sky',
        description:
          'A spell that allows the caster to command fire from the sky.',
      },
      cn: {
        type: 'item',
        name: '咒语：号令天之火',
        description: '一个允许施法者号令天火的咒语。',
      },
    },
    SpellSummonFireFromSky: {
      en: {
        type: 'item',
        name: 'Spell: Summon Fire from the Sky',
        description:
          'A spell that allows the caster to summon fire from the sky.',
      },
      cn: {
        type: 'item',
        name: '咒语：召唤天之火',
        description: '一个允许施法者召唤天火的咒语。',
      },
    },
    AbogastChant: {
      en: {
        type: 'item',
        name: "Abogast's Chant",
        description: 'A chant taught by Abogast that has mysterious powers.',
      },
      cn: {
        type: 'item',
        name: '阿博加斯特的咒语',
        description: '阿博加斯特教的一个具有神秘力量的咒语。',
      },
    },
  }
