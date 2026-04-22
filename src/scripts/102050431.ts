import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050431
 * Card2 Row: 306
 * Card Row: 545
 * Source CardNo: BT04-R05
 * Package: BT04(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:你的回合中，由于这张卡的【诱】能力的效果进入战场的这个单位〖伤害+1〗〖力量+2000〗并获得【速攻】【歼灭】。
 * 〖10+〗【诱】:你的回合中，你由于你的卡的效果的伤害而进入女神化状态时，你可以将这张卡从手牌放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050431',
  fullName: '血焰的枪骑士',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: {},
  faction: '伊列宇王国',
  acValue: 3,
  power: 2000,
  basePower: 2000,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  isAnnihilation: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
