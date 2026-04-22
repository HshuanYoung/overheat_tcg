import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102070358
 * Card2 Row: 497
 * Card Row: 427
 * Source CardNo: BT06-R05
 * Package: BT06(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】{你的战场上的这个单位将要被破坏时}：你可以破坏你场上的1个《异界狂蝠》作为代替。
 * 【诱】〖1回合1次〗{对手战场上的单位被破坏送入墓地时}：你可以将那个单位放逐。之后，将你的卡组或墓地中的1张《异界狂蝠》放置到战场上。
 * 【启】〖1回合1次〗{这个单位由于卡名含有《神仪》的卡的效果进入战场的回合中，选择战场上的1个非神蚀单位}：将被选择的单位破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102070358',
  fullName: '神秘女子「贝缇丝」',
  specialName: '贝缇丝',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '忒碧拉之门',
  acValue: 5,
  power: 3500,
  basePower: 3500,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
