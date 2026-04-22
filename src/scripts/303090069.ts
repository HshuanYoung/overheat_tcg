import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 303090069
 * Card2 Row: 646
 * Card Row: 528
 * Source CardNo: BT08-G09
 * Package: BT08(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】{你的主要阶段}[〖横置〗]:将你的卡组中的2张卡名含有《银乐》且卡名各不同的卡送入墓地。
 * 【诱】{共鸣能力将你的墓地中的这张卡放逐时}[舍弃1张手牌]:将你墓地中的1张ACCESS值+3以下的<瑟诺布>卡加入手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '303090069',
  fullName: '银乐器大提琴',
  specialName: '',
  type: 'ITEM',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '瑟诺布',
  acValue: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
