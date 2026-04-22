import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104020336
 * Card2 Row: 461
 * Card Row: 396
 * Source CardNo: BT06-B02
 * Package: BT06(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖同名1回合1次〗{你的财富指示物3个以上，你选择1项效果并执行}：
 * ◆ {战斗自由步骤}（舍弃两张手牌）：这次战斗中，你的单位不会被战斗破坏。防止你将要受到的所有战斗伤害。
 * ◆ {选择一名对手}（舍弃两张手牌）：那名对手抽3张卡，之后，舍弃他自己的3张手牌。直到下一次你的回合开始为止，你的《商队交易专家》失去这项效果。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104020336',
  fullName: '商队交易专家',
  specialName: '',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '九尾商会联盟',
  acValue: 3,
  power: 1000,
  basePower: 1000,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
