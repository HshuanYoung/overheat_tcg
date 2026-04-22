import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103080315
 * Card2 Row: 549
 * Card Row: 369
 * Source CardNo: BT07-G05
 * Package: BT07(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】唤醒（〖1回合1次〗{你的主要阶段，选择你的战场上的1个单位}:本回合中，被选择的单位〖力量+1000〗。回合结束时，将其放置到你的卡组底）。
 * 【诱】〖1回合1次〗{你的单位由于卡的效果从战场上放置到卡组时，选择你墓地中的1张非神蚀单位卡}[舍弃1张手牌]:将被选择的单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103080315',
  fullName: '兽神之白玉「雪兔」',
  specialName: '雪兔',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '神木森',
  acValue: 3,
  power: 2000,
  basePower: 2000,
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
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
