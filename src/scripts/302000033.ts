import { Card, CardEffect } from '../types/game';
import { damagePlayerByEffect } from './BaseUtil';

const cardEffects: CardEffect[] = [{
  id: '302000033_destroy_damage',
  type: 'TRIGGER',
  triggerEvent: ['CARD_DESTROYED_BATTLE', 'CARD_DESTROYED_EFFECT'],
  triggerLocation: ['ITEM'],
  isGlobal: true,
  isMandatory: true,
  description: '战场上的单位被破坏时，给予那个单位的持有者1点伤害。',
  condition: (_gameState, _playerState, _instance, event) => !!event?.playerUid,
  execute: async (instance, gameState, playerState, event) => {
    await damagePlayerByEffect(gameState, playerState.uid, event!.playerUid!, 1, instance);
  }
}];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 302000033
 * Card2 Row: 223
 * Card Row: 223
 * Source CardNo: BT03-R15
 * Package: BT03(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【诱】:战场上的单位被破坏时，给予那个单位的持有者1点伤害。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '302000033',
  fullName: '噬魂魔阵',
  specialName: '',
  type: 'ITEM',
  color: 'RED',
  gamecardId: null as any,
  colorReq: { RED: 1 },
  faction: '无',
  acValue: 2,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  feijingMark: false,
  canResetCount: 0,
  effects: cardEffects,
  rarity: 'R',
  availableRarities: ['R'],
  cardPackage: 'BT03',
  uniqueId: null as any,
};

export default card;
