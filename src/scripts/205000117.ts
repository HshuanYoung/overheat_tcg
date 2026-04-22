import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 205000117
 * Card2 Row: 591
 * Card Row: 481
 * Source CardNo: BT07-03Y
 * Package: PR(2017年3月)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * {选择对手墓地中的1张非神蚀卡，选择下列的1项效果执行}：
 * ◆[舍弃1张手牌]：对手将他卡组中的被选择的卡的同名卡全部送入墓地。
 * ◆【创痕2】[舍弃1张黄色手牌]：对手将他的卡组、手牌、墓地中的被选择的卡的同名卡全部放逐。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '205000117',
  fullName: '异界幻想',
  specialName: '',
  type: 'STORY',
  color: 'YELLOW',
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
