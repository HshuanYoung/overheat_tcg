import { Card } from '../types/game';

const card: Card = {
  id: '30401001',
  fullName: '「小太刀——歌月」',
  specialName: '小太刀——歌月',
  type: 'ITEM',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '百濑之水城',
  acValue: 3,
  godMark: true,
  isExhausted: false,
  canAttack: false,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      limit: 'ONCE_PER_TURN',
      description: '你的主要阶段中，你可以选择你的1个单位装备这张卡，或者解除这张卡的装备状态。',
      playCost: 0,
      content: 'EQUIP',
    },
    {
      type: '启',
      description: '选择你的2个现在未参与战斗的非[God Mark]单位，将其返回持有者的手牌。之后，将这张卡放置到战场上，选择你的1个单位装备这张卡。',
      playCost: 0,
      content: 'PLAY',
    },
    {
      type: '永',
      description: '装备单位 +1 / +1000。',
    }
  ],
  imageUrl: '/pics/30401001_thumb.jpg',
  fullImageUrl: '/pics/30401001_full.jpg',
  rarity: 'R',
};

export default card;
