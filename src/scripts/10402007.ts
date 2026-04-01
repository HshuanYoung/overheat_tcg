import { Card } from '../types/game';

const card: Card = {
  id: '10402007',
  fullName: '老练的狐族商人',
  specialName: '老练的狐族商人',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '九尾商会联盟',
  acValue: 2,
  power: 1500,
  damage: 1,
  godMark: false,
  isExhausted: false,
  canAttack: true,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      description: '选择1名玩家的侵蚀区中的1张正面卡，将其送入墓地。之后，将他的卡组顶的1张卡放置到侵蚀区。',
      playCost: 0,
      content: 'MOVE',
    },
    {
      type: '启',
      limit: 'ONCE_PER_TURN',
      description: '选择1名玩家抽2张卡。之后，那名玩家选择他自己的1张手牌，放置到侵蚀区。',
      playCost: 0,
      content: 'DRAW',
    }
  ],
  imageUrl: '/pics/10402007_thumb.jpg',
  fullImageUrl: '/pics/10402007_full.jpg',
  rarity: 'PR',
};

export default card;
