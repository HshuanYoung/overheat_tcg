import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000188
 * Card2 Row: 201
 * Card Row: 201
 * Source CardNo: BT03-G10
 * Package: BT03(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】:这个单位参与战斗的战斗自由步骤开始时，本回合中，参与这次战斗的对手的所有单位获得“【诱】:回合结束时，将这个单位破坏。”的能力。
 * 〖10+〗【诱】:这个单位给予对手战斗伤害时，选择那名玩家的侵蚀区中的2张正面卡，将其〖翻面〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103000188',
  fullName: '紫间之痕「叶西妮娅」',
  specialName: '叶西妮娅',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '无',
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
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
