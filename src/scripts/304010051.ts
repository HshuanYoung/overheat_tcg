import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 304010051
 * Card2 Row: 543
 * Card Row: 363
 * Source CardNo: BT07-B10
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【装备】
 * 【永】：装备单位〖伤害+1〗.
 * 【启】〖同名一回合一次〗{选择你战场上的1个<百濑之水城>的非神蚀卡或卡名含有《剑仙》的单位}[舍弃1张手牌]：将墓地或侵蚀区的正面卡中的这张卡放置到战场上并装备给被选择单位。这张卡从战场上离开时，将这张卡放逐。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '304010051',
  fullName: '「化剑仙境」',
  specialName: '化剑仙境',
  type: 'ITEM',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '百濑之水城',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
