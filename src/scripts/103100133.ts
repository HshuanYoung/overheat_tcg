import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103100133
 * Card2 Row: 111
 * Card Row: 111
 * Source CardNo: BT02-G05
 * Package: BT02(SR,ESR,OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗:[将你的战场上的X个非神蚀单位送入墓地]本回合中，这个单位〖伤害+X〗〖力量+X000〗。若X大于2，本回合中，这个单位获得【英勇】【歼灭】。
 * 〖10+〗【启】〖1回合1次〗:[〖侵蚀3〗]将你的墓地中的卡名含有《魔女》的非神蚀单位卡尽可能多地放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103100133',
  fullName: '黄昏的魔女「柯莉尔」',
  specialName: '柯莉尔',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '艾柯利普斯',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 1,
  baseDamage: 1,
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
  rarity: 'SR',
  availableRarities: ['SR', 'SER', 'UR'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
