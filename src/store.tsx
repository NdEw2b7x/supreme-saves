import { configureStore } from '@reduxjs/toolkit';
import grobalSlice from './slice/grobalSlice';
import resonatorsSlice from './slice/resonatorsSlice';
import weaponsSlice from './slice/weaponsSlice';
import echoesSlice from './slice/echoesSlice';
import triggerSlice from './slice/triggerSlice';
import enemySlice from './slice/enemySlice';

const reducer = {
  grobalSlice,
  resonatorsSlice,
  weaponsSlice,
  echoesSlice,
  triggerSlice,
  enemySlice,
};
const store = configureStore({ reducer });

export const { dispatch } = store;
export type State = ReturnType<typeof store.getState>;
export default store;
