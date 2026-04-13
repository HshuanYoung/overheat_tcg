import { Card, GameState, PlayerState, CardEffect, TriggerLocation, GameEvent } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';

const effect_10400038_trigger: CardEffect = {
  id: 'vaer_entry_trigger',
  type: 'TRIGGER',
  triggerType: 'CARD_ENTERED_ZONE',
  description: '【诱发】当此单位从手牌进入对战区时：选择一名玩家，该玩家抽两张卡。之后，若我方侵蚀区域背面卡牌在2张或以上，选择一名玩家将其下一次抽卡阶段跳过。',
  condition: (gameState: GameState, playerState: PlayerState, instance: Card, event?: GameEvent) => {
    return event?.type === 'CARD_ENTERED_ZONE' && 
           event.sourceCardId === instance.gamecardId && 
           event.destinationZone === 'UNIT' && 
           event.fromZone === 'HAND';
  },
  execute: async (gameState: GameState, playerState: PlayerState, instance: Card) => {
    // 1. Select player to draw 2
    const players = Object.values(gameState.players);
    gameState.pendingQuery = {
      id: Math.random().toString(36).substring(7),
      type: 'SELECT_CARD', // Reusing select player logic via PLAYER_SELF/OPPONENT IDs
      playerUid: playerState.uid,
      options: [
        { card: { gamecardId: 'PLAYER_SELF', fullName: '自己' } as any, source: 'UNIT' as TriggerLocation },
        { card: { gamecardId: 'PLAYER_OPPONENT', fullName: '对手' } as any, source: 'UNIT' as TriggerLocation }
      ],
      title: '选择抽卡玩家',
      description: '请选择一名玩家抽两张卡。',
      minSelections: 1,
      maxSelections: 1,
      callbackKey: 'EFFECT_RESOLVE',
      context: {
        effectId: 'vaer_entry_trigger',
        sourceCardId: instance.gamecardId,
        step: 'DRAW'
      }
    };
  },
  onQueryResolve: (instance: Card, gameState: GameState, playerState: PlayerState, selections: string[], context: any) => {
    if (context.step === 'DRAW' && selections.length > 0) {
      const selectedId = selections[0];
      const targetUid = selectedId === 'PLAYER_SELF' ? playerState.uid : gameState.playerIds.find(id => id !== playerState.uid)!;
      
      // Execute Draw 2
      AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'DRAW', value: 2, targetFilter: { owner: targetUid === playerState.uid ? 'SELF' : 'OPPONENT' } }, instance);
      gameState.logs.push(`[${instance.fullName}] 的效果使玩家抽了两张卡。`);

      // 2. Conditional: Skip Draw Phase
      const backCount = playerState.erosionBack.filter(c => c !== null).length;
      if (backCount >= 2) {
        // Query again for skip target
        gameState.pendingQuery = {
          id: Math.random().toString(36).substring(7),
          type: 'SELECT_CARD',
          playerUid: playerState.uid,
          options: [
            { card: { gamecardId: 'PLAYER_SELF', fullName: '自己' } as any, source: 'UNIT' as TriggerLocation },
            { card: { gamecardId: 'PLAYER_OPPONENT', fullName: '对手' } as any, source: 'UNIT' as TriggerLocation }
          ],
          title: '选择跳过抽卡的玩家',
          description: '侵蚀区背面有2张以上卡牌。请选择一名玩家跳过其下一次抽卡阶段。',
          minSelections: 1,
          maxSelections: 1,
          callbackKey: 'EFFECT_RESOLVE',
          context: {
            effectId: 'vaer_entry_trigger',
            sourceCardId: instance.gamecardId,
            step: 'SKIP'
          }
        };
      }
    } else if (context.step === 'SKIP' && selections.length > 0) {
      const selectedId = selections[0];
      const targetUid = selectedId === 'PLAYER_SELF' ? playerState.uid : gameState.playerIds.find(id => id !== playerState.uid)!;
      const targetPlayer = gameState.players[targetUid];
      
      targetPlayer.skipDrawPhase = true;
      gameState.logs.push(`[${instance.fullName}] 的效果使 [${targetPlayer.displayName}] 的下一个抽卡阶段将被跳过。`);
    }
  }
};

const card: Card = {
  id: '10400038',
  gamecardId: null as any,
  fullName: '深海霸者【巴·韦尔】',
  specialName: '巴·韦尔',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: { 'BLUE': 2 },
  faction: '无',
  acValue: 5,
  power: 3500,
  basePower: 3500,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  isShenyi: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [
    effect_10400038_trigger
  ],
  rarity: 'R',
  availableRarities: ['R'],
  uniqueId: null,
};

export default card;
