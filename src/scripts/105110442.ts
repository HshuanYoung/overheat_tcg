import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110442
 * Card2 Row: 322
 * Card Row: 561
 * Source CardNo: BT04-Y01
 * Package: BT04(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【永】：若你的战场上仅有1个神蚀单位，且那个单位的ACCESS值在+5以上，那个单位〖伤害+1〗〖力量+500〗。
 * 【诱】：这个单位从手牌进入战场时，若你的战场上仅有1个神蚀单位，查看你的卡组顶的3张卡。你从中选择1张卡，将其公开后，加入手牌。将其余的卡按原样放回，将你的卡组洗切。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110442',
  fullName: '水晶占卜师「史黛拉」',
  specialName: '史黛拉',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '学院要塞',
  acValue: 2,
  power: 1000,
  basePower: 1000,
  damage: 1,
  baseDamage: 1,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT04',
  uniqueId: null as any,
};

export default card;
