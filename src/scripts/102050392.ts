import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050392
 * Card2 Row: 599
 * Card Row: 483
 * Source CardNo: BT08-R06
 * Package: BT08(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】{这个单位由于晋升进入战场}:你的战场上的所有单位可以攻击对手的单位。
 * 【启】{展示手牌中的这张卡，选择你战场上的1个非神蚀单位}[舍弃这张卡以外的1张红色手牌]:本回合中，被选择的单位可以攻击对手的单位。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050392',
  fullName: '千剑长「库里姆森」',
  specialName: '库里姆森',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '伊列宇王国',
  acValue: 5,
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
  availableRarities: ['SER'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
