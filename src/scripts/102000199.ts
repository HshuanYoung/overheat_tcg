import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102000199
 * Card2 Row: 218
 * Card Row: 218
 * Source CardNo: BT03-R10
 * Package: BT03(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:这个单位只能以横置的状态进入战场。你的回合开始阶段中，这个单位不能〖重置〗。
 * 【永】:这个单位以外的你的所有参与攻击的单位在那次战斗中，力量上升与这个单位的力量值相同的数值。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102000199',
  fullName: '翻云的舞蹈家「亚迪拉」',
  specialName: '亚迪拉',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '无',
  acValue: 2,
  power: 500,
  basePower: 500,
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
  availableRarities: ['R', 'SER'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
