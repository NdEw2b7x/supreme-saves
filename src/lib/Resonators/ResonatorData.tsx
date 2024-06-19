import {
  EveryElement,
  EveryResonatorName,
  EveryStatistics,
  EveryWeaponCategory,
} from '../../types';

export default class ResonatorData {
  name;
  element;
  weaponCatergory;
  hp1;
  atk1;
  def1;
  minorForte;
  constructor({
    name,
    element,
    weaponCategory,
    basic: [hp1, atk1, def1],
    minorForte,
  }: {
    name: EveryResonatorName;
    element: EveryElement;
    weaponCategory: EveryWeaponCategory;
    basic: [number, number, number];
    minorForte: [Exclude<EveryStatistics, '공명 효율'>, Exclude<EveryStatistics, '공명 효율'>];
  }) {
    this.name = name;
    this.element = element;
    this.weaponCatergory = weaponCategory;
    this.hp1 = hp1;
    this.atk1 = atk1;
    this.def1 = def1;
    this.minorForte = minorForte;
  }
}
