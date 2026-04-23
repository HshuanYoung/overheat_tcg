import { Card, CardEffect, GameEvent, GameState, PlayerState } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';

const effect_305000018_replace_damage: CardEffect = {
  id: '305000018_replace_damage',
  type: 'CONTINUOUS',
  content: 'REPLACE_DAMAGE_TO_EROSION',
  movementReplacementDestination: 'EXILE',
  description: '因伤害而进入侵蚀区的单位改为放逐。',
  condition: (_gameState: GameState, _playerState: PlayerState, instance: Card) =>
    instance.cardlocation === 'ITEM'
};

const effect_305000018_return_to_deck: CardEffect = {
  id: '305000018_return_to_deck',
  type: 'TRIGGER',
  triggerEvent: 'TURN_END' as any,
  triggerLocation: ['ITEM'],
  isMandatory: true,
  description: '在对手回合结束时，将此卡从你的道具区放置到卡组底。',
  condition: (_gameState: GameState, playerState: PlayerState, instance: Card, event?: GameEvent) =>
    instance.cardlocation === 'ITEM' &&
    event?.type === ('TURN_END' as any) &&
    event.playerUid !== playerState.uid,
  execute: async (instance, gameState, playerState) => {
    if (instance.cardlocation !== 'ITEM') return;

    AtomicEffectExecutor.moveCard(
      gameState,
      playerState.uid,
      'ITEM',
      playerState.uid,
      'DECK',
      instance.gamecardId,
      true,
      {
        insertAtBottom: true,
        effectSourcePlayerUid: playerState.uid,
        effectSourceCardId: instance.gamecardId
      }
    );

    gameState.logs.push(`[${instance.id}] 在对手回合结束时被放置到卡组底。`);
  }
};

const card: Card = {
  id: '305000018',
  fullName: '不可侵犯结界',
  specialName: '',
  type: 'ITEM',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
  acValue: 0,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: [effect_305000018_replace_damage, effect_305000018_return_to_deck],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT01',
  uniqueId: null as any,
};

export default card;
