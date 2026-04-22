import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 204020122
 * Card2 Row: 633
 * Card Row: 517
 * Source CardNo: BT08-B07
 * Package: BT08(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 〖同名1回合1次〗{你的回合中，你的财富指示物有3个以上，选择下列的1项效果并执行}:
 * ◆将手牌抽到4张为止。
 * ◆{选择1名对手}[舍弃2张手牌]:恢复3（随机选择你的墓地中的3张卡，将其放置到你的卡组底）。将被选择的对手的卡组顶的3张卡送入墓地。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '204020122',
  fullName: '金钱美梦',
  specialName: '',
  type: 'STORY',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: {},
  faction: '九尾商会联盟',
  acValue: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
