import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 304020050
 * Card2 Row: 542
 * Card Row: 362
 * Source CardNo: BT07-B09
 * Package: BT07(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】：{这张卡由于对手的卡的效果从战场上离开时}：将你的墓地或侵蚀区的正面卡中数量最多与这张卡从战场离开前你拥有的财富指示物数量相同的<九尾商会联盟>的单位卡放置到战场上。
 * 【3-6】【诱】：{你的蓝色单位进入战场时，选择其中1个单位 }［横置］：被选择的单位获得“【永】：财富1”的能力。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '304020050',
  fullName: '「白尾之家」',
  specialName: '白尾之家',
  type: 'ITEM',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '九尾商会联盟',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
