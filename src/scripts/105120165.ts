import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105120165
 * Card2 Row: 163
 * Card Row: 163
 * Source CardNo: BT02-Y06
 * Package: BT02(C),ST04(TD)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖同名1回合1次〗:这个单位由于卡名含有《炼金》的卡的效果从卡组进入战场时，选择对手的1个单位，直到下一次对手的回合结束时为止，获得“【永】:这个单位在可以宣言攻击时，你必须进入战斗阶段并选择这个单位宣言攻击。（优先于你在主要阶段中的其他行动）”的能力。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105120165',
  fullName: '炼金兽 丽人花',
  specialName: '',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: {},
  faction: '永生之乡',
  acValue: 2,
  power: 2000,
  basePower: 2000,
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
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT02,ST04',
  uniqueId: null as any,
};

export default card;
