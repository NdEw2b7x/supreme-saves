import { EveryWeaponSubOption } from '.';
import { EveryRarity, EveryWeaponCategory } from '../../types';

type EveryWeaponAtk1 = 24 | 26 | 27 | 31 | 33 | 40 | 47;

export const getWeaponSubOptionValue = (atk1: EveryWeaponAtk1, sub: EveryWeaponSubOption) => {
  switch (atk1) {
    case 27:
      switch (sub) {
        case '공명 효율':
          return 11.52;
        case '크리티컬 확률':
          return 7.2;
        case '크리티컬 피해':
          return 14.4;
        default:
          return 10.8;
      }
    case 31:
      switch (sub) {
        case '공명 효율':
          return 8.64;
        case '크리티컬 확률':
          return 5.4;
        case '크리티컬 피해':
          return 10.8;
        default:
          return 8.1;
      }
    case 33:
      switch (sub) {
        case '공명 효율':
          return 7.2;
        case '크리티컬 확률':
          return 4.5;
        case '크리티컬 피해':
          return 9.0;
        default:
          return 6.75;
      }
    case 40:
      switch (sub) {
        case '크리티컬 확률':
          return 8;
        case '크리티컬 피해':
          return 16;
        default:
          return 12;
      }
    case 47:
      switch (sub) {
        case '크리티컬 확률':
          return 5.4;
        case '크리티컬 피해':
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