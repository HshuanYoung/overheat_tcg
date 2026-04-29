import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104020337
 * Card2 Row: 462
 * Card Row: 397
 * Source CardNo: BT06-B03
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】财富1（只要这个单位在战场上，你获得1个财富指示物）。
 * 【启】〖同名1回合1次〗{你的财富指示物3个以上，对手宣言使用非神蚀卡时 }（舍弃三张手牌）：反击那张卡。之后，将那张卡加入你的手牌。被送去墓地时回到持有者的墓地
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104020337',
  fullName: '变装丽人「洛·李斯」',
  specialName: '洛·李斯',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '九尾商会联盟',
  acValue: 3,
  power: 1000,
  basePower: 1000,
  damage: 1,
  baseDamage: 1,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
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
