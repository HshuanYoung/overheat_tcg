import { Card } from '../types/game';

const card: Card = {
  id: 'test_atomic_001',
  fullName: '原子效应测试者 (Atomic Tester)',
  specialName: '',
  type: 'UNIT',
  color: 'WHITE',
  gamecardId: null as any,
  colorReq: { WHITE: 1 },
  faction: '测试',
  acValue: 2,
  power: 1000,
  basePower: 1000,
  damage: 1,
  baseDamage: 1,
  godMark: false,
  displayState: 'FRONT_UPRIGHT',
  isExhausted: false,
  isrush: true,
  canAttack: true,
  feijingMark: false,
  canResetCount: 0,
  effects: [
    {
      id: 'test_draw',
      type: 'ACTIVATE',
      description: '【启动】抽2张卡。',
      atomicEffects: [
        {
          type: 'DRAW',
          value: 2
        }
      ]
    },
    {
      id: 'test_buff',
      type: 'TRIGGER',
      triggerEvent: 'CARD_PLAYED',
      description: '【诱发】当有卡牌被使用时，己方所有单位力量+500。',
      atomicEffects: [
        {
          type: 'CHANGE_POWER',
          value: 500,
          targetFilter: {
            zone: ['UNIT'],
            onField: true
          }
        }
      ]
    },
    {
      id: 'test_continuous',
      type: 'CONTINUOUS',
      description: '【永续】对方所有单位AC值-1。',
      atomicEffects: [
        {
          type: 'CHANGE_AC',
          value: -1,
          targetFilter: {
            zone: ['UNIT'],
            onField: true
          }
        }
      ]
    }
  ],
  imageUrl: 'https://picsum.photos/seed/testatomic/400/600',
  fullImageUrl: 'https://picsum.photos/seed/testatomic/800/1200',
  rarity: 'R',
};

export default card;
