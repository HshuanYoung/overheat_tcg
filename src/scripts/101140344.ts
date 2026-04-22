import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101140344
 * Card2 Row: 474
 * Card Row: 407
 * Source CardNo: BT06-W04
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖同名1回合1次〗{这个单位由于战斗或卡的效果从战场上离开时}[将你墓地中2张神蚀卡放逐]：抽1张卡，将这张卡以横置状态放置到战场上。
 * 〖10+〗【启】{你的战场上有「特特鲁」或「萨拉拉」的单位}[将这个单位放逐]：本回合中，防止你将要受到的所有伤害。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101140344',
  fullName: '教会修士「克里」',
  specialName: '克里',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '女神教会',
  acValue: 3,
  power: 2500,
  basePower: 2500,
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
  availableRarities: ['SR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
