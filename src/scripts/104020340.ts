import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104020340
 * Card2 Row: 465
 * Card Row: 400
 * Source CardNo: BT06-B06
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{你的回合结束时，选择你的侵蚀区中的1张非神蚀卡}（将你战场上的1个具有【菲晶】的单位破坏）：你可以将被选择的侵蚀区中的卡放置到战场上。
 * 【3-5】【启】〖同名一回合一次〗（舍弃手牌中1张具有【菲晶】的卡）：将你的卡组或侵蚀区中1张AC值+3以下的非神蚀道具卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104020340',
  fullName: '菲晶工匠「特特鲁」',
  specialName: '特特鲁',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '九尾商会联盟',
  acValue: 4,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: true,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
