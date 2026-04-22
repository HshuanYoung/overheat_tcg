import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110160
 * Card2 Row: 158
 * Card Row: 158
 * Source CardNo: BT02-Y01
 * Package: BT02(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:所有的卡失去所有〖A〗能力。
 * 【永】:若对手处于女神化状态，这个单位不会被破坏，也不会受到对手的所有卡的效果影响。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110160',
  fullName: '狂妄的科学论者「玛特」',
  specialName: '玛特',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '学院要塞',
  acValue: 1,
  power: 0,
  basePower: 0,
  damage: 0,
  baseDamage: 0,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
