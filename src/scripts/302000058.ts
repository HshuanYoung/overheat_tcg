import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor } from '../services/AtomicEffectExecutor';
import { universalEquipEffect } from './BaseUtil';

const cardEffects: CardEffect[] = [
  universalEquipEffect,
  {
    id: '302000058_equipped_cost_grave_draw',
    type: 'TRIGGER',
    triggerLocation: ['ITEM'],
    triggerEvent: 'CARD_LEFT_ZONE',
    isGlobal: true,
    limitCount: 1,
    description: '1回合1次：装备单位由于卡的能力费用从战场送入墓地时，你可以抽1张卡。',
    condition: (gameState, playerState, instance, event) => {
      const data = (instance as any).data || {};
      const recentEquipTargetId = data.lastEquipTargetLostTurn === gameState.turnCount
        ? data.lastEquipTargetId
        : undefined;
      const equipTargetId = instance.equipTargetId || recentEquipTargetId;
      return !!equipTargetId &&
        event?.sourceCardId === equipTargetId &&
        event.playerUid === playerState.uid &&
        event.data?.zone === 'UNIT' &&
        event.data?.targetZone === 'GRAVE' &&
        playerState.deck.length > 0 &&
        (event.sourceCard as any)?.data?.lastMovedAsCostTurn === gameState.turnCount;
    },
    execute: async (instance, gameState, playerState) => {
      await AtomicEffectExecutor.execute(gameState, playerState.uid, { type: 'DRAW', value: 1 }, instance);
    }
  }
];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 302000058
 * Card2 Row: 565
 * Card Row: 449
 * Source CardNo: BT07-R10
 * Package: BT07(C)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【装备】
 * 【诱】〖1回合1次〗{装备单位由于卡的能力的费用从战场上送入墓地时 }：你可以抽1张卡。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '302000058',
  fullName: '祭魂器',
  specialName: '',
  type: 'ITEM',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '无',
  acValue: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'C',
  availableRarities: ['C'],
  cardPackage: 'BT07',
  uniqueId: null as any,
};

export default card;
