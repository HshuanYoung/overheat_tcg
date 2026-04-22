import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102060369
 * Card2 Row: 559
 * Card Row: 443
 * Source CardNo: BT07-R04
 * Package: BT07(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】【噬魂】（〖1回合1次〗{你的主要阶段}[将这个单位以外的你的战场上的1个非神蚀单位送入墓地]：本回合中你的所有单位〖力量+500〗）。
 * 【永】：〖力量值3500〗以上的这个单位〖伤害+1〗并获得【速攻】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102060369',
  fullName: '炎雷的战士',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: {},
  faction: '雷霆',
  acValue: 3,
  power: 2000,
  basePower: 2000,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
