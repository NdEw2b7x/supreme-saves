import { EveryWeaponAtk1 } from '../types';

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

export const getHP: (hp0: number, level: number) => number = (hp0, level) => {
  const asc = getAscension(level);
  const multiple = 1 + (level - 1) * (7.5 / 89) + asc * (2 / 3);
  return (hp0 * Math.floor(multiple * 10000)) / 10000;
};
export const getATK: (atk0: number, level: number) => number = (atk0, level) => {
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
  const multiple = 1 + (level - 1) * (7.5 / 89) + asc;
  return (atk0 * Math.floor(multiple * 10000)) / 10000;
};
export const getDEF: (def0: number, level: number) => number = (def0, level) => {
  const asc = getAscension(level);
  const multiple = 1 + (level - 1) * (22 / 3 / 89) + asc * (35 / 54);
  return (def0 * Math.floor(multiple * 10000)) / 10000;
};

export const getWeaponAtk = (atk1: EveryWeaponAtk1) => {
  return (level: number) => {
    return atk1 * (1 + (7.5 * (level - 1)) / 89 + getAscension(level) * (2 / 3));
  };
};
export const getWeaponSubOptionValue = (sub1: number) => {
  return (level: number) => {
    return (sub1 * Math.floor((1 + (3.5 * Math.floor(level / 5)) / 18) * 1000)) / 1000;
    // return sub1 * (1 + (3.5 * Math.floor(level / 5)) / 18);
  };
};

export const refine: (x: number) => string = (x) => {
  return x.toFixed(3);
};
