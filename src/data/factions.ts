export const FACTIONS = [
  '无',
  '圣王国',
  '女神教会',
  '仙雪原',
  '艾柯利普斯',
  '伊列宇王国',
  '雷霆',
  '忒碧拉之门',
  '御庭院',
  '神木森',
  '瑟诺布',
  '学院要塞',
  '永生之乡',
  '百濑之水城',
  '九尾商会联盟',
  '冒险家公会',
  '魔王不死传说',
] as const;

export type Faction = (typeof FACTIONS)[number];
