import { Rank } from '.'

export const everyWeaponCategory = [
  '대검',
  '직검',
  '권총',
  '권갑',
  '증폭기',
] as const
export type WeaponCategory = (typeof everyWeaponCategory)[number]

export type EveryWeaponAtk1 = 24 | 26 | 27 | 31 | 33 | 40 | 47
export type Syntonize = 1 | 2 | 3 | 4 | 5

export const minmaxLevel: Record<Rank, { min: number; max: number }> = {
  0: {
    min: 1,
    max: 20,
  },
  1: {
    min: 20,
    max: 40,
  },
  2: {
    min: 40,
    max: 50,
  },
  3: {
    min: 50,
    max: 60,
  },
  4: {
    min: 60,
    max: 70,
  },
  5: {
    min: 70,
    max: 80,
  },
  6: {
    min: 80,
    max: 90,
  },
}
