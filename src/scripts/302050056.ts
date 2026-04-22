import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 302050056
 * Card2 Row: 502
 * Card Row: 432
 * Source CardNo: BT06-R10
 * Package: BT06(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】{这张卡进入战场时，选择对手场上的1个非神蚀单位}：只要这张卡在战场上，被选择的单位不能横置。
 * 【启】{这个能力只能由对手在他的主要阶段中发动}[将他自己的卡组顶的3张卡送入墓地]：将这张卡破坏。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '302050056',
  fullName: '「禁足」',
  specialName: '禁足',
  type: 'ITEM',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '伊列宇王国',
  acValue: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
