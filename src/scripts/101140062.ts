import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101140062
 * Card2 Row: 3
 * Card Row: 3
 * Source CardNo: ST01-W03
 * Package: ST01(TD)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:你的战场上每有1个单位，手牌中的这张卡的ACCESS值便减少1。（最低降到〖0:白〗）
 * 【永，A0-3】这个单位〖伤害+1〗〖力量+500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101140062',
  fullName: '受祝福的少女骑士',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '女神教会',
  acValue: 3,
  power: 1500,
  basePower: 1500,
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
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'ST01',
  uniqueId: null as any,
};

export default card;
