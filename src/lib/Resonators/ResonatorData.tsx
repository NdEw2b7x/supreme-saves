import { EchoPrimaryMainStats, EveryElement, EveryWeaponCategory } from '../../types';

export default class ResonatorData {
  constructor({
    name,
    element,
    weaponCategory,
    base: [hp1, atk1, def1],
    minorFortes,
  }: {
    name: string;
    element: EveryElement;
    weaponCategory: EveryWeaponCategory;
    base: [number, number, number];
    minorFortes: [MinorForte, MinorForte];
  }) {
    this.name = name;
    this.element = element;
    this.weaponCatergory = weaponCategory;
    this.hp1 = hp1;
    this.atk1 = atk1;
    this.def1 = def1;
    this.minorFortes = minorFortes;
  }
  name;
  element;
  weaponCatergory;
  hp1;
  atk1;
  def1;
  minorFortes;
}

export type MinorForte = Exclude<EchoPrimaryMainStats, 'HP' | '공격력' | '방어력' | '공명 효율'>;
