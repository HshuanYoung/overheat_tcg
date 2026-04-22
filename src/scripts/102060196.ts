import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102060196
 * Card2 Row: 215
 * Card Row: 215
 * Source CardNo: BT03-R07
 * Package: BT03(SR,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:〖力量4500〗以上的这个单位获得【速攻】【歼灭】【神依】。
 * 【诱】〖1回合1次〗:你的单位被战斗破坏时，本回合中，这个单位〖伤害+1〗〖力量+500〗。0
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102060196',
  fullName: '雷霆女帝「塔米」',
  specialName: '塔米',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '雷霆',
  acValue: 4,
  power: 3000,
  basePower: 3000,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  isAnnihilation: true,
  isShenyi: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR', 'SER'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
