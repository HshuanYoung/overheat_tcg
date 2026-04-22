import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 201000138
 * Card2 Row: 239
 * Card Row: 595
 * Source CardNo: BT03-W14
 * Package: BT03(U)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 依据你的放逐区的卡的数量，执行下列效果（满足条件时每项都执行）:
 * ◆5张以上:选择1名玩家，选择他墓地中的3张卡放逐。
 * ◆10张以上:所有玩家选择他自己的侵蚀区中的1张背面卡，将其放逐。
 * ◆15张以上:选择1名玩家，选择他墓地中的《净化》以外的5张卡，放置到他自己的卡组底。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '201000138',
  fullName: '净化',
  specialName: '',
  type: 'STORY',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '无',
  acValue: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'U',
  availableRarities: ['U'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
