import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103090180
 * Card2 Row: 193
 * Card Row: 193
 * Source CardNo: BT03-G02
 * Package: BT03(SR,ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】:[将你的战场上的X个单位横置]选择你的1个单位，本回合中〖伤害+X〗〖力量+X000〗。（X不能小于2）
 * 〖10+〗【启】〖1回合1次〗:[〖侵蚀3〗]选择你的墓地中的最多2张〖力量2000〗以下的<瑟诺布>单位卡，将其放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103090180',
  fullName: '链风者「萨利和」',
  specialName: '萨利和',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 2 },
  faction: '瑟诺布',
  acValue: 4,
  power: 2000,
  basePower: 2000,
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
  rarity: 'SR',
  availableRarities: ['SR', 'SER'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
