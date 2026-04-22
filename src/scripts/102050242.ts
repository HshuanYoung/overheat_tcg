import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050242
 * Card2 Row: 411
 * Card Row: 281
 * Source CardNo: BT05-R05
 * Package: BT05(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 诱】〖同名1回合1次〗{这个单位进入战场时}:你可以选择手牌中的1张ACCESS值+3以下的具有【菲晶】的单位卡，将其放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050242',
  fullName: '沙普城的骑兵队',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: {},
  faction: '伊列宇王国',
  acValue: 4,
  power: 3500,
  basePower: 3500,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: true,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
