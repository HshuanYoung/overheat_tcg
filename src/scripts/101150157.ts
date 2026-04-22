import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101150157
 * Card2 Row: 147
 * Card Row: 147
 * Source CardNo: BT02-W07
 * Package: BT02(SR,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖1回合1次〗:这个单位宣言攻击或防御时，若你的侵蚀区中的背面卡在1张以下，选择你的侵蚀区的2张正面卡，将其放逐。之后，抽1张卡。
 * 〖0~3〗【永】:对手需要支付〖+1〗才能选择他自己的单位宣言攻击或防御。（若不支付，则不能进行这次宣言。）
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101150157',
  fullName: '苏醒的白龙「圣·斯诺」',
  specialName: '圣·斯诺',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '仙雪原',
  acValue: 4,
  power: 3500,
  basePower: 3500,
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
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
