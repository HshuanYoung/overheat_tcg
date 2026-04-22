import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 301130060
 * Card2 Row: 576
 * Card Row: 460
 * Source CardNo: BT07-W10
 * Package: BT07(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖同名1回合1次〗{你的主要阶段}[舍弃1张手牌]：将你的卡组中的1张ACCESS值+3以下的<圣王国>非神蚀单位卡放置到战场上。
 * 【3-6】【永】{你的战场上的<圣王国>单位有3个以上，你的单位将要被对手的卡的效果破坏时}：你可以将重置状态的这张卡横置作为代替。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '301130060',
  fullName: '暮城兵营',
  specialName: '',
  type: 'ITEM',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '圣王国',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
