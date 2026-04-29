import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101150234
 * Card2 Row: 401
 * Card Row: 271
 * Source CardNo: BT05-W05
 * Package: BT05(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖同名1回合1次〗{你的回合中，你的放逐区中的卡有6张以上，其中包含《结界的冰封术士》，选择战场上的1个非神蚀单位}[〖支付2费，我方单位区有两个或以上的白色单位〗]:直到对手的回合结束时为止，将被选择的单位冻结（不能发动能力，不能宣言攻击和防御，也不会被破坏）。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101150234',
  fullName: '结界的冰封术士',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: {},
  faction: '仙雪原',
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
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
