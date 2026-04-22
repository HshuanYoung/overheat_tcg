import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105110351
 * Card2 Row: 485
 * Card Row: 418
 * Source CardNo: BT06-Y04
 * Package: BT06(SR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【英勇】
 * 【诱】〖同名1回合1次〗{这个单位由于卡名含有《蓝图》的卡的效果进入战场时，选择战场上1张非神蚀卡}:将被选择的卡破坏。
 * 【启】〖同名1回合1次〗{选择你战场上的1张道具卡或具有【菲晶】的单位}:将被选择的卡破坏。之后，本回合中，这个单位〖力量+1000〗并获得【歼灭】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '105110351',
  fullName: '钢兵·「瓦尔基里」',
  specialName: '瓦尔基里',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '学院要塞',
  acValue: 4,
  power: 3000,
  basePower: 3000,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  isAnnihilation: true,
  isHeroic: true,
  canAttack: true,
  feijingMark: true,
  canResetCount: 0,
  effects: [],
  rarity: 'SR',
  availableRarities: ['SR'],
  cardPackage: 'BT06',
  uniqueId: null as any,
};

export default card;
