export const everyStatistics = [
  'HP',
  '공격력',
  '방어력',
  '공명 효율',
  '크리티컬 확률',
  '크리티컬 피해',
  '응결 피해 보너스',
  '용융 피해 보너스',
  '전도 피해 보너스',
  '기류 피해 보너스',
  '회절 피해 보너스',
  '인멸 피해 보너스',
  '치료 효과 보너스',
] as const;
export type EveryStatistics = (typeof everyStatistics)[number];
