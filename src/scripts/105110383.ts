import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110383
 * Card2 Row: 580
 * Card Row: 464
 * Source CardNo: BT07-Y03
 * Package: BT07(ESR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗{你的主要阶段}[将你卡组顶的1张卡背面放逐]:公开你卡组顶的2张卡，你可以从中选择1张卡名含有《蓝图》或《魔偶》的非神蚀卡，将其放置到战场上。其余的卡按原样放回。（放逐区中的背面卡可以被其持有者确认）
 * 【创痕3】【永】：这个单位〖伤害+2〗〖力量+1500〗，获得【英勇】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110383',
  fullName: '学院魔偶师「斯蒂芬妮」',
  specialName: '斯蒂芬妮',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 2 },
  faction: '学院要塞',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isHeroic: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [],
  rarity: 'SER',
  availableRarities: ['SER'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
