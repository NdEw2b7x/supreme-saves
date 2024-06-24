import { EveryElement } from './everyElement';

export const eveyrWeaponSubStats = ['hp', 'atk', 'def', 'energy', 'cRate', 'cDmg'] as const;
export type WeaponSubStats = (typeof eveyrWeaponSubStats)[number];

export const everyEchoPrimaryMainStats = [
  ...eveyrWeaponSubStats,
  'ice',
  'fire',
  'electro',
  'wind',
  'light',
  'dark',
  'heal',
] as const;
export type EchoPrimaryMainStats = (typeof everyEchoPrimaryMainStats)[number];

export const everyEchoSecondaryMainStats = ['flatHp', 'flatAtk'] as const;
export type EchoSecondaryMainStats = (typeof everyEchoSecondaryMainStats)[number];
export type EchoMainStats = EchoPrimaryMainStats | EchoSecondaryMainStats;

export const everyEchoSubStats = [
  ...eveyrWeaponSubStats,
  'basic',
  'heavy',
  'skill',
  'burst',
  'flatHp',
  'flatAtk',
  'flatDef',
] as const;
export type EchoSubStats = (typeof everyEchoSubStats)[number];

export const elementMap = {
  ice: '응결',
  fire: '용융',
  electro: '전도',
  wind: '기류',
  light: '회절',
  dark: '인멸',
} as const;

export const getElementMap: (x: EveryElement) => keyof typeof elementMap = (x: EveryElement) => {
  switch (x) {
    case '응결':
      return 'ice';
    case '용융':
      return 'fire';
    case '전도':
      return 'electro';
    case '기류':
      return 'wind';
    case '회절':
      return 'light';
    default:
      return 'dark';
  }
};

export type Stats = WeaponSubStats | EchoPrimaryMainStats | EchoSecondaryMainStats | EchoSubStats;

export const getStatsName = (x: Stats) => {
  const statsMap: Record<Stats, string> = {
    flatHp: 'HP',
    flatAtk: '공격력',
    flatDef: '방어력',
    hp: 'HP%',
    atk: '공격력%',
    def: '방어력%',
    energy: '공명 효율',
    ice: '응결 피해 보너스',
    fire: '용융 피해 보너스',
    electro: '전도 피해 보너스',
    wind: '기류 피해 보너스',
    light: '회절 피해 보너스',
    dark: '인멸 피해 보너스',
    cRate: '크리티컬 확률',
    cDmg: '크리티컬 피해',
    heal: '치료 효과 보너스',
    basic: '일반 공격 피해 보너스',
    heavy: '강공격 피해 보너스',
    skill: '공명 스킬 피해 보너스',
    burst: '공명 해방 피해 보너스',
  } as const;
  return statsMap[x];
};
export const getStatsAbbr = (x: Stats) => {
  const statsMap: Record<Stats, string> = {
    flatHp: 'HP',
    flatAtk: '공',
    flatDef: '방',
    hp: 'HP%',
    atk: '공%',
    def: '방%',
    energy: '효율',
    ice: '응결',
    fire: '용융',
    electro: '전도',
    wind: '기류',
    light: '회절',
    dark: '인멸',
    cRate: '크확',
    cDmg: '크피',
    heal: '치료',
    basic: '일반',
    heavy: '강공',
    skill: '스킬',
    burst: '해방',
  } as const;
  return statsMap[x];
};
