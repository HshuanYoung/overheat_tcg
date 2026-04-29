import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103090330
 * Card2 Row: 452
 * Card Row: 387
 * Source CardNo: BT06-G04
 * Package: BT06(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】｛这个单位进入战场时｝[舍弃1张手牌]：你可以将你的卡组中的1张具有共鸣或【菲晶】的单位卡加入手牌。
 * 【创痕1】【诱】{共鸣能力将你的墓地中的卡名含有《银乐器》的卡放逐时，选择1名玩家}：将被选择的玩家的卡组顶的2张卡送入墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103090330',
  fullName: '「聚居地陷阱师」',
  specialName: '聚居地陷阱师',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '瑟诺布',
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
