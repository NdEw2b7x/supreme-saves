import { EveryWeaponAtk1, WeaponSubStats } from '../types';
import { getWeaponSubOptionValue1 } from './Weapons';

const getAscension = (level: number) => {
  if (level > 80) {
    return 6;
  } else if (level > 70) {
    return 5;
  } else if (level > 60) {
    return 4;
  } else if (level > 50) {
    return 3;
  } else if (level > 40) {
    return 2;
  } else if (level > 20) {
    return 1;
  } else {
    return 0;
  }
};

export const getHP = (hp1: number) => {
  return (level: number) => {
    return Math.floor(hp1 * (1 + (level - 1) * (7.5 / 89) + getAscension(level) * (2 / 3)));
  };
};
export const getATK = (atk1: number) => {
  return (level: number) => {
    let asc;
    if (level > 80) {
      asc = 0.75 + 0.75 + 0.75 + 0.75 + 0.5 + 0.5;
    } else if (level > 70) {
      asc = 0.75 + 0.75 + 0.75 + 0.75 + 0.5;
    } else if (level > 60) {
      asc = 0.75 + 0.75 + 0.75 + 0.75;
    } else if (level > 50) {
      asc = 0.75 + 0.75 + 0.75;
    } else if (level > 40) {
      asc = 0.75 + 0.75;
    } else if (level > 20) {
      asc = 0.75;
    } else {
      asc = 0;
    }
    return Math.floor(atk1 * (1 + (level - 1) * (7.5 / 89) + asc));
  };
};
export const getDEF = (def0: number) => {
  return (level: number) => {
    return Math.floor(def0 * (1 + (level - 1) * (22 / 3 / 89) + getAscension(level) * (35 / 54)));
  };
};

export const getWeaponAtk = (atk1: EveryWeaponAtk1) => {
  return (level: number) => {
    return Math.floor(atk1 * (1 + (7.5 * (level - 1)) / 89 + getAscension(level) * (2 / 3)));
  };
};
export const getWeaponSubOptionValue = (atk1: EveryWeaponAtk1, sub: WeaponSubStats) => {
  const sub1 = getWeaponSubOptionValue1(atk1, sub);
  return (level: number) => {
    return (sub1 * Math.floor((1 + (3.5 * Math.floor(level / 5)) / 18) * 1000)) / 1000;
  };
};

export const getPercent = (x: number) => {
  return (y: 1 | 2 | 3) => {
    return ((x * 100000) / 1000).toFixed(y) + '%';
  };
};

export const getSkillMultiply = (lv: number) => {
  return (m0: number) =>
    Math.ceil(
      10000 *
        m0 *
        (lv === 1
          ? 1
          : lv === 2
          ? 1.082
          : lv === 3
          ? 1.164
          : lv === 4
          ? 1.2788
          : lv === 5
          ? 1.3608
          : lv === 6
          ? 1.4551
          : lv === 7
          ? 1.5863
          : lv === 8
          ? 1.7175
          : lv === 9
          ? 1.8487
          : lv === 10
          ? 1.9881
          : lv === 11
          ? 2.1521
          : lv === 12
          ? 2.3161
          : lv === 13
          ? 2.4801
          : lv === 14
          ? 2.6441
          : lv === 15
          ? 2.8081
          : 0)
    ) / 10000;
};
