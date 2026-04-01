import { Card } from '../types/game';

const card: Card = {
  id: '20400001',
  fullName: '歌月拂风',
  specialName: '歌月拂风',
  type: 'STORY',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '无',
  acValue: 3,
  godMark: false,
  isExhausted: false,
  canAttack: false,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      description: '选择战场上的1张非[God Mark]卡，将其返回持有者的手牌。若你的战场上有「风花」单位，选择的卡可以是战场上的1张[God Mark]卡。',
      playCost: 0,
      content: 'MOVE',
    }
  ],
  imageUrl: '/pics/20400001_thumb.jpg',
  fullImageUrl: '/pics/20400001_full.jpg',
  rarity: 'R',
};

export default card;
