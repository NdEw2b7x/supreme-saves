export { everyWeaponCategory, minmaxLevel } from './everyWeapon'
export type { EveryWeaponAtk1, Syntonize, WeaponCategory } from './everyWeapon'

export {
  mapElement,
  getEchoSecondaryMainStats,
  mapStatsName,
  mapStatsNameAbbr,
} from './everyStatistics'
export type {
  EchoMainStats,
  EchoPrimaryMainStats,
  EchoSecondaryMainStats,
  EchoSubStats,
  Stats,
  WeaponSubStats,
} from './everyStatistics'
export {
  everyCost4EchoPrimaryMainStats,
  everyCost3EchoPrimaryMainStats,
  everyCost1EchoPrimaryMainStats,
} from './everyEcho'
export type { EchoCost, EchoRarity } from './everyEcho'
export { everyMovement } from './Movement'
export type { ForteLineName, Movement } from './Movement'

export type Name = string

export { everyElement, elementStat } from './everyElement'
export type { EveryElement, Element as ResonatorElement } from './everyElement'

export { everyChain, everyRarity } from './everyRarity'
export type { EveryChain, EveryRarity } from './everyRarity'

export { everyHarmony } from './everyHarmory'
export type { Harmony } from './everyHarmory'

export const everyRasonanceChain = [0, 1, 2, 3, 4, 5, 6] as const
export type RasonanceChain = (typeof everyRasonanceChain)[number]

export const everyRank = [0, 1, 2, 3, 4, 5, 6] as const
export type Rank = (typeof everyRank)[number]

export type Trigger = 'basic' | 'heavy' | 'skill' | 'burst' | 'intro' | 'dmg'
