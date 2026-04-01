import { Card } from '../types/game';

const card: Card = {
  id: '20400005',
  fullName: '交易术实习',
  specialName: '交易术实习',
  type: 'STORY',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '无',
  acValue: 1,
  godMark: false,
  isExhausted: false,
  canAttack: false,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      description: '将侵蚀区中的1张正面卡加入手牌。',
      playCost: 0,
      content: 'MOVE',
    }
  ],
  imageUrl: '/pics/20400005_thumb.jpg',
  fullImageUrl: '/pics/20400005_full.jpg',
  rarity: 'U',
};

export default card;
