import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105120352
 * Card2 Row: 486
 * Card Row: 419
 * Source CardNo: BT06-Y05
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{你的回合结束时，选择你战场上的2张以上的卡}：你可以将被选择的卡送去墓地。之后，将你卡组中的1张非神蚀卡放置到战场上，那张卡的所有效果直到下一次你的回合开始为止无效（不包括关键词效果）。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105120352',
  fullName: '憧憬的炼金「伊丽瑟薇」',
  specialName: '伊丽瑟薇',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '永生之乡',
  acValue: 3,
  power: 1500,
  basePower: 1500,
  damage: 1,
  baseDamage: 1,
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
