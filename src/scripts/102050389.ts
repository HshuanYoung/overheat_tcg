import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050389
 * Card2 Row: 596
 * Card Row: 479
 * Source CardNo: BT08-R03
 * Package: BT08(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{你的回合开始时}[舍弃1张<伊列宇王国>的手牌]:晋升（将这个单位送入墓地。之后，将你的卡组或手牌中的1张ACCESS值比这个单位的ACCESS值多1的单位卡放置到战场上）。
 * 【启】〖1回合1次〗{这个单位由于晋升进入战场的回合中，选择战场上的1张非神蚀卡}[〖+2〗]:将被选择的卡破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050389',
  fullName: '战场的红蔷薇',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '伊列宇王国',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
