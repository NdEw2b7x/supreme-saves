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
import { EveryStatistics, everyStatistics } from './everyStatistics';
import { EchoCost } from './everyEcho';

export const everyRasonanceChain = [0, 1, 2, 3, 4, 5, 6] as const;
export type EveryRasonanceChain = (typeof everyRasonanceChain)[number];

export {
  everyStatistics,
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
  getWeaponName,
};
export type {
  EveryStatistics,
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
  EchoCost,
  SkillSet,
};
