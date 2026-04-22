import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110444
 * Card2 Row: 324
 * Card Row: 563
 * Source CardNo: BT04-Y03
 * Package: BT04(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：这个单位与神蚀单位进行战斗时，这次战斗中，这个单位不会被破坏，〖伤害+3〗并获得【歼灭】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110444',
  fullName: '钢兵的巨人',
  specialName: '',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: {},
  faction: '学院要塞',
  acValue: 3,
  power: 3500,
  basePower: 3500,
  damage: 2,
  baseDamage: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isAnnihilation: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
