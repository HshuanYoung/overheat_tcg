import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import {
  canPutUnitOntoBattlefield,
  createSelectCardQuery,
  moveCardAsCost,
  ownUnits,
  putUnitOntoField
} from './BaseUtil';

const isSeisoUnit = (card: Card) =>
  card.type === 'UNIT' && (card.fullName.includes('清霜') || !!card.specialName?.includes('清霜'));

const isWhiteYellowGreen = (card: Card) =>
  ['WHITE', 'YELLOW', 'GREEN'].includes(card.color);

const hasTwoColorGraveCost = (playerState: any) =>
  new Set(playerState.grave.filter(isWhiteYellowGreen).map((card: Card) => card.color)).size >= 2;

const payTwoColorGraveCost = (gameState: any, playerState: any, instance: Card, selections: string[]) => {
  const selected = selections
    .map(id => playerState.grave.find((card: Card) => card.gamecardId === id))
    .filter((card: Card | undefined): card is Card => !!card && isWhiteYellowGreen(card));
  const colors = new Set(selected.map(card => card.color));
  if (selected.length !== 2 || colors.size !== 2) return false;

  selected.forEach(card => moveCardAsCost(gameState, playerState.uid, card, 'EXILE', instance));
  return true;
};

const ownNonGodUnits = (playerState: any) =>
  ownUnits(playerState).filter(unit => !unit.godMark);

const effect_105000295_redirect_attack: CardEffect = {
  id: '105000295_redirect_attack',
  type: 'TRIGGER',
  triggerEvent: 'CARD_ATTACK_DECLARED',
  isGlobal: true,
  isMandatory: false,
  limitCount: 1,
  limitNameType: true,
  triggerLocation: ['UNIT'],
  description: '1回合1次：对手单位攻击宣言时，放逐墓地白/黄/绿中的2种颜色卡各1张，将攻击对象改为己方1个非神蚀单位。',
  condition: (_gameState, playerState, instance, event) =>
    instance.cardlocation === 'UNIT' &&
    event?.type === 'CARD_ATTACK_DECLARED' &&
    event.playerUid !== playerState.uid &&
    hasTwoColorGraveCost(playerState) &&
    ownNonGodUnits(playerState).length > 0,
  cost: async (gameState, playerState, instance) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      playerState.grave.filter(isWhiteYellowGreen),
      '选择墓地费用',
      '选择墓地中的白色、黄色、绿色中的2种颜色的卡各1张放逐。',
      2,
      2,
      { sourceCardId: instance.gamecardId, effectId: '105000295_redirect_attack', costType: 'SP03_Y02_REDIRECT_COST' },
      () => 'GRAVE'
    );
    return true;
  },
  execute: async (instance, gameState, playerState) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      ownNonGodUnits(playerState),
      '选择新的攻击对象',
      '选择己方战场上的1个非神蚀单位，令这次战斗的攻击对象变为它。',
      1,
      1,
      { sourceCardId: instance.gamecardId, effectId: '105000295_redirect_attack', step: 'TARGET' },
      () => 'UNIT'
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.costType === 'SP03_Y02_REDIRECT_COST') {
      if (!payTwoColorGraveCost(gameState, playerState, instance, selections)) {
        context.cancelActivation = true;
      }
      return;
    }

    if (context?.step !== 'TARGET') return;
    const target = selections[0] ? playerState.unitZone.find((unit: Card | null) => unit?.gamecardId === selections[0]) : undefined;
    if (!target || target.godMark || !gameState.battleState) return;
    gameState.battleState.unitTargetId = target.gamecardId;
    gameState.battleState.defender = target.gamecardId;
    gameState.battleState.defenseLockedToTargetId = target.gamecardId;
    gameState.phase = 'BATTLE_FREE';
    gameState.logs.push(`[${instance.fullName}] 将本次攻击对象改为 [${target.fullName}]。`);
  }
};

const effect_105000295_main_put_seiso: CardEffect = {
  id: '105000295_main_put_seiso',
  type: 'ACTIVATE',
  triggerLocation: ['UNIT'],
  limitCount: 1,
  limitNameType: true,
  description: '1回合1次：主要阶段，舍弃1张手牌，将卡组1张卡名含有《清霜》的非神蚀单位卡放置到战场。',
  condition: (gameState, playerState, instance) =>
    instance.cardlocation === 'UNIT' &&
    playerState.isTurn &&
    gameState.phase === 'MAIN' &&
    playerState.hand.length > 0 &&
    playerState.deck.some((card: Card) => isSeisoUnit(card) && !card.godMark && canPutUnitOntoBattlefield(playerState, card)),
  cost: async (gameState, playerState, instance) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      playerState.hand,
      '舍弃1张手牌',
      '舍弃1张手牌作为费用。',
      1,
      1,
      {
        sourceCardId: instance.gamecardId,
        effectId: '105000295_main_put_seiso',
        costType: 'DISCARD_HAND_COST',
        discardCostAmount: 1
      },
      () => 'HAND'
    );
    return true;
  },
  execute: async (instance, gameState, playerState) => {
    const candidates = playerState.deck.filter((card: Card) =>
      isSeisoUnit(card) &&
      !card.godMark &&
      canPutUnitOntoBattlefield(playerState, card)
    );
    createSelectCardQuery(
      gameState,
      playerState.uid,
      candidates,
      '选择清霜单位',
      '选择卡组中的1张卡名含有《清霜》的非神蚀单位卡放置到战场上。',
      1,
      1,
      { sourceCardId: instance.gamecardId, effectId: '105000295_main_put_seiso', step: 'PUT' },
      () => 'DECK'
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections, context) => {
    if (context?.step !== 'PUT') return;
    const target = selections[0] ? playerState.deck.find((card: Card) => card.gamecardId === selections[0]) : undefined;
    if (target && isSeisoUnit(target) && !target.godMark) {
      putUnitOntoField(gameState, playerState.uid, target, instance);
      await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'SHUFFLE_DECK' }, instance);
    }
  }
};

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 105000295
 * Card2 Row: 522
 * Card Row: 344
 * Source CardNo: SP03-Y02
 * Package: SP03(R,SPR)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖1回合1次〗{对手的单位攻击宣言时}[将你的墓地中的白色、黄色、绿色中的2种颜色的卡各1张放逐]：你可以将这次战斗中的攻击对象变为你的场上的一个非神蚀单位。
 * 【启】〖1回合1次〗{你的主要阶段}[舍弃1张手牌]：将你卡组中的1张卡名含有《清霜》的非神蚀单位卡放置到战场上。
 */
const card: Card = {
  id: '105000295',
  fullName: '天舞清霜「绵雪」',
  specialName: '绵雪',
  type: 'UNIT',
  color: 'YELLOW',
  gamecardId: null as any,
  colorReq: { YELLOW: 1 },
  faction: '无',
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
  effects: [effect_105000295_redirect_attack, effect_105000295_main_put_seiso],
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'SP03',
  uniqueId: null as any,
};

export default card;
