import { createSlice } from '@reduxjs/toolkit';
import { ResonatorName, Stats } from '../types';

const name = 'statisticsSlice';

// const values: Record<Stats, number> = {
//   hp: 0,
//   atk: 0,
//   def: 0,
//   energy: 0,
//   ice: 0,
//   fire: 0,
//   electro: 0,
//   wind: 0,
//   light: 0,
//   dark: 0,
//   cRate: 0,
//   cDmg: 0,
//   heal: 0,
//   basic: 0,
//   heavy: 0,
//   skill: 0,
//   burst: 0,
//   flatHp: 0,
//   flatAtk: 0,
//   flatDef: 0,
// };

let initialState: { name: ResonatorName; stats: Record<Stats, number> }[] = [];
type InitialState = typeof initialState;

const reducers = {
  cacheStats: (
    state: InitialState,
    { payload: { name, stats } }: { payload: { name: ResonatorName; stats: Record<Stats, number> } }
  ) => {
    return Object.entries(
      Object.fromEntries(
        state
          .map(({ name, stats }) => {
            return [name, stats] as const;
          })
          .concat([name, stats])
      )
    ).map(([n, stats]) => {
      const name = n as ResonatorName;
      return { name, stats };
    });
  },
};

const statisticsSlice = createSlice({ initialState, reducers, name });
export const { cacheStats: cache } = statisticsSlice.actions;
export default statisticsSlice.reducer;
