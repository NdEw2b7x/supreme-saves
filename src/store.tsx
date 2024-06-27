import { configureStore } from '@reduxjs/toolkit';
import grobalSlice from './slice/grobalSlice';
import resonatorsSlice from './slice/resonatorsSlice';
import weaponsSlice from './slice/weaponsSlice';
import echoesSlice from './slice/echoesSlice';
import statisticsSlice from './slice/statisticsSlice';
import triggerSlice from './slice/triggerSlice';

const reducer = {
  grobalSlice,
  resonatorsSlice,
  weaponsSlice,
  echoesSlice,
  statisticsSlice,
  triggerSlice,
};
const store = configureStore({ reducer });

export const { dispatch } = store;
export type State = ReturnType<typeof store.getState>;
export default store;
