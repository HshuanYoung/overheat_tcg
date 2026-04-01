import { Card } from '../types/game';

const card: Card = {
  id: '10401001',
  fullName: '歌月丽人武者 「风花」',
  specialName: '风花',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: ['BLUE'],
  acValue: 4,
  power: 3000,
  damage: 3,
  godMark: true,
  isExhausted: false,
  canAttack: true,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '诱',
      triggerLocation: ['UNIT'],
      content: 'MOVE',
      description: '这个单位进入战场时，选择你的卡组或墓地中的1张卡名含有《歌月》的故事卡，将其放逐，将那张卡的效果当作这个能力的效果并处理。（不产生对抗）',
    },
    {
      type: '启',
      limit: 'ONCE_PER_GAME',
      erosionTotalLimit: 10,
      playCost: 2,
      playColorReq: ['BLUE'],
      triggerLocation: ['UNIT'],
      content: 'MOVE',
      description: '将战场上的所有单位返回持有者的手牌。',
    }
  ],
  imageUrl: '/pics/10401001_thumb.jpg',
  fullImageUrl: '/pics/10401001_full.jpg',
  rarity: 'SR',
  faction: '百濑之水城',
};

export default card;
