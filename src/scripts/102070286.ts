import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102070286
 * Card2 Row: 504
 * Card Row: 328
 * Source CardNo: PR06-01R
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【速攻】
 * 【永】：墓地或战场上的这张卡的卡名也视作《异界狂蝠》。
 * 【诱】{你的单位对对手造成战斗伤害时}：本回合中，对手的非神蚀单位不能防御你的《异界狂蝠》的攻击。（其他联军可以被防御时无效）
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102070286',
  fullName: '微型嗜血狂蝠',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: {},
  faction: '忒碧拉之门',
  acValue: 1,
  power: 500,
  basePower: 500,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: '特殊',
  uniqueId: null as any,
};

export default card;
