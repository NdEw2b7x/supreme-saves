import { EveryElement, everyElement, Element, elementStat } from './everyElement';
import { Harmony, everyHarmony } from './everyHarmory';
import { EveryChain, EveryRarity, everyChain, everyRarity } from './everyRarity';
import {
  EveryResonatorNameWithoutRover,
  ResonatorName,
  everyResonatorNameWithoutRover,
  everyResonatorName,
} from './everyResonatorName';
import {
  SkillLevel,
  EverySkillType,
  SkillSet,
  everySkillLevel,
  everySkillType,
} from './everySkillType';
import { EveryWeaponCategory, everyWeaponCategory } from './everyWeaponCategory';
import { EveryWeaponAtk1, Syntonize } from './everyWeapon';
import {
  EchoMainStats,
  EchoPrimaryMainStats,
  EchoSecondaryMainStats,
  EchoSubStats,
  Stats,
  WeaponSubStats,
  mapElement,
  getElementMap,
  getStatsAbbr,
  getStatsName,
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
  everyResonatorName,
  everyResonatorNameWithoutRover,
  everySkillLevel,
  everySkillType,
  everyWeaponCategory,
  everyCost4EchoPrimaryMainStats,
  everyCost3EchoPrimaryMainStats,
  everyCost1EchoPrimaryMainStats,
  everyMovement,
  elementStat,
  mapElement,
  getStatsName,
  getStatsAbbr,
  getElementMap,
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
  ResonatorName,
  EveryResonatorNameWithoutRover,
  SkillLevel,
  EverySkillType,
  EveryWeaponAtk1,
  EveryWeaponCategory,
  EchoCost,
  EchoRarity,
  SkillSet,
  Element,
  Movement,
};
