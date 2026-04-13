import { Card, GameState, PlayerState, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';

const card: Card = {
  id: '10402023',
  fullName: '牛头人的守城部队',
  specialName: '',
  type: 'UNIT',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '九尾商会联盟',
  acValue: 3,
  power: 2000,
  basePower: 2000,
  damage: 2,
  baseDamage: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [
    {
      id: 'minotaur_defense_force_activate',
      type: 'ACTIVATE',
      limitCount: 1,
      limitNameType: true,
      triggerLocation: ['UNIT'],
      description: '【同名回合1次】：你单位区中每有1个名字名字包含「牛头人」的单位，在本回合中力量值+500。',
      condition: (gameState, playerState) => {
        return true;
      },
      execute: (card, gameState, playerState) => {
        const minotaurCount = playerState.unitZone.filter(u =>
          u !== null && u.fullName.includes('牛头人')
        ).length;

        const bonus = minotaurCount * 500;
        card.temporaryPowerBuff = (card.temporaryPowerBuff || 0) + bonus;

        gameState.logs.push(`[牛头人的守城部队] 效果生效：当前单位区有 ${minotaurCount} 个牛头人，力量值增加了 ${bonus}。`);
      }
    }
  ],
  rarity: 'C',
  availableRarities: ['C'],
  uniqueId: null as any,
};

export default card;
