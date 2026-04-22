import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104020310
 * Card2 Row: 544
 * Card Row: 364
 * Source CardNo: BT07-B11
 * Package: BT07(OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】财富1（只要这个单位在战场上，你获得1个财富指示物）。
 * 【诱】{这张卡从手牌送去墓地时}[0：蓝]：将墓地中的这张单位卡放置到战场上。
 * 【3-6】【永】{你的财富指示物3个以上}：你战场上所有的非神蚀单位〖力量+1000〗，获得【英勇】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104020310',
  fullName: '九尾金狐「科萨珂」',
  specialName: '科萨珂',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 2 },
  faction: '九尾商会联盟',
  acValue: 3,
  power: 2000,
  basePower: 2000,
  damage: 1,
  baseDamage: 1,
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
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
