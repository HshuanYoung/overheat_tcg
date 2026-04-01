import { Card } from '../types/game';

const card: Card = {
  id: '10402006',
  fullName: '狐族交易术学徒',
  specialName: '狐族交易术学徒',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '九尾商会联盟',
  acValue: 1,
  power: 1000,
  damage: 1,
  godMark: false,
  isExhausted: false,
  canAttack: true,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '诱',
      description: '这个单位进入战场时，选择1名玩家公开他自己的手牌。之后，选择他的1张手牌和他的侵蚀区中的1张正面卡，将侵蚀区中所选的卡加入他的手牌，将手牌中所选的卡放置到他的侵蚀区。',
      playCost: 0,
      content: 'MOVE',
    }
  ],
  imageUrl: '/pics/10402006_thumb.jpg',
  fullImageUrl: '/pics/10402006_full.jpg',
  rarity: 'R',
};

export default card;
