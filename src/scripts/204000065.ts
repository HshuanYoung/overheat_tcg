import { Card } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';

const card: Card = {
  id: '204000065',
  fullName: '百濑的剑舞',
  specialName: '',
  type: 'STORY',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '无',
  acValue: 3,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [
    {
      id: 'sword_dance_activate',
      type: 'ACTIVATE',
      triggerLocation: ['PLAY'],
      description: '【对付】：只能在有从战场返回的单位的回合发动。将战场上所有AC2及以下的单位返回持有者手牌。',
      condition: (gameState, playerState) => {
        return !!playerState.hasUnitReturnedThisTurn;
      },
      execute: async (card, gameState) => {
        const targets = Object.values(gameState.players).flatMap(player =>
          player.unitZone
            .filter((unit): unit is Card => !!unit && (unit.acValue || 0) <= 2)
            .map(unit => ({ ownerUid: player.uid, unit }))
        );

        for (const { ownerUid, unit } of targets) {
          await AtomicEffectExecutor.execute(gameState, ownerUid, {
            type: 'MOVE_FROM_FIELD',
            targetFilter: { gamecardId: unit.gamecardId },
            destinationZone: 'HAND'
          }, card);
        }

        gameState.logs.push(`[百濑的剑舞] 效果发动，将 ${targets.length} 个 AC2 及以下的单位返回持有者手牌。`);
      }
    }
  ],
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
