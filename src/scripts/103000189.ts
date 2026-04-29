import { Card, CardEffect } from '../types/game';
import { canPutUnitOntoBattlefield, createSelectCardQuery, moveCard } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '103000189_grave_enter',
  type: 'ACTIVATE',
  triggerLocation: ['GRAVE'],
  limitCount: 1,
  limitGlobal: true,
  description: '1游戏1次：从墓地发动，放逐墓地8张绿色卡，将这张卡放置到战场。',
  condition: (gameState, playerState, instance) =>
    gameState.phase !== 'BATTLE_DECLARATION' &&
    canPutUnitOntoBattlefield(playerState, instance) &&
    playerState.grave.filter(card => card.color === 'GREEN' && card.gamecardId !== instance.gamecardId).length >= 8,
  execute: async (instance, gameState, playerState) => {
    createSelectCardQuery(
      gameState,
      playerState.uid,
      playerState.grave.filter(card => card.color === 'GREEN' && card.gamecardId !== instance.gamecardId),
      '选择放逐的绿色卡',
      '选择你的墓地中的8张绿色卡放逐，之后将这张卡放置到战场。',
      8,
      8,
      { sourceCardId: instance.gamecardId, effectId: '103000189_grave_enter' },
      () => 'GRAVE'
    );
  },
  onQueryResolve: async (instance, gameState, playerState, selections) => {
    selections.forEach(id => {
      const card = playerState.grave.find(candidate => candidate.gamecardId === id);
      if (card) moveCard(gameState, playerState.uid, card, 'EXILE', instance);
    });
    if (instance.cardlocation === 'GRAVE' && canPutUnitOntoBattlefield(playerState, instance)) {
      moveCard(gameState, playerState.uid, instance, 'UNIT', instance);
    }
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 103000189
 * Card2 Row: 202
 * Card Row: 202
 * Source CardNo: BT03-G11
 * Package: BT03(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【启】〖1游戏1次〗:[将你的墓地中的8张绿色卡放逐]这个能力只能从墓地发动，且不能用于对抗对手进行攻击的宣言。将这张卡放置到战场上。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '103000189',
  fullName: '圣洁独角兽',
  specialName: '',
  type: 'UNIT',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '无',
  acValue: 5,
  power: 3500,
  basePower: 3500,
  damage: 3,
  baseDamage: 3,
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
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
