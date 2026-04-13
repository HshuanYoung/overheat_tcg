import { Card, GameState, PlayerState, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';

const card: Card = {
  id: '20403022',
  fullName: '张贴委托',
  specialName: '',
  type: 'STORY',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '冒险家工会',
  acValue: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [
    {
      id: 'post_commission_activate',
      type: 'ACTIVATE',
      limitCount: 1,
      limitNameType: true,
      description: '【同名回合1次】只能在你的主要阶段发动。在本回合发动过这个效果的回合，你只能打出「冒险家工会」的卡牌，以及发动「冒险家工会」卡牌的效果。选择你的2张卡正面向上的摆放进入侵蚀区，随后抽3张卡。',
      condition: (gameState, playerState) => {
        if (gameState.phase !== 'MAIN') return false;
        
        // Faction History Check: Must not have used any other faction this turn
        if (playerState.factionsUsedThisTurn && playerState.factionsUsedThisTurn.length > 0) {
          if (playerState.factionsUsedThisTurn.some(f => f !== '冒险家工会')) {
            return false;
          }
        }

        // Must have at least 2 hand cards (excluding this one which is in PLAY)
        return playerState.hand.length >= 2;
      },
      execute: (card, gameState, playerState) => {
        // 1. Set Faction Lock
        playerState.factionLock = '冒险家工会';
        gameState.logs.push(`[张贴委托] 效果生效：本回合进入「冒险家工会」派系限制状态。`);

        // 2. Selection options from Hand only
        const handOptions = playerState.hand.map(c => ({ card: c, source: 'HAND' as any }));

        gameState.pendingQuery = {
          id: Math.random().toString(36).substring(7),
          type: 'SELECT_CARD',
          playerUid: playerState.uid,
          options: AtomicEffectExecutor.enrichQueryOptions(gameState, playerState.uid, handOptions),
          title: '选择手牌',
          description: '效果结算：请选择你的 2 张手牌送入侵蚀区。',
          minSelections: 2,
          maxSelections: 2,
          callbackKey: 'EFFECT_RESOLVE',
          context: { sourceCardId: card.gamecardId, effectIndex: 0 }
        };
      },
      onQueryResolve: (card, gameState, playerState, selections, context) => {
        if (!selections || selections.length !== 2) return;

        // 3. Move selected hand cards to Erosion Zone
        selections.forEach(targetId => {
          AtomicEffectExecutor.execute(gameState, playerState.uid, {
            type: 'MOVE_FROM_HAND',
            targetFilter: { gamecardId: targetId },
            destinationZone: 'EROSION_FRONT',
            displayState: 'FRONT_UPRIGHT'
          }, card);
        });

        // 4. Draw 3 cards
        AtomicEffectExecutor.execute(gameState, playerState.uid, {
          type: 'DRAW',
          count: 3
        }, card);

        gameState.logs.push(`[张贴委托] 已将 2 张卡送入侵蚀区正位，并抽取了 3 张卡。`);
      }
    }
  ],
  rarity: 'C',
  availableRarities: ['C'],
  uniqueId: null as any,
};

export default card;
