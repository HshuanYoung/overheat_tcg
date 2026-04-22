import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110386
 * Card2 Row: 588
 * Card Row: 472
 * Source CardNo: BT07-Y11
 * Package: BT07(OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{这个单位由于卡名含有《蓝图》的卡的效果进入战场时，选择下列的1项效果执行}：
 * ◆将对手战场上的所有非神蚀卡破坏。
 * ◆{选择战场上的1张神蚀卡}：将被选择的卡破坏。
 * 【创痕4】【永】：这个单位〖伤害+1〗〖力量+1000〗并获得【英勇】【歼灭】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110386',
  fullName: '「魔装人型防御机关」',
  specialName: '魔装人型防御机关',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 4 },
  faction: '学院要塞',
  acValue: 5,
  power: 4000,
  basePower: 4000,
  damage: 4,
  baseDamage: 4,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isAnnihilation: true,
  isHeroic: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'UR',
  availableRarities: ['UR'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
