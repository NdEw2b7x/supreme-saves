import { EveryElement, everyElement } from './everyElement';
import { EveryHarmory, everyHarmory } from './everyHarmory';
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

export const everyRasonanceChain = [0, 1, 2, 3, 4, 5, 6] as const;
export type EveryRasonanceChain = (typeof everyRasonanceChain)[number];

export {
  everyChain,
  everyElement,
  everyHarmory,
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
  EveryChain,
  EveryElement,
  EveryHarmory,
  EveryRarity,
  EveryResonatorName,
  EveryResonatorNameWithoutRover,
  EverySkillLevel,
  EverySkillType,
  EveryWeaponAtk1,
  EveryWeaponCode,
  EveryWeaponCategory,
  SkillSet,
};
