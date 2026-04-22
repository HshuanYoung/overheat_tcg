import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 301000047
 * Card2 Row: 512
 * Card Row: 335
 * Source CardNo: PR06-10W
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：这张卡在任何区域均不具有颜色。这个能力不会失去，效果也不能被无效化。
 * 【永】{这张卡进入战场时，选择你战场上的1个单位并宣言1个颜色}：只要这张卡在战场上，被选择的单位不会成为对手的宣言颜色的卡的效果对象，或由于其效果从战场上离开。
 * 【诱】{这张卡从战场上离开时}：将这张卡放逐。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '301000047',
  fullName: '「菲之法典」',
  specialName: '菲之法典',
  type: 'ITEM',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 3,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: '特殊',
  uniqueId: null as any,
};

export default card;
