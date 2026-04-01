import { Card } from '../types/game';

const card: Card = {
  id: '20403006',
  fullName: '接变委托',
  specialName: '接变委托',
  type: 'STORY',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '冒险者公会',
  acValue: 2,
  godMark: false,
  isExhausted: false,
  canAttack: false,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      description: '选择你的侵蚀区中的1张正面的ACCESS值+2以下的非[God Mark]单位卡，将其放置到战场上。',
      playCost: 0,
      content: 'PLAY',
    }
  ],
  imageUrl: '/pics/20403006_thumb.jpg',
  fullImageUrl: '/pics/20403006_full.jpg',
  rarity: 'U',
};

export default card;
