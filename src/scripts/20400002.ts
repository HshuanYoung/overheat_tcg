import { Card } from '../types/game';

const card: Card = {
  id: '20400002',
  fullName: '歌月花开',
  specialName: '歌月花开',
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
      type: '启',
      description: '选择战场上的1个单位的1个[诱]能力，本回合中，那个能力的效果不处理。',
      playCost: 0,
      content: 'NEGATE',
    }
  ],
  imageUrl: '/pics/20400002_thumb.jpg',
  fullImageUrl: '/pics/20400002_full.jpg',
  rarity: 'U',
};

export default card;
