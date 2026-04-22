import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102070359
 * Card2 Row: 498
 * Card Row: 428
 * Source CardNo: BT06-R06
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【歼灭】
 * 【永】：这张卡只能通过这张卡的【启】能力进入战场。战场上的这个单位不会成为对手的ACCESS值+4以下的卡的效果的对象，或由于其效果从场上离开。
 * 【启】[将你场上1个由于卡名含有《神仪》的卡的效果放置到战场上的「贝缇丝」单位放逐]：将手牌中的这张卡放置到战场上。之后，将你的卡组或墓地中任意数量的《异界狂蝠》放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102070359',
  fullName: '撕裂的恐惧「巨蝠」',
  specialName: '巨蝠',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 5 },
  faction: '忒碧拉之门',
  acValue: 9,
  power: 4000,
  basePower: 4000,
  damage: 4,
  baseDamage: 4,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isAnnihilation: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
