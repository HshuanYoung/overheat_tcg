import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 204000115
 * Card2 Row: 592
 * Card Row: 475
 * Source CardNo: BT07-04B
 * Package: PR(2017年3月)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择下列的1项效果执行：
 * ◆[舍弃1张手牌]：本回合中，对手的卡的效果将对手的单位放置到战场上时，将那些单位横置，本回合中，失去所有能力。之后，你可以抽2张卡。
 * ◆[舍弃1张蓝色手牌]：本回合中，你的蓝色单位可以攻击对手的单位。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '204000115',
  fullName: '深海幻想',
  specialName: '',
  type: 'STORY',
  color: 'BLUE',
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
