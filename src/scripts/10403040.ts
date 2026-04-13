import { Card, GameState, PlayerState, CardEffect, TriggerLocation, GameEvent } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';

const effect_10403040_kill_trigger: CardEffect = {
  id: 'cocoa_kill_trigger',
  type: 'TRIGGER',
  triggerType: 'CARD_DESTROYED_BATTLE',
  description: '【诱发】当此单位在战斗中破坏对手的单位时，选择对手的一个横置状态的非神迹单位并破坏。',
  condition: (gameState: GameState, playerState: PlayerState, instance: Card, event?: GameEvent) => {
    // Only trigger if this unit was the "killer"
    if (!event || !event.data || !event.data.attackerIds) return false;
    return event.data.attackerIds.includes(instance.gamecardId);
  },
  execute: async (gameState: GameState, playerState: PlayerState, instance: Card) => {
    const opponentId = gameState.playerIds.find(id => id !== playerState.uid)!;
    const opponent = gameState.players[opponentId];
    
    // Filter: opponent's unit, exhausted (horizontal), non-divine (non-godmark)
    const targets = opponent.unitZone.filter(u => u && u.isExhausted && !u.godMark) as Card[];
    
    if (targets.length > 0) {
      gameState.pendingQuery = {
        id: Math.random().toString(36).substring(7),
        type: 'SELECT_CARD',
        playerUid: playerState.uid,
        options: AtomicEffectExecutor.enrichQueryOptions(gameState, playerState.uid, targets.map(c => ({ card: c, source: 'UNIT' }))),
        title: '选择破坏目标',
        description: `可可亚破坏了单位，现在可以额外破坏一个横置的非神迹单位。`,
        minSelections: 1,
        maxSelections: 1,
        callbackKey: 'EFFECT_RESOLVE',
        context: {
          effectId: 'cocoa_kill_trigger',
          sourceCardId: instance.gamecardId
        }
      };
    }
  },
  onQueryResolve: async (instance: Card, gameState: GameState, playerState: PlayerState, selections: string[]) => {
    if (selections.length > 0) {
      const targetId = selections[0];
      const opponentId = gameState.playerIds.find(id => id !== playerState.uid)!;
      const opponent = gameState.players[opponentId];
      const idx = opponent.unitZone.findIndex(u => u && u.gamecardId === targetId);
      
      if (idx !== -1) {
        const unit = opponent.unitZone[idx]!;
        opponent.unitZone[idx] = null;
        unit.cardlocation = 'GRAVE';
        opponent.grave.push(unit);
        
        gameState.logs.push(`[${instance.fullName}] 效果：破坏了 [${unit.fullName}]。`);
      }
    }
  }
};

const effect_10403040_activate: CardEffect = {
  id: 'cocoa_summon_cocola',
  type: 'ACTIVATE',
  description: '【起】在女神化状态下，每回合此卡名限一次，选择侵蚀区正面的一张卡转为背面：从手牌、卡组或墓地中选择一张“可可拉”单位卡放置在战场上。',
  limitCount: 1,
  limitNameType: true,
  condition: (gameState: GameState, playerState: PlayerState) => {
    return !!playerState.isGoddessMode;
  },
  execute: async (gameState: GameState, playerState: PlayerState, instance: Card) => {
    const frontCards = playerState.erosionFront.filter(c => c && c.displayState === 'FRONT_UPRIGHT') as Card[];
    if (frontCards.length === 0) throw new Error('没有侵蚀区正面卡牌作为代价');

    gameState.pendingQuery = {
      id: Math.random().toString(36).substring(7),
      type: 'SELECT_CARD',
      playerUid: playerState.uid,
      options: AtomicEffectExecutor.enrichQueryOptions(gameState, playerState.uid, frontCards.map(c => ({ card: c, source: 'EROSION_FRONT' }))),
      title: '选择代价',
      description: '选择一张侵蚀区正面卡转为背面作为代价。',
      minSelections: 1,
      maxSelections: 1,
      callbackKey: 'EFFECT_RESOLVE',
      context: {
        effectId: 'cocoa_summon_cocola',
        sourceCardId: instance.gamecardId,
        step: 'COST'
      }
    };
  },
  onQueryResolve: (instance: Card, gameState: GameState, playerState: PlayerState, selections: string[], context: any) => {
    if (context.step === 'COST' && selections.length > 0) {
      const costCardId = selections[0];
      const costCard = AtomicEffectExecutor.findCardById(gameState, costCardId);
      if (costCard) {
        const idx = playerState.erosionFront.findIndex(c => c?.gamecardId === costCardId);
        if (idx !== -1) {
          playerState.erosionFront[idx] = null;
          costCard.cardlocation = 'EROSION_BACK';
          costCard.displayState = 'FRONT_FACEDOWN';
          const emptyBackIdx = playerState.erosionBack.findIndex(c => c === null);
          if (emptyBackIdx !== -1) playerState.erosionBack[emptyBackIdx] = costCard;
          else playerState.erosionBack.push(costCard);
          gameState.logs.push(`[${instance.fullName}] 支付了代价：将 [${costCard.fullName}] 转为背面。`);
        }
      }

      // Search Cocola
      const searchZones: { zone: (Card | null)[], name: TriggerLocation }[] = [
        { zone: playerState.hand, name: 'HAND' },
        { zone: playerState.deck, name: 'DECK' },
        { zone: playerState.grave, name: 'GRAVE' }
      ];
      const cocolaOptions: { card: Card; source: TriggerLocation }[] = [];
      
      searchZones.forEach(z => {
        z.zone.forEach(c => {
          if (c && c.type === 'UNIT' && c.fullName.includes('可可拉')) {
            cocolaOptions.push({ card: c, source: z.name });
          }
        });
      });

      if (cocolaOptions.length > 0) {
        gameState.pendingQuery = {
          id: Math.random().toString(36).substring(7),
          type: 'SELECT_CARD',
          playerUid: playerState.uid,
          options: AtomicEffectExecutor.enrichQueryOptions(gameState, playerState.uid, cocolaOptions),
          title: '选择出击的可可拉',
          description: '从手牌、卡组或墓地选择一个“可可拉”单位放置在战场上。',
          minSelections: 1,
          maxSelections: 1,
          callbackKey: 'EFFECT_RESOLVE',
          context: {
            effectId: 'cocoa_summon_cocola',
            sourceCardId: instance.gamecardId,
            step: 'SUMMON'
          }
        };
      } else {
        gameState.logs.push('未发现符合条件的“可可拉”卡牌。');
      }
    } else if (context.step === 'SUMMON' && selections.length > 0) {
      const cocolaId = selections[0];
      const zones: string[] = ['hand', 'deck', 'grave'];
      for (const zoneKey of zones) {
        const zone = playerState[zoneKey as keyof PlayerState] as (Card | null)[];
        const idx = zone.findIndex(c => c?.gamecardId === cocolaId);
        if (idx !== -1) {
          const card = zone.splice(idx, 1)[0]!;
          card.cardlocation = 'UNIT';
          card.playedTurn = gameState.turnCount;
          const emptyUnitIdx = playerState.unitZone.findIndex(c => c === null);
          if (emptyUnitIdx !== -1) playerState.unitZone[emptyUnitIdx] = card;
          else playerState.unitZone.push(card);
          
          gameState.logs.push(`[${instance.fullName}] 的效果使 [${card.fullName}] 从 ${zoneKey.toUpperCase()} 出击到战场！`);
          break;
        }
      }
      
      if (context.step === 'SUMMON') {
        AtomicEffectExecutor.shuffleDeck(gameState, playerState.uid);
      }
    }
  }
};

const card: Card = {
  id: '10403040',
  gamecardId: null as any,
  fullName: '双子星【可可亚】',
  specialName: '可可亚',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: { 'BLUE': 2 },
  faction: '冒险家公会',
  acValue: 4,
  power: 3000,
  basePower: 3000,
  damage: 3,
  baseDamage: 3,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [
    effect_10403040_kill_trigger,
    effect_10403040_activate
  ],
  rarity: 'SR',
  availableRarities: ['SR'],
  uniqueId: null,
};

export default card;
