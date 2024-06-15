import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';

export default class ResonatorData {
  name;
  element;
  weaponCatergory;
  hp;
  atk;
  def;
  constructor(
    name: EveryResonatorName,
    element: EveryElement,
    weaponCategory: EveryWeaponCategory,
    [hp1, atk1, def1]: [number, number, number]
  ) {
    this.name = name;
    this.element = element;
    this.weaponCatergory = weaponCategory;
    this.hp = hp1;
    this.atk = atk1;
    this.def = def1;
  }
}
