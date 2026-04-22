import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105000384
 * Card2 Row: 581
 * Card Row: 465
 * Source CardNo: BT07-Y04
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：卡名含有《炼金》的卡的效果将战场上的这个单位送入墓地时，这个单位视作具备所有颜色。
 * 【诱】{这张卡由于卡的效果送去墓地时}[〖+2〗]:将你卡组或墓地中的1张《永生石》加入手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105000384',
  fullName: '永生原石',
  specialName: '',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 1,
  power: 0,
  basePower: 0,
  damage: 0,
  baseDamage: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
