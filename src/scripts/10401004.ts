import { Card } from '../types/game';

const card: Card = {
  id: '10401004',
  fullName: '',
  specialName: '剑仙子',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: ['BLUE'],
  acValue: 2,
  power: 500,
  damage: 0,
  godMark: false,
  isExhausted: false,
  canAttack: true,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      limit: 'ONCE_PER_TURN',
      triggerLocation: ['UNIT'],
      content: 'MOVE',
      description: '将这个单位返回持有者的手牌。之后，选择你的侵蚀区中的1张正面卡，将其返回持有者的卡组，将卡组洗切。',
    }
  ],
  imageUrl: '/pics/10401002_thumb.jpg',
  fullImageUrl: '/pics/10401002_full.jpg',
  rarity: 'SR',
  faction: '百濑之水城',
};

export default card;
