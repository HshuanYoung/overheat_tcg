import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 204000098
 * Card2 Row: 468
 * Card Row: 402
 * Source CardNo: BT06-B09
 * Package: BT06(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * {你的财富指示物有3个以上，选择下列的1项效果并执行，直到下一次你的回合开始时为止，你的《阿克蒂的记录》失去那项效果}：
 * ◆ 恢复2（随机将你墓地中的2张卡，将其放置到你的卡组底）。之后，抽2张卡。
 * ◆ 将你的侵蚀区中的1张非神蚀卡放置到战场上。
 * ◆ 对手抽3张卡，之后，舍弃他自己的3张手牌。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '204000098',
  fullName: '阿克蒂的记录',
  specialName: '',
  type: 'STORY',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 2,
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
