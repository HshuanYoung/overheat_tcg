import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110350
 * Card2 Row: 484
 * Card Row: 417
 * Source CardNo: BT06-Y03
 * Package: BT06(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：你的战场上的具有【菲晶】的单位不会成为对手的卡的能力的效果对象。
 * 【创痕2】（你的侵蚀区中的背面卡有2张以上时才有效）【启】{你的主要阶段}[〖横置〗]：将你的手牌中或卡组中的1张具有【菲晶】的单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110350',
  fullName: '商队随从「希克」',
  specialName: '希克',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '学院要塞',
  acValue: 3,
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
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
