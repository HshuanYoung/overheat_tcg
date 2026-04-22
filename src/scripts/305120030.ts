import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 305120030
 * Card2 Row: 174
 * Card Row: 174
 * Source CardNo: BT02-Y17
 * Package: BT02(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】:[舍弃1张黄色手牌，〖横置〗]这个能力只能在你的主要阶段中发动。将你的战场上的1个单位送入墓地。之后，选择你的卡组中的1张与那个单位颜色相同的、ACCESS值比那个单位的ACCESS值多1的单位卡，将其放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '305120030',
  fullName: '「永生炼金釜」',
  specialName: '永生炼金釜',
  type: 'ITEM',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '永生之乡',
  acValue: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
