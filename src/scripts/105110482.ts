import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110482
 * Card2 Row: 270
 * Card Row: 626
 * Source CardNo: PR01-02Y
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:若你的战场上的道具卡有2张以上的话，这个单位〖伤害+1〗〖力量+1000〗。
 * 【启】〖1回合1次〗:你的主要阶段中才可以发动，且不能用于对抗。支付ACCESS值来使用你的侵蚀区中的1张道具卡。
 * 【启】〖1回合1次〗:你的回合中才可以发动。公开你的卡组顶的1张卡，将那张卡放置到卡组顶或卡组底。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110482',
  fullName: '辅助官「希克」pr',
  specialName: '希克',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '学院要塞',
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
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: '特殊',
  uniqueId: null as any,
};

export default card;
