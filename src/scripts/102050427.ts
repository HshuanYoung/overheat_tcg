import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050427
 * Card2 Row: 302
 * Card Row: 541
 * Source CardNo: BT04-R01
 * Package: BT04(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：若你的战场上仅有1个神蚀单位，且那个单位的ACCESS值在+5以上，那个单位〖伤害+1〗〖力量+500〗并获得【速攻】。
 * 【启】〖一回合一次〗：[从你的手牌，卡组，墓地放逐合计两张「赛利亚」]这个能力只能在你的主要阶段发动。选择对手的最多两个〖力量2000〗以下的单位，本回合中，那些单位不能宣言防御。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050427',
  fullName: '绯烨姬「赛利亚」',
  specialName: '赛利亚',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '伊列宇王国',
  acValue: 2,
  power: 1000,
  basePower: 1000,
  damage: 1,
  baseDamage: 1,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
