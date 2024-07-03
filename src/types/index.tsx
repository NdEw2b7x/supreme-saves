import { EveryElement, everyElement, Element, elementStat } from './everyElement';
import { Harmony, everyHarmony } from './everyHarmory';
import { EveryChain, EveryRarity, everyChain, everyRarity } from './everyRarity';
import {
  EveryWeaponAtk1,
  Syntonize,
  WeaponCategory,
  everyWeaponCategory,
  minmaxLevel,
} from './everyWeapon';
import {
  EchoMainStats,
  EchoPrimaryMainStats,
  EchoSecondaryMainStats,
  EchoSubStats,
  Stats,
  WeaponSubStats,
  mapElement,
  getEchoSecondaryMainStats,
  mapStatsName,
  mapStatsNameAbbr,
} from './everyStatistics';
import {
  EchoCost,
  EchoRarity,
  everyCost4EchoPrimaryMainStats,
  everyCost3EchoPrimaryMainStats,
  everyCost1EchoPrimaryMainStats,
} from './everyEcho';
import { Movement, everyMovement } from './Movement';

export type Name = string;

export const everyRasonanceChain = [0, 1, 2, 3, 4, 5, 6] as const;
export type RasonanceChain = (typeof everyRasonanceChain)[number];

export const everyRank = [0, 1, 2, 3, 4, 5, 6] as const;
export type Rank = (typeof everyRank)[number];

export {
  everyChain,
  everyElement,
  everyHarmony,
  everyRarity,
  everyWeaponCategory,
  everyCost4EchoPrimaryMainStats,
  everyCost3EchoPrimaryMainStats,
  everyCost1EchoPrimaryMainStats,
  everyMovement,
  elementStat,
  mapElement,
  mapStatsName,
  mapStatsNameAbbr,
  minmaxLevel,
  getEchoSecondaryMainStats,
};
export type {
  Stats,
  WeaponSubStats,
  EchoPrimaryMainStats,
  EchoSecondaryMainStats,
  EchoMainStats,
  EchoSubStats,
  EveryChain,
  EveryElement,
  Syntonize,
  Harmony,
  EveryRarity,
  EveryWeaponAtk1,
  WeaponCategory,
  EchoCost,
  EchoRarity,
  Element,
  Movement,
};
