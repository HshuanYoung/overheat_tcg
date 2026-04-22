import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104020338
 * Card2 Row: 463
 * Card Row: 398
 * Source CardNo: BT06-B04
 * Package: BT06(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】财富1（只要这个单位在战场上，你获得1个财富指示物）。
 * 【4-6】【启】〖同名1回合1次〗{你的主要阶段}：将你卡组或墓地中的1张《商队后勤》放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104020338',
  fullName: '往雪原的非晶商队',
  specialName: '',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '九尾商会联盟',
  acValue: 3,
  power: 1500,
  basePower: 1500,
  damage: 1,
  baseDamage: 1,
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
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
