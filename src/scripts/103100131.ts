import { Card, CardEffect } from '../types/game';
import { EventEngine } from '../services/EventEngine';
import { AtomicEffectExecutor, createSelectCardQuery, discardHandCost, getOpponentUid, ownUnits } from './BaseUtil';

const isWitchUnit = (card: Card) => card.type === 'UNIT' && card.fullName.includes('魔女');

const cardEffects: CardEffect[] = [{
  id: '103100131_redirect_attack',
  type: 'TRIGGER',
  triggerEvent: 'CARD_ATTACK_DECLARED',
  triggerLocation: ['UNIT'],
  isGlobal: true,
  limitCount: 1,
  limitNameType: true,
  description: '对手单位宣言攻击时，舍弃1张手牌，可以将攻击对象变为你的1个卡名含《魔女》的单位。',
  condition: (gameState, playerState, _instance, event) =>
    event?.playerUid === getOpponentUid(gameState, playerState.uid) &&
    playerState.hand.length > 0 &&
    ownUnits(playerState).some(isWitchUnit),
  cost: discardHandCost(1),
  execute: async (instance, gameState, playerState) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      ownUnits(playerState).filter(isWitchUnit),
      '选择新的攻击对象',
      '你可以选择你的战场上的1个卡名含有《魔女》的单位，将这次战斗的攻击对象变为它。',
      0,
      1,
      { sourceCardId: instance.gamecardId, effectId: '103100131_redirect_attack' }
    );
  },
  onQueryResolve: async (_instance, gameState, _playerState, selections) => {
    const target = selections[0] ? AtomicEffectExecutor.findCardById(gameState, selections[0]) : undefined;
    if (!target || target.cardlocation !== 'UNIT') return;
    if (gameState.battleState) {
      gameState.battleState.unitTargetId = target.gamecardId;
      gameState.battleState.defender = target.gamecardId;
      gameState.battleState.defenseLockedToTargetId = target.gamecardId;
      gameState.phase = 'BATTLE_FREE';
      gameState.previousPhase = undefined;
      gameState.phaseTimerStart = Date.now();
      EventEngine.dispatchEvent(gameState, { type: 'PHASE_CHANGED', data: { phase: 'BATTLE_FREE', reason: 'ATTACK_REDIRECT' } });
      gameState.logs.push(`[魔女的领路人] 将这次战斗的攻击对象变为 [${target.fullName}]。`);
      gameState.logs.push(`[攻击宣言] [${target.fullName}] 成为攻击对象，直接进入战斗自由步骤。`);
    }
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103100131
 * Card2 Row: 109
 * Card Row: 109
 * Source CardNo: BT02-G03
 * Package: BT02(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】〖同名1回合1次〗:[舍弃1张手牌]对手的单位宣言攻击时，你可以将这次战斗的攻击对象变为你的战场上的1个卡名含有《魔女》的单位。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103100131',
  fullName: '魔女的领路人',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '艾柯利普斯',
  acValue: 2,
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
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT02',
  uniqueId: null as any,
};

export default card;
