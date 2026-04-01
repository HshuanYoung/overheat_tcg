import { Card } from '../types/game';

const card: Card = {
  id: '10401008',
  fullName: '四方剑仙 「北冥」',
  specialName: '北冥',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '百濑之水城',
  acValue: 4,
  power: 3000,
  damage: 3,
  godMark: true,
  isExhausted: false,
  canAttack: true,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      limit: 'ONCE_PER_TURN',
      description: '将被选择的卡破坏。之后，选择1名对手，给予他X点伤害，X为被破坏的卡的ACCESS值。',
      playCost: 0,
      content: 'DAMAGE',
    },
    {
      type: '启',
      description: '将手牌中的这张卡放置到战场上。',
      playCost: 0,
      content: 'PLAY',
    }
  ],
  imageUrl: '/pics/10401008_thumb.jpg',
  fullImageUrl: '/pics/10401008_full.jpg',
  rarity: 'SR',
};

export default card;
