import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101150236
 * Card2 Row: 403
 * Card Row: 273
 * Source CardNo: BT05-W07
 * Package: BT05(ESR,OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】{这个单位参与的战斗中}[将你的侵蚀区中的2张正面卡放逐]:本回合中，这个单位不会被战斗破坏。
 * 〖0~3〗【启】〖同名1回合1次〗{战斗自由步骤中，你的放逐区中的卡有15张以上}:直到对手的回合结束时为止，将这次战斗中的所有参战单位冻结（不能发动能力，不能宣言攻击和防御，也不会被破坏）。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101150236',
  fullName: '圣境霜华「欧若拉」',
  specialName: '欧若拉',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '仙雪原',
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
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SER',
  availableRarities: ['SER', 'UR'],
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
