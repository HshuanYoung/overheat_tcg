import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 101140397
 * Card2 Row: 607
 * Card Row: 491
 * Source CardNo: BT08-W03
 * Package: BT08(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕2】【启】{你的主要阶段}[将由于卡名含有《神仪》的卡的效果进入战场的这个单位送入墓地]:抽1张卡。选择下列的1项效果并执行:
 * ◆{选择对手战场上的1张神蚀卡}:将被选择的卡放逐。
 * ◆{选择对手战场上的最多2张非神蚀卡}:将被选择的卡放逐。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '101140397',
  fullName: '火焰连击「克里」',
  specialName: '克里',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 2 },
  faction: '女神教会',
  acValue: 5,
  power: 3500,
  basePower: 3500,
  damage: 3,
  baseDamage: 3,
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
  cardPackage: 'BT08',
  uniqueId: null as any,
};

export default card;
