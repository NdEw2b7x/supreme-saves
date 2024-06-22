import { EveryElement, everyElement } from './everyElement';
import { Harmony, everyHarmony } from './everyHarmory';
import { EveryChain, EveryRarity, everyChain, everyRarity } from './everyRarity';
import {
  EveryResonatorNameWithoutRover,
  EveryResonatorName,
  everyResonatorNameWithoutRover,
  everyResonatorName,
} from './everyResonatorName';
import {
  EverySkillLevel,
  EverySkillType,
  SkillSet,
  everySkillLevel,
  everySkillType,
} from './everySkillType';
import { EveryWeaponCode, getWeaponName, weaponPivot } from './everyWeaponCode';
import { EveryWeaponCategory, everyWeaponCategory } from './everyWeaponCategory';
import { EveryWeaponAtk1 } from './everyWeapon';
import {
  EchoMainStats,
  EchoPrimaryMainStats,
  EchoSecondaryMainStats,
  EchoSubStats,
  Stats,
  WeaponSubStats,
  getElementMap,
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
  weaponPivot,
  everyCost4EchoPrimaryMainStats,
  everyCost3EchoPrimaryMainStats,
  everyCost1EchoPrimaryMainStats,
  getStatsName,
  getElementMap,
  getWeaponName,
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
  EveryResonatorName,
  EveryResonatorNameWithoutRover,
  EverySkillLevel,
  EverySkillType,
  EveryWeaponAtk1,
  EveryWeaponCode,
  EveryWeaponCategory,
  EchoCode,
  EchoCost,
  EchoRarity,
  SkillSet,
};
