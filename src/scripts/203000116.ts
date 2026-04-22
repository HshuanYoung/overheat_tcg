import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 203000116
 * Card2 Row: 593
 * Card Row: 476
 * Source CardNo: BT07-05G
 * Package: PR(2017年3月)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择下列的1项效果执行：
 * ◆[舍弃1张手牌]：本回合中，你的单位将要被对手的卡的效果破坏时，防止那次破坏。之后，你可以抽2张卡。
 * ◆{选择战场上的1个单位}[舍弃1张绿色手牌]：被选择的单位本回合中〖力量+500〗，获得歼灭。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '203000116',
  fullName: '传达的思念',
  specialName: '',
  type: 'STORY',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: 'PR',
  uniqueId: null as any,
};

export default card;
