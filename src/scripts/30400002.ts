import { Card } from '../types/game';

const card: Card = {
  id: '30400002',
  fullName: '水仙心法',
  specialName: '水仙心法',
  type: 'ITEM',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '无',
  acValue: 2,
  godMark: false,
  isExhausted: false,
  canAttack: false,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '诱',
      limit: 'ONCE_PER_TURN',
      description: '你的单位由于卡的效果返回手牌时，你可以选择你的侵蚀区中的1张正面卡，将其加入手牌。',
      playCost: 0,
      content: 'MOVE',
    }
  ],
  imageUrl: '/pics/30400002_thumb.jpg',
  fullImageUrl: '/pics/30400002_full.jpg',
  rarity: 'U',
};

export default card;
