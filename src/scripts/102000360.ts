import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102000360
 * Card2 Row: 499
 * Card Row: 429
 * Source CardNo: BT06-R07
 * Package: BT06(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{这个单位进入战场时}[舍弃2张手牌]：你可以将你的手牌或卡组中的2张具有【菲晶】的非神蚀单位卡放置到战场上。
 * 【创痕2】【诱】{这个单位由于战斗或对手的卡的效果从战场上离开时，选择战场上的1张卡}：将被选择的卡破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102000360',
  fullName: '司雷福的驯兽师',
  specialName: '',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '无',
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
  feijingMark: true,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
