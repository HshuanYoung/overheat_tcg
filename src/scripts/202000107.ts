import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 202000107
 * Card2 Row: 563
 * Card Row: 447
 * Source CardNo: BT07-R08
 * Package: BT07(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择下列的1项效果并执行:
 * ◆[舍弃1张手牌]:本回合中，你的单位由于对手的单位的效果被放逐时，将那个对手的单位破坏。之后，你可以抽2张卡。
 * ◆｛选择战场上的1个单位｝[舍弃1张红色手牌]：被选择的单位本回合中〖伤害+2〗。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '202000107',
  fullName: '献祭',
  specialName: '',
  type: 'STORY',
  color: 'RED',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 0,
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
