import { Card } from '../types/game';

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 102050145
 * Card2 Row: 129
 * Card Row: 129
 * Source CardNo: BT02-R06
 * Package: BT02(SR,ESR,OHR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1回合1次〗:选择你的1个单位，将其送入墓地。之后，选择1名玩家，给予他1点伤害。直到下一次你的回合开始时为止，失去这个【启】能力。
 * 〖10+〗【启】:选择1名对手，给予他3点伤害。若这次伤害未能使对手败北，则你败北。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '102050145',
  fullName: '血焰督军「凯萨琳」',
  specialName: '凯萨琳',
  type: 'UNIT',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 2 },
  faction: '伊列宇王国',
  acValue: 3,
  power: 2500,
  basePower: 2500,
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
  availableRarities: ['SR', 'SER', 'UR'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
