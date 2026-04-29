import { Card, GameState, PlayerState, CardEffect, GameEvent } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import { GameService } from '../services/gameService';

const continuous_101060059_color: CardEffect = {
  id: '101060059_continuous_ignore_equip_color',
  type: 'CONTINUOUS',
  description: '【永续】我方装备卡忽略颜色要求。',
  triggerLocation: ['UNIT'],
  applyContinuous: (gameState: GameState, card: Card) => {
    const ownerUid = AtomicEffectExecutor.findCardOwnerKey(gameState, card.gamecardId);
    const player = ownerUid ? gameState.players[ownerUid] : undefined;
    if (!player) return;

    const zones = [
      player.hand,
      player.deck,
      player.grave,
      player.exile,
      player.itemZone,
      player.erosionFront,
      player.erosionBack,
      player.playZone
    ];

    zones.forEach(zone => {
      zone.forEach(equipCard => {
        if (equipCard && equipCard.type === 'ITEM' && equipCard.isEquip) {
          equipCard.colorReq = {};
        }
      });
    });
  }
};

const trigger_101060059_recover: CardEffect = {
  id: '101060059_trigger_recover_equipment',
  type: 'TRIGGER',
  description: '【诱发】[名称一回合一次] 当我方装备被破坏送入墓地时，可以支付其 AC 值将其放置在道具区。',
  triggerLocation: ['UNIT'],
  triggerEvent: ['CARD_DESTROYED_EFFECT', 'CARD_DESTROYED_BATTLE'],
  limitCount: 1,
  limitNameType: true,
  isMandatory: false,
  isGlobal: true,
  condition: (gameState: GameState, playerState: PlayerState, instance: Card, event?: GameEvent) => {
    if (!event) return false;
    if (event.playerUid !== playerState.uid) return false;

    const destroyedCardId = event.targetCardId || event.sourceCardId;
    if (!destroyedCardId) return false;

    const destroyedCard = playerState.grave.find(c => c?.gamecardId === destroyedCardId);
    return !!(destroyedCard && destroyedCard.type === 'ITEM' && destroyedCard.isEquip);
  },
  execute: async (instance: Card, gameState: GameState, playerState: PlayerState, event?: GameEvent) => {
    const recoveringCardId = event?.targetCardId || event?.sourceCardId;
    if (!recoveringCardId) return;

    const cardInGrave = playerState.grave.find(c => c?.gamecardId === recoveringCardId);
    if (!cardInGrave) return;

    const acCost = cardInGrave.acValue || 0;
    gameState.pendingQuery = {
      id: Math.random().toString(36).substring(7),
      type: 'SELECT_PAYMENT',
      playerUid: playerState.uid,
      options: [],
      title: `支付 AC 费用: ${cardInGrave.fullName}`,
      description: `支付 ${acCost} 点费用以将此装备放回道具区。`,
      minSelections: 1,
      maxSelections: 1,
      callbackKey: 'EFFECT_RESOLVE',
      paymentCost: acCost,
      paymentColor: cardInGrave.color,
      context: {
        sourceCardId: instance.gamecardId,
        effectId: '101060059_trigger_recover_equipment',
        recoveringCardId
      }
    };
  },
  onQueryResolve: async (instance: Card, gameState: GameState, playerState: PlayerState, selections: string[], context: any) => {
    const recoveringCardId = context.recoveringCardId;

    await AtomicEffectExecutor.execute(gameState, playerState.uid, {
      type: 'MOVE_FROM_GRAVE',
      targetFilter: { gamecardId: recoveringCardId },
      destinationZone: 'ITEM'
    }, instance);

    const recovered = AtomicEffectExecutor.findCardById(gameState, recoveringCardId);
    if (!recovered) return;

    const previousId = recovered.gamecardId;
    (GameService as any).refreshCardAsNewInstance?.(recovered);
    gameState.logs.push(`[${instance.fullName}] 效果：支付费用后，将装备 [${recovered.fullName}] 放回道具区，并重置为新实例 (${previousId} -> ${recovered.gamecardId})。`);
  }
};

const activate_101060059_search: CardEffect = {
  id: '101060059_activate_search',
  type: 'ACTIVATE',
  description: '【启动】[一局游戏一次] 仅在侵蚀区没有卡牌时可以发动：从卡组将一张「四方剑仙」卡牌和一张装备卡加入手牌。',
  triggerLocation: ['UNIT'],
  limitGlobal: true,
  limitCount: 1,
  erosionTotalLimit: [0, 0],
  execute: async (instance: Card, gameState: GameState, playerState: PlayerState) => {
    const swordImmortalOptions = playerState.deck.filter(c => c && c.fullName.includes('四方剑仙'));

    if (swordImmortalOptions.length > 0) {
      gameState.pendingQuery = {
        id: Math.random().toString(36).substring(7),
        type: 'SELECT_CARD',
        playerUid: playerState.uid,
        options: AtomicEffectExecutor.enrichQueryOptions(gameState, playerState.uid, swordImmortalOptions.map(c => ({ card: c, source: 'DECK' }))),
        title: '检索「四方剑仙」卡牌',
        description: '从卡组选择一张名称包含「四方剑仙」的卡牌。',
        minSelections: 1,
        maxSelections: 1,
        callbackKey: 'EFFECT_RESOLVE',
        context: {
          sourceCardId: instance.gamecardId,
          effectId: '101060059_activate_search',
          step: 1
        }
      };
    } else {
      await initiateSearch2(instance, gameState, playerState);
    }
  },
  onQueryResolve: async (instance: Card, gameState: GameState, playerState: PlayerState, selections: string[], context: any) => {
    if (context.step === 1) {
      const selectedId = selections[0];
      await AtomicEffectExecutor.execute(gameState, playerState.uid, {
        type: 'SEARCH_DECK',
        targetFilter: { gamecardId: selectedId }
      }, instance);

      await initiateSearch2(instance, gameState, playerState);
    } else if (context.step === 2) {
      const selectedId = selections[0];
      await AtomicEffectExecutor.execute(gameState, playerState.uid, {
        type: 'SEARCH_DECK',
        targetFilter: { gamecardId: selectedId }
      }, instance);

      gameState.logs.push(`[${instance.fullName}] 完成了双重检索。`);
    }
  }
};

async function initiateSearch2(instance: Card, gameState: GameState, playerState: PlayerState) {
  const equipmentOptions = playerState.deck.filter(c => c && c.type === 'ITEM' && c.isEquip);
  if (equipmentOptions.length > 0) {
    gameState.pendingQuery = {
      id: Math.random().toString(36).substring(7),
      type: 'SELECT_CARD',
      playerUid: playerState.uid,
      options: AtomicEffectExecutor.enrichQueryOptions(gameState, playerState.uid, equipmentOptions.map(c => ({ card: c, source: 'DECK' }))),
      title: '检索装备卡',
      description: '从卡组选择一张装备卡。',
      minSelections: 1,
      maxSelections: 1,
      callbackKey: 'EFFECT_RESOLVE',
      context: {
        sourceCardId: instance.gamecardId,
        effectId: '101060059_activate_search',
        step: 2
      }
    };
  } else {
    gameState.logs.push(`[${instance.fullName}] 卡组中没有可检索的装备卡。`);
  }
}

const card: Card = {
  id: '101060059',
  fullName: '四方剑仙【南宫】',
  specialName: '南宫',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '圣王国',
  acValue: 3,
  power: 2500,
  basePower: 2500,
  damage: 2,
  baseDamage: 2,
  godMark: true,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: false,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [continuous_101060059_color, trigger_101060059_recover, activate_101060059_search],
  rarity: 'UR',
  availableRarities: ['UR'],
  cardPackage: 'DIY01',
  uniqueId: null,
};

export default card;
