import { EveryWeaponSubOption } from '.';
import { EveryRarity, EveryWeaponCategory } from '../../types';

export default class WeaponData {
  constructor({
    code,
    atk1,
    subOption,
  }: {
    code: string;
    atk1: 24 | 26 | 27 | 31 | 33 | 40 | 47;
    subOption: EveryWeaponSubOption;
  }) {
    const getRarity: (x: string) => EveryRarity = (x: string) => {
      switch (x[0]) {
        case '5':
          return 5;
        case '4':
          return 4;
        default:
          return 3;
      }
    };
    const getWeaponType: (x: string) => EveryWeaponCategory = (x: string) => {
      switch (x[3]) {
        case '1':
          return '대검';
        case '2':
          return '직검';
        case '3':
          return '권총';
        case '4':
          return '권갑';
        default:
          return '증폭기';
      }
    };
    this.code = code;
    this.rarity = getRarity(code);
    this.category = getWeaponType(code);
    this.atk1 = atk1;
    this.subOption = subOption;
  }
  code;
  rarity;
  category;
  atk1;
  subOption;
}
