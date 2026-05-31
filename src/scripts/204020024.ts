import { Card, CardEffect, GameState } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import { story } from './BaseUtil';

const MODE_EXHAUST = 'MODE_EXHAUST';
const MODE_BOUNCE = 'MODE_BOUNCE';

const selectedModeFromContext = (context?: any) =>
  context?.modeId || context?.selectedModeId || context?.declaredModeId;

const readyNonGodUnits = (gameState: GameState) =>
  Object.values(gameState.players)
    .flatMap(player => player.unitZone)
    .filter((card): card is Card => !!card && !card.godMark && !card.isExhausted);

const exhaustedNonGodCards = (gameState: GameState) =>
  Object.values(gameState.players)
    .flatMap(player => [
      ...player.unitZone.filter((card): card is Card => !!card),
      ...player.itemZone.filter((card): card is Card => !!card)
    ])
    .filter(card => !card.godMark && !!card.isExhausted);

const cardEffects: CardEffect[] = [story('204020024_activate', '选择下列的1项效果并执行：横置1个非神蚀单位，或将1张横置的非神蚀卡返回持有者手牌。', async () => {
}, {
  condition: gameState =>
    readyNonGodUnits(gameState).length > 0 ||
    exhaustedNonGodCards(gameState).length > 0,
  targetSpec: {
    modeTitle: '选择阿克蒂的诱导',
    modeDescription: '选择要执行的效果。',
    modeOptions: [{
      id: MODE_EXHAUST,
      label: '横置非神蚀单位',
      title: '选择横置目标',
      description: '选择战场上的1个非神蚀单位，将其横置。',
      minSelections: 1,
      maxSelections: 1,
      zones: ['UNIT'],
      controller: 'ANY',
      step: MODE_EXHAUST,
      condition: gameState => readyNonGodUnits(gameState).length > 0,
      getCandidates: gameState =>
        readyNonGodUnits(gameState).map(card => ({ card, source: 'UNIT' as any }))
    }, {
      id: MODE_BOUNCE,
      label: '返回横置非神蚀卡',
      title: '选择返回手牌目标',
      description: '选择1张横置的非神蚀卡，将其返回持有者的手牌。',
      minSelections: 1,
      maxSelections: 1,
      zones: ['UNIT', 'ITEM'],
      controller: 'ANY',
      step: MODE_BOUNCE,
      condition: gameState => exhaustedNonGodCards(gameState).length > 0,
      getCandidates: gameState =>
        exhaustedNonGodCards(gameState).map(card => ({ card, source: card.cardlocation as any }))
    }]
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    const targetId = selections[0];
    const target = targetId ? AtomicEffectExecutor.findCardById(gameState, targetId) : undefined;
    if (!target) return;

    const mode = selectedModeFromContext(context);
    if (mode === MODE_EXHAUST && target.cardlocation === 'UNIT' && !target.godMark && !target.isExhausted) {
      await AtomicEffectExecutor.execute(gameState, playerState.uid, {
        type: 'ROTATE_HORIZONTAL',
        targetFilter: { gamecardId: target.gamecardId }
      }, instance);
      return;
    }

    if (
      mode === MODE_BOUNCE &&
      (target.cardlocation === 'UNIT' || target.cardlocation === 'ITEM') &&
      !target.godMark &&
      target.isExhausted
    ) {
      await AtomicEffectExecutor.execute(gameState, playerState.uid, {
        type: 'MOVE_FROM_FIELD',
        targetFilter: { gamecardId: target.gamecardId },
        destinationZone: 'HAND'
      }, instance);
    }
  }
})];

const card: Card = {
  id: '204020024',
  fullName: '阿克蒂的诱导',
  specialName: '',
  type: 'STORY',
  color: 'BLUE',
  gamecardId: null as any,
  colorReq: { BLUE: 1 },
  faction: '九尾商会联盟',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT01',
  uniqueId: null,
};

export default card;
