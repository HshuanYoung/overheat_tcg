import { Card } from '../types/game';

const card: Card = {
  id: '20400007',
  fullName: '明镜止水',
  specialName: '明镜止水',
  type: 'STORY',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '百濑之水城',
  acValue: 3,
  godMark: false,
  isExhausted: false,
  canAttack: false,
  feijingMark: false,
  canReset: true,
  effects: [
    {
      type: '启',
      description: '选择战场上的1个单位，本回合中，那个单位的所有能力无效，不受那个单位以外的单位卡的能力的效果影响。',
      playCost: 0,
      content: 'NEGATE',
    }
  ],
  imageUrl: '/pics/20400007_thumb.jpg',
  fullImageUrl: '/pics/20400007_full.jpg',
  rarity: 'U',
};

export default card;
