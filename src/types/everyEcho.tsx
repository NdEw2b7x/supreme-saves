import { EchoPrimaryMainStats } from './everyStatistics'

export const everyEchoRarity = [5, 4] as const
export type EchoRarity = (typeof everyEchoRarity)[number]

export const everyEchoCost = [4, 3, 1] as const
export type EchoCost = (typeof everyEchoCost)[number]

export const everyEchoDangerous = ['해일', '노도', '거랑', '경파'] as const
export type EchoDangerous = (typeof everyEchoDangerous)[number]

export const everyCost4EchoPrimaryMainStats: Array<
  Exclude<
    EchoPrimaryMainStats,
    'energy' | 'ice' | 'fire' | 'electro' | 'wind' | 'light' | 'dark'
  >
> = ['hp', 'atk', 'def', 'cRate', 'cDmg', 'heal']
export const everyCost3EchoPrimaryMainStats: Array<
  Exclude<EchoPrimaryMainStats, 'cRate' | 'cDmg' | 'heal'>
> = [
  'hp',
  'atk',
  'def',
  'energy',
  'ice',
  'fire',
  'electro',
  'wind',
  'light',
  'dark',
]
export const everyCost1EchoPrimaryMainStats: Array<
  Exclude<
    EchoPrimaryMainStats,
    | 'energy'
    | 'ice'
    | 'fire'
    | 'electro'
    | 'wind'
    | 'light'
    | 'dark'
    | 'cRate'
    | 'cDmg'
    | 'heal'
  >
> = ['hp', 'atk', 'def']
export type Cost4EchoPrimaryMainStats =
  (typeof everyCost4EchoPrimaryMainStats)[number]
export type Cost3EchoPrimaryMainStats =
  (typeof everyCost3EchoPrimaryMainStats)[number]
export type Cost1EchoPrimaryMainStats =
  (typeof everyCost1EchoPrimaryMainStats)[number]
