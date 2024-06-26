import { EveryElement, everyElement } from './everyElement';
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
import { EveryWeaponCode } from './everyWeaponCode';
import { EveryWeaponCategory, everyWeaponCategory } from './everyWeaponCategory';
import { EveryWeaponAtk1 } from './everyWeapon';
import {
  EchoMainStats,
  EchoPrimaryMainStats,
  EchoSecondaryMainStats,
  EchoSubStats,
  Stats,
  WeaponSubStats,
  elementMap,
  getElementMap,
  getStatsAbbr,
  getStatsName,
} from './everyStatistics';
import {
  EchoCode,
  EchoCost,
  EchoRarity,
  everyCost4EchoPrimaryMainStats,
  everyCost3EchoPrimaryMainStats,
  everyCost1EchoPrimaryMainStats,
} from './everyEcho';

export type Name = string;

export const everyRasonanceChain = [0, 1, 2, 3, 4, 5, 6] as const;
export type EveryRasonanceChain = (typeof everyRasonanceChain)[number];

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
  elementMap,
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
  Harmony,
  EveryRarity,
  ResonatorName,
  EveryResonatorNameWithoutRover,
  SkillLevel,
  EverySkillType,
  EveryWeaponAtk1,
  EveryWeaponCode,
  EveryWeaponCategory,
  EchoCode,
  EchoCost,
  EchoRarity,
  SkillSet,
};
