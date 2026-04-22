import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105000353
 * Card2 Row: 487
 * Card Row: 420
 * Source CardNo: BT06-Y06
 * Package: BT06(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{这个单位由于卡名含有《炼金》的卡的效果从卡组进入战场时}[将你墓地中的1张本回合由于卡名含有《炼金》的卡的效果送入墓地且具有【菲晶】的单位卡放逐]：这个单位变为〖力量3000〗。
 * 【诱】〖同名1回合1次〗{这个单位由于卡的效果从卡组进入战场时}：将你卡组中的1张《炼金晶片妖》以横置的状态放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105000353',
  fullName: '炼金晶片妖',
  specialName: '',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 2,
  power: 500,
  basePower: 500,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: true,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
