import { Card } from '../types/game';

const card: Card = {
  id: '20400003',
  fullName: '公平交易',
  specialName: '公平交易',
  type: 'STORY',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '无',
  acValue: -3,
  godMark: false,
  isExhausted: false,
  canAttack: false,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      description: '你选择1名对手，那名对手选择下列的1项效果并执行：◆抽3张卡，选择自己的2张手牌，将其放置到侵蚀区。◆选择1个横置单位，将其破坏。若你在女神化状态下使用这张卡，由你代替那名对手选择效果和对象。',
      playCost: 0,
      content: 'CHOICE',
    }
  ],
  imageUrl: '/pics/20400003_thumb.jpg',
  fullImageUrl: '/pics/20400003_full.jpg',
  rarity: 'R',
};

export default card;
