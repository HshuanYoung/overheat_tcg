import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 202000113
 * Card2 Row: 589
 * Card Row: 473
 * Source CardNo: BT07-01R
 * Package: PR(2017年3月)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 选择下列的1项效果执行：
 * ◆[舍弃1张手牌]：本回合中，对手的卡的效果将要将他墓地中的卡放置到卡组时，改为将那些卡放逐。之后，给予对手被放逐的卡的数量的伤害。
 * ◆[舍弃1张红色手牌]：将你墓地中的1张〖力量2500〗以下的红色非神蚀单位卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '202000113',
  fullName: '雪的幻想',
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
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: 'PR',
  uniqueId: null as any,
};

export default card;
