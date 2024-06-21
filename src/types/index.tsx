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
  EchoPrimaryMainStats,
  EchoSecondaryMainStats,
  EchoSubStats,
  Statistics,
  WeaponSubStats,
} from './everyStatistics';
import {
  EchoCode,
  EchoCost,
  EchoRarity,
  everyEchoMainStatistics1cost,
  everyEchoMainStatistics3cost,
  everyEchoMainStats4cost,
} from './everyEcho';

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
  everyEchoMainStats4cost as everyEchoMainStatistics4cost,
  everyEchoMainStatistics3cost,
  everyEchoMainStatistics1cost,
  getWeaponName,
};
export type {
  Statistics,
  WeaponSubStats,
  EchoPrimaryMainStats,
  EchoSecondaryMainStats,
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
