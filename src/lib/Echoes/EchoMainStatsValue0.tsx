import { EchoCost, EchoPrimaryMainStats, EchoRarity } from '../../types';

export const echoMainStatsValue0: Record<
  EchoRarity,
  Record<EchoCost, Partial<Record<EchoPrimaryMainStats, number>>>
> = {
  5: {
    4: {
      hp: 0.066,
      atk: 0.066,
      def: 0.083,
      cRate: 0.044,
      cDmg: 0.088,
      heal: 0.052,
    },
    3: {
      hp: 0.06,
      atk: 0.06,
      def: 0.076,
      energy: 0.064,
      ice: 0.06,
      fire: 0.06,
      electro: 0.06,
      wind: 0.06,
      light: 0.06,
      dark: 0.06,
    },
    1: {
      hp: 0.0456,
      atk: 0.036,
      def: 0.036,
    },
  },
  4: {
    4: {
      hp: 0.049,
      atk: 0.049,
      def: 0.062,
      cRate: 0.033,
      cDmg: 0.066,
      heal: 0.039,
    },
    3: {
      hp: 0.045,
      atk: 0.045,
      def: 0.057,
      energy: 0.048,
      ice: 0.045,
      fire: 0.045,
      electro: 0.045,
      wind: 0.045,
      light: 0.045,
      dark: 0.045,
    },
    1: {
      hp: 0.034,
      atk: 0.027,
      def: 0.027,
    },
  },
} as const;
