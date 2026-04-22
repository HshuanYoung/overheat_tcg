import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 301000078
 * Card2 Row: 242
 * Card Row: 598
 * Source CardNo: BT03-W17
 * Package: BT03(U)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【装备】（〖1回合1次〗你的主要阶段中，你可以选择你的1个单位装备这张卡，或者解除这张卡的装备状态。）
 * 【永】:装备单位被破坏时，你可以将这张卡送入墓地作为代替。
 * 【诱】:这张卡被破坏并送入墓地时，选择你的墓地中的2张卡，将其放置到卡组底。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '301000078',
  fullName: '天使之翼',
  specialName: '',
  type: 'ITEM',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '无',
  acValue: 2,
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
