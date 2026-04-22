import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050394
 * Card2 Row: 604
 * Card Row: 488
 * Source CardNo: BT08-R11
 * Package: BT08(OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗{这个单位由于晋升能力进入战场的回合中，选择下列的1项效果并执行}[舍弃1张<伊列宇王国>的手牌]:
 * ◆{选择战场上最多2张非神蚀卡}:将选择的卡破坏。
 * ◆【创痕3】{选择战场上的1张神蚀卡}:将选择的卡破坏。
 * 〖4~7〗【永】:这个单位〖伤害+1〗〖力量+500〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050394',
  fullName: '赤艳一闪「安德莉亚」',
  specialName: '安德莉亚',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '伊列宇王国',
  acValue: 4,
  power: 3500,
  basePower: 3500,
  damage: 2,
  baseDamage: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'UR',
  availableRarities: ['UR'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
