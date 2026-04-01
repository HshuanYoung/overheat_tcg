import { Card } from '../types/game';

const card: Card = {
  id: '10400003',
  fullName: '暮城的慈善家',
  specialName: '暮城的慈善家',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '无',
  acValue: 1,
  power: 1000,
  damage: 0,
  godMark: false,
  isExhausted: false,
  canAttack: true,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '诱',
      description: '这个单位进入战场时，所有玩家抽1张卡。',
      playCost: 0,
      content: 'DRAW',
    }
  ],
  imageUrl: '/pics/10400003_thumb.jpg',
  fullImageUrl: '/pics/10400003_full.jpg',
  rarity: 'U',
};

export default card;
