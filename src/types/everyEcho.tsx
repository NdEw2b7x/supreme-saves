type n = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type EchoCode = `${'G' | 'H' | 'N' | 'R' | 'S' | 'W' | 'X'}${n}${n}`;

export const everyEchoRarity = [5, 4] as const;
export type EchoRarity = (typeof everyEchoRarity)[number];

export const everyEchoCost = [4, 3, 1] as const;
export type EchoCost = (typeof everyEchoCost)[number];

export const everyEchoDangerous = ['해일', '노도', '거랑', '경파'] as const;
export type EchoDangerous = (typeof everyEchoDangerous)[number];

export const everyEchoMainStats4cost = [
  'HP%',
  '공격력%',
  '방어력%',
  '크리티컬 확률',
  '크리티컬 피해',
  '치료 효과 보너스',
] as const;
export const everyEchoMainStatistics3cost = [
  'HP%',
  '공격력%',
  '방어력%',
  '공명 효율',
  '응결 피해 보너스',
  '용융 피해 보너스',
  '전도 피해 보너스',
  '기류 피해 보너스',
  '회절 피해 보너스',
  '인멸 피해 보너스',
] as const;
export const everyEchoMainStatistics1cost = ['HP%', '공격력%', '방어력%'] as const;
export type EchoMainStatistics4cost = (typeof everyEchoMainStats4cost)[number];
export type EchoMainStatistics3cost = (typeof everyEchoMainStatistics3cost)[number];
export type EchoMainStatistics1cost = (typeof everyEchoMainStatistics1cost)[number];
