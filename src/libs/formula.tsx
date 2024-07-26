import { MyResonator } from '../slice/resonatorsSlice';
import { EchoSubStats, EveryWeaponAtk1, Rank, WeaponSubStats } from '../types';
import { everyResonatorData } from './Resonators';
import { WeaponCode, everyWeaponData, getWeaponSubOptionValue1 } from './Weapons';

export const sum = ([...x]) => x.reduce((acc, cur) => acc + cur, 0);
export const product = ([...x]) => x.reduce((acc, cur) => acc * cur, 1);

export const getHP = (x: MyResonator): number => {
  return Math.floor(
    everyResonatorData[x['코드']].hp1 * (1 + (x['레벨'] - 1) * (7.5 / 89) + x['돌파'] * (2 / 3))
  );
};

export const getATK = (x: MyResonator) => {
  const mapAsc = {
    0: 0,
    1: 0.75,
    2: 0.75 + 0.75,
    3: 0.75 + 0.75 + 0.75,
    4: 0.75 + 0.75 + 0.75 + 0.75,
    5: 0.75 + 0.75 + 0.75 + 0.75 + 0.5,
    6: 0.75 + 0.75 + 0.75 + 0.75 + 0.5 + 0.5,
  };
  return Math.floor(
    everyResonatorData[x['코드']].atk1 * (1 + (x['레벨'] - 1) * (7.5 / 89) + mapAsc[x['돌파']])
  );
};

export const getDEF = (x: MyResonator): number => {
  return Math.floor(
    everyResonatorData[x['코드']].def1 *
      (1 + (x['레벨'] - 1) * (22 / 3 / 89) + x['돌파'] * (35 / 54))
  );
};

export const getWeaponAtk = ({
  code,
  rank,
  level,
}: {
  code: WeaponCode;
  rank: Rank;
  level: number;
}) => Math.floor(everyWeaponData[code].atk1 * sum([1, (7.5 * (level - 1)) / 89, rank * (2 / 3)]));

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

export const getSkillMultiply = (l: number) => (multiflier: number) =>
  Math.ceil(
    multiflier *
      10000 *
      (l === 1
        ? 1
        : l === 2
        ? 1.082
        : l === 3
        ? 1.164
        : l === 4
        ? 1.2788
        : l === 5
        ? 1.3608
        : l === 6
        ? 1.4551
        : l === 7
        ? 1.5863
        : l === 8
        ? 1.7175
        : l === 9
        ? 1.8487
        : l === 10
        ? 1.9881
        : l === 11
        ? 2.1521
        : l === 12
        ? 2.3161
        : l === 13
        ? 2.4801
        : l === 14
        ? 2.6441
        : l === 15
        ? 2.8081
        : 0)
  ) / 10000;

export const getHealMultiplier = (l: number) => (m1: number) =>
  Math.ceil(
    m1 *
      10000 *
      (l === 1
        ? 1
        : l === 2
        ? 1.15
        : l === 3
        ? 1.25
        : l === 4
        ? 1.4
        : l === 5
        ? 1.5
        : l === 6
        ? 1.6
        : l === 7
        ? 1.7
        : l === 8
        ? 1.8
        : l === 9
        ? 1.9
        : l === 10
        ? 2.1
        : 0)
  ) / 10000;

export const getHealExtra = (l: number) => (extra: number) =>
  Math.ceil(
    extra *
      (l === 1
        ? 1
        : l === 2
        ? 1.2
        : l === 3
        ? 1.4
        : l === 4
        ? 1.6
        : l === 5
        ? 1.65
        : l === 6
        ? 1.78
        : l === 7
        ? 1.8
        : l === 8
        ? 1.83
        : l === 9
        ? 1.86
        : l === 10
        ? 1.9
        : l === 11
        ? 2.057
        : l === 12
        ? 2.214
        : l === 13
        ? 2.371
        : l === 14
        ? 2.528
        : l === 15
        ? 2.684
        : 0)
  );

export const echoSubStatValues: Record<EchoSubStats, number[]> = {
  flatHp: [320, 360, 390, 430, 470, 510, 540, 580],
  flatAtk: [30, 40, 50],
  flatDef: [40, 50, 60],
  hp: [0.0639, 0.0709, 0.0789, 0.0859, 0.0939, 0.1009, 0.1089, 0.1159],
  atk: [0.0639, 0.0709, 0.0789, 0.0859, 0.0939, 0.1009, 0.1089, 0.1159],
  def: [0.081, 0.09, 0.1, 0.109, 0.118, 0.1277, 0.1375, 0.147],
  energy: [0.068, 0.076, 0.084, 0.092, 0.1, 0.108, 0.116, 0.124],
  cRate: [0.063, 0.069, 0.075, 0.081, 0.087, 0.093, 0.099, 0.105],
  cDmg: [0.126, 0.138, 0.15, 0.162, 0.174, 0.186, 0.198, 0.21],
  basic: [0.0639, 0.0709, 0.0789, 0.0859, 0.0939, 0.1009, 0.1089, 0.1159],
  heavy: [0.0639, 0.0709, 0.0789, 0.0859, 0.0939, 0.1009, 0.1089, 0.1159],
  skill: [0.0639, 0.0709, 0.0789, 0.0859, 0.0939, 0.1009, 0.1089, 0.1159],
  liberation: [0.0639, 0.0709, 0.0789, 0.0859, 0.0939, 0.1009, 0.1089, 0.1159],
};
