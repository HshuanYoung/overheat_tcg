import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104010416
 * Card2 Row: 637
 * Card Row: 521
 * Source CardNo: BT08-B11
 * Package: BT08(OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】{这个单位装备着道具卡时}:这个单位〖力量+1000〗并获得【英勇】。
 * 〖1~4〗【启】{若这张卡在手牌}[〖+0:蓝蓝〗，舍弃手牌中的1张卡名含有《剑仙》的卡]:将手牌中的这张卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104010416',
  fullName: '四方剑仙「东方」',
  specialName: '东方',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 2 },
  faction: '百濑之水城',
  acValue: 4,
  power: 3000,
  basePower: 3000,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isHeroic: true,
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
