import { Card } from '../types/game';

const card: Card = {
  id: '10400002',
  fullName: '翡翠水蜥',
  specialName: '翡翠水蜥',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '无',
  acValue: 0,
  power: 0,
  damage: 0,
  godMark: false,
  isExhausted: false,
  canAttack: true,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      description: '这个能力只能从侵蚀区发动，且不能用于对抗。将这张卡放置到战场上。',
      playCost: 0,
      triggerLocation: ['EROSION_FRONT'],
      content: 'PLAY',
    }
  ],
  imageUrl: '/pics/10400002_thumb.jpg',
  fullImageUrl: '/pics/10400002_full.jpg',
  rarity: 'U',
};

export default card;
