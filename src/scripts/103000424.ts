import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000424
 * Card2 Row: 293
 * Card Row: 533
 * Source CardNo: BT04-G02
 * Package: BT04(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】：[〖侵蚀1〗]这个单位参与攻击的战斗中，这个单位被战斗破坏时，选择对手的一个非神蚀单位，直到对手的回合结束时为止，你得到其控制权。只要你控制着那个单位，那个单位同时也视为卡名含有《魔女》的单位。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103000424',
  fullName: '黄昏之灵',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 2,
  power: 0,
  basePower: 0,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
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
