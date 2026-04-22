import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105000228
 * Card2 Row: 392
 * Card Row: 262
 * Source CardNo: BT05-Y06
 * Package: BT05(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【速攻】
 * 【诱】{这个单位宣言攻击时}:对手可以选择他的1张手牌舍弃。若不舍弃，这次战斗中，对手不能选择单位宣言防御。
 * 【诱】{这个单位对对手造成战斗伤害时}:你可以将你的卡组中的1张卡名含有《怪盗》的卡加入手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105000228',
  fullName: '偷天的大怪盗「追月」',
  specialName: '追月',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
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
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
