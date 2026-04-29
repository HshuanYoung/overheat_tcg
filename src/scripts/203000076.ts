import { Card, CardEffect } from '../types/game';
import { AtomicEffectExecutor, addTempDamage, addTempKeyword, addTempPower, addTempShenyi, allUnitsOnField, createSelectCardQuery, markSpiritTargeted, story } from './BaseUtil';

const cardEffects: CardEffect[] = [story('203000076_spirit_boost', '创痕3：选择战场1个单位。若有【神依】则伤害+4力量+4000并获得歼灭；否则伤害+2力量+2000并获得神依。', async (instance, gameState, playerState) => {
  const targets = allUnitsOnField(gameState);
  if (targets.length === 0) return;
  createSelectCardQuery(gameState, playerState.uid, targets, '选择单位', '选择战场上的1个单位，根据是否具有【神依】获得不同增益。', 1, 1, { sourceCardId: instance.gamecardId, effectId: '203000076_spirit_boost' }, () => 'UNIT');
}, {
  erosionBackLimit: [3, 10],
  onQueryResolve: async (instance, gameState, _playerState, selections) => {
    const target = selections[0] ? AtomicEffectExecutor.findCardById(gameState, selections[0]) : undefined;
    if (target?.cardlocation !== 'UNIT') return;
    markSpiritTargeted(gameState, target, instance);
    if (target.isShenyi) {
      addTempDamage(target, instance, 4);
      addTempPower(target, instance, 4000);
      addTempKeyword(target, instance, 'annihilation');
    } else {
      addTempDamage(target, instance, 2);
      addTempPower(target, instance, 2000);
      addTempShenyi(target, instance, gameState);
    }
  }
})];

/**
 * Auto-generated from Card.xlsx + Card2.xlsx.
 * Source CardID: 203000076
 * Card2 Row: 207
 * Card Row: 207
 * Source CardNo: BT03-G16
 * Package: BT03(R)
 * ID Source: card-xlsx
 * Keywords: N/A
 * Card Detail:
 * 【创痕3】（你的侵蚀区中的背面卡有3张以上时才有效）选择战场上的1个单位，若那个单位是具有【神依】的单位，本回合中，那个单位〖伤害+4〗〖力量+4000〗并获得【歼灭】；若不是，本回合中，那个单位〖伤害+2〗〖力量+2000〗并获得【神依】。
 * TODO: confirm ID / godMark / rarity variants and implement effects.
 */
const card: Card = {
  id: '203000076',
  fullName: '天鬼降灵',
  specialName: '',
  type: 'STORY',
  color: 'GREEN',
  gamecardId: null as any,
  colorReq: { GREEN: 1 },
  faction: '无',
  acValue: 5,
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
