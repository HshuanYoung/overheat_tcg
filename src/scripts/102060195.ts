import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102060195
 * Card2 Row: 214
 * Card Row: 214
 * Source CardNo: BT03-R06
 * Package: BT03(SR,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】:对手的单位被破坏时，本回合中，你的所有单位〖力量+500〗。（复数单位被同时破坏时只诱发1次）
 * 〖10+〗【诱】:战场上的单位被破坏时，选择1名对手，给予他1点伤害。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102060195',
  fullName: '炎雷的噬魂师「蕾」',
  specialName: '蕾',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '雷霆',
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
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR', 'SER'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
