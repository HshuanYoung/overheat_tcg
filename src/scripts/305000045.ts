import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305000045
 * Card2 Row: 510
 * Card Row: 333
 * Source CardNo: PR06-08Y
 * Package: 特殊(PR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【装备】
 * 〖3-5〗【诱】{装备单位由于战斗或对手的卡效果破坏送入墓地时}：将你的卡组中的1张与那个单位卡颜色相同，ACCESS值比那个单位的ACCESS值少1的非神蚀卡放置到战场上。之后，破坏这张卡。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305000045',
  fullName: '「群蝠披风」',
  specialName: '群蝠披风',
  type: 'ITEM',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
  acValue: 2,
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
