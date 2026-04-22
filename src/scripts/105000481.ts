import { Card, GameState, PlayerState, CardEffect } from '../types/game';

const omni_effect: CardEffect = {
  id: '105000481_omni',
  type: 'CONTINUOUS',
  description: '【永续】此卡在单位区、侵蚀区，可作为任意颜色的卡牌使用。作为颜色满足条件时，一次只能作为一种颜色。',
  triggerLocation: ['UNIT', 'EROSION_FRONT'],
  applyContinuous: (gameState: GameState, card: Card) => {
    // This is a marker effect handled by ServerGameService.canPlayCard
  }
};

const card: Card = {
  id: '105000481',
  fullName: '摇篮的少女',
  specialName: '摇篮的少女',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: {},
  faction: '无',
  acValue: 2,
  power: 0,
  basePower: 0,
  damage: 0,
  baseDamage: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [omni_effect],
  rarity: 'PR',
  availableRarities: ['PR'],
  cardPackage: '特殊',
  uniqueId: null,
};

export default card;
