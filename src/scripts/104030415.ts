import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 104030415
 * Card2 Row: 632
 * Card Row: 516
 * Source CardNo: BT08-B06
 * Package: BT08(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗[舍弃1张手牌]:将你战场上或墓地的1张<冒险家公会>的非神蚀单位卡放置到你的侵蚀区，之后，将侵蚀区中的那张卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '104030415',
  fullName: '龙之翼「艾伯特」',
  specialName: '艾伯特',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 2 },
  faction: '冒险家公会',
  acValue: 5,
  power: 3000,
  basePower: 3000,
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
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
