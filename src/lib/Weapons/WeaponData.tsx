import { WeaponCode } from '.';
import {
  EveryRarity,
  EveryWeaponAtk1,
  EveryWeaponCategory,
  Name,
  Stats,
  WeaponSubStats,
} from '../../types';

export type Trigger = 'basic' | 'heavy' | 'skill' | 'burst' | 'intro' | 'dmg';
export type WeaponSkill = {
  name?: Name;
  passive: { stat: Stats; s1: number; s5: number }[];
  active: {
    trigger: Trigger[];
    value: { stat: Stats; s1: number; s5: number }[];
    stackName?: Name;
    stack?: number;
  }[];
  field?: { on: boolean; stat: Stats; s1: number; s5: number }[];
};

export const getWeaponSubOptionValue1 = (atk1: EveryWeaponAtk1, sub: WeaponSubStats) => {
  switch (atk1) {
    case 24:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 0.072;
        case 'cRate':
          return 0;
        case 'cDmg':
          return 0;
        default:
          return 0.0675;
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
          return 0.054;
      }
    case 27:
      switch (sub) {
        case 'def':
          return 0.13675;
        case 'energy':
          return 0.1152;
        case 'cRate':
          return 0.072;
        case 'cDmg':
          return 0.144;
        default:
          return 0.108;
      }
    case 31:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 0.0864;
        case 'cRate':
          return 0.054;
        case 'cDmg':
          return 0.108;
        default:
          return 0.081;
      }
    case 33:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 0.072;
        case 'cRate':
          return 0.045;
        case 'cDmg':
          return 0.09;
        default:
          return 0.0675;
      }
    case 40:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 0;
        case 'cRate':
          return 0.08;
        case 'cDmg':
          return 0.16;
        default:
          return 0.12;
      }
    case 47:
      switch (sub) {
        case 'def':
          return 0;
        case 'energy':
          return 0;
        case 'cRate':
          return 0.054;
        case 'cDmg':
          return 0.108;
        default:
          return 0.081;
      }
    default:
      return 0;
  }
};

export default class WeaponData {
  constructor({
    code,
    name,
    atk1,
    subOption,
    skill,
  }: {
    code: string;
    name?: Name;
    atk1: EveryWeaponAtk1;
    subOption: WeaponSubStats;
    skill: WeaponSkill;
  }) {
    this.code = code;
    this.name = name;
    this.rarity = code[0] === '5' ? 5 : code[0] === '4' ? 4 : 3;
    this.category =
      code[3] === '1'
        ? '대검'
        : code[3] === '2'
        ? '직검'
        : code[3] === '3'
        ? '권총'
        : code[3] === '4'
        ? '권갑'
        : '증폭기';
    this.atk1 = atk1;
    this.subOption = subOption;
    this.skill = skill;
  }
  name?: Name;
  code;
  rarity: EveryRarity;
  category: EveryWeaponCategory;
  atk1;
  subOption;
  skill: WeaponSkill;

  weaponPivot: Partial<Record<WeaponCode, string>> = {
    // 5성
    // 대검
    w500100001: '푸른물결의 빛', // 5성 상시
    w500100002: '청룡의 천장', // 5성 한정 1.0.1
    w500100003: '태평성대', //5성 한정 1.1.1
    // 직검
    w500200001: '천년의 회류', // 5성 상시
    // 권총
    w500300001: '부동의 안개', // 5성 상시
    // 권갑
    w500400001: '물결의 파동', // 5성 상시
    // 증폭기
    w500500001: '파도의 기록', // 5성 상시
    w500500002: '꼭두각시의 손', // 5성 한정 1.0.2
    // 4성
    // 대검
    w400100001: '장야의 불빛', // 4성 금주 시리즈
    w400100002: '저무는 동녘', // 4성 천공 시리즈
    w400100003: '기묘한 울림', // 4성 음악 시리즈
    w400100004: '가을의 무늬', // 4성 보상 시리즈
    w400100005: '41형 대검 · 무거운 책임', // 4성 단조 시리즈
    // 직검
    w400200001: '야귀의 신념', // 4성 금주 시리즈
    w400200002: '상승의 서녘', // 4성 천공 시리즈
    w400200003: '행진의 서곡', // 4성 음악 시리즈
    w400200004: '천공의 광경', // 4성 보상 시리즈
    w400200005: '18형 직검 · 순간의 칼빛', // 4성 단조 시리즈
    // 권총
    w400300001: '불멸의 성화', // 4성 금주 시리즈
    w400300002: '천공의 순간', // 4성 천공 시리즈
    w400300003: '화려한 악곡', // 4성 음악 시리즈
    w400300004: '뇌전', // 4성 보상 시리즈
    w400300005: '26형 권총 · 맹렬한 돌격', // 4성 단조 시리즈
    // 권갑
    w400400001: '전우의 의리', // 4성 금주 시리즈
    w400400002: '천공의 역행', // 4성 천공 시리즈
    w400400003: '바람의 악센트', // 4성 음악 시리즈
    w400400004: '황금 권갑', // 4성 보상 시리즈
    w400400005: '21형 권갑 · 아이언 팬텀', // 4성 단조 시리즈
    // 증폭기
    w400500001: '금주의 수호', // 4성 금주 시리즈
    w400500002: '굉음', // 4성 천공 시리즈
    w400500003: '판타지 변주', // 4성 음악 시리즈
    w400500004: '청음', // 4성 보상 시리즈
    w400500005: '25형 증폭기 · 울림의 멜로디', // 4성 단조 시리즈
    // 3성
    // 대검
    // w300100002: '원능의 대검 · 견습I',
    // w300100003: '수행자의 대검 · 벽로',
    // w300100004: '수호자의 대검 · 근성',
    // // 직검
    // w300200002: '원능의 직검 · 견습II',
    // w300200003: '수행자의 직검 · 행적',
    // w300200004: '수호자의 직검 · 기민',
    // // 권총
    // w300300002: '원능의 권총 · 견습III',
    // w300300003: '수행자의 권총 · 통찰',
    // w300300004: '수호자의 권총 · 용맹',
    // // 권갑
    // w300400002: '원능의 권갑 · 견습IV',
    // w300400003: '수행자의 권갑 · 파괴',
    // w300400004: '수호자의 권갑 · 강력',
    // // 증폭기
    // w300500004: '수호자의 증폭기 · 모략',
  } as const;

  getName() {
    return this.name ?? (this.weaponPivot[('w' + this.code) as WeaponCode] as string);
  }
}
