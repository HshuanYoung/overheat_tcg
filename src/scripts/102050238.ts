import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050238
 * Card2 Row: 407
 * Card Row: 277
 * Source CardNo: BT05-R01
 * Package: BT05(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖同名1回合1次〗{你的<伊列宇王国>单位对对手造成伤害时，你可以选择1名对手}:给予他2点伤害。
 * 〖10+〗【启】〖同名1回合1次〗{你的主要阶段，你的战场上的<伊列宇王国>单位有4个以上}:选择对手的1个非神蚀单位，将其破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050238',
  fullName: '雌鹰「贝瑞塔」',
  specialName: '贝瑞塔',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '伊列宇王国',
  acValue: 3,
  power: 2500,
  basePower: 2500,
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
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
