import { Card } from '../types/game';

const card: Card = {
  id: '20400004',
  fullName: '交易失败',
  specialName: '交易失败',
  type: 'STORY',
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
      description: '只能在对抗对手使用道具卡的宣言时使用。反击那张道具卡。',
      playCost: 0,
      content: 'NEGATE',
    }
  ],
  imageUrl: '/pics/20400004_thumb.jpg',
  fullImageUrl: '/pics/20400004_full.jpg',
  rarity: 'U',
};

export default card;
