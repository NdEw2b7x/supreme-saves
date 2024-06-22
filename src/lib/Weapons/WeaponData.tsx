import { EveryRarity, EveryWeaponAtk1, EveryWeaponCategory, WeaponSubStats } from '../../types';

export const getWeaponSubOptionValue1 = (atk1: EveryWeaponAtk1, sub: WeaponSubStats) => {
  switch (atk1) {
    case 24:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 7.2;
        case 'cRate':
          return 0;
        case 'cDmg':
          return 0;
        default:
          return 6.75;
      }
    case 26:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 0;
        case 'cRate':
          return 0;
        case 'cDmg':
          return 0;
        default:
          return 5.4;
      }
    case 27:
      switch (sub) {
        case 'def':
          return 13.675;
        case 'energy':
          return 11.52;
        case 'cRate':
          return 7.2;
        case 'cDmg':
          return 14.4;
        default:
          return 10.8;
      }
    case 31:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 8.64;
        case 'cRate':
          return 5.4;
        case 'cDmg':
          return 10.8;
        default:
          return 8.1;
      }
    case 33:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 7.2;
        case 'cRate':
          return 4.5;
        case 'cDmg':
          return 9.0;
        default:
          return 6.75;
      }
    case 40:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 0;
        case 'cRate':
          return 8;
        case 'cDmg':
          return 16;
        default:
          return 12;
      }
    case 47:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 0;
        case 'cRate':
          return 5.4;
        case 'cDmg':
          return 10.8;
        default:
          return 8.1;
      }
    default:
      return 0;
  }
};

export default class WeaponData {
  constructor({
    code,
    atk1,
    subOption,
  }: {
    code: string;
    atk1: EveryWeaponAtk1;
    subOption: WeaponSubStats;
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
