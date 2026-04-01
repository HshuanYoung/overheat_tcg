import { Card } from '../types/game';

const card: Card = {
  id: '10401005',
  fullName: '晶剑仙郎',
  specialName: '晶剑仙郎',
  type: 'UNIT',
  color: 'BLUE',
  colorReq: ['BLUE'],
  faction: '百濑之水城',
  acValue: 3,
  power: 3500,
  damage: 1,
  godMark: false,
  isExhausted: false,
  canAttack: true,
  feijingMark: true,
  canReset: true,
  effects: [
    {
      type: '永',
      description: '菲晶 (为同色卡支付使用费用时，可以将手牌中的这张卡舍弃，尽可能代替支付+3。)',
    }
  ],
  imageUrl: '/pics/10401005_thumb.jpg',
  fullImageUrl: '/pics/10401005_full.jpg',
  rarity: 'C',
};

export default card;
