import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102060244
 * Card2 Row: 413
 * Card Row: 283
 * Source CardNo: BT05-R07
 * Package: BT05(ESR,OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】:处理将你的单位的力量值上升的卡的效果时，那个上升的数值+500。
 * 〖10+〗【启】〖1游戏1次〗{你的主要阶段，你的战场上的<雷霆>单位有5个以上}:本回合中，你的所有<雷霆>单位〖伤害+1〗〖力量+500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102060244',
  fullName: '炎雷的增幅师「拉法」',
  specialName: '拉法',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '雷霆',
  acValue: 3,
  power: 3000,
  basePower: 3000,
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
  cardPackage: 'BT05',
  uniqueId: null as any,
};

export default card;
