import { configureStore } from '@reduxjs/toolkit';
import grobalSlice from './slice/grobalSlice';
import resonatorsSlice from './slice/resonatorsSlice';
import weaponsSlice from './slice/weaponsSlice';

const reducer = {
  grobalSlice,
  resonatorsSlice,
  weaponsSlice,
};
const store = configureStore({ reducer });

export const { dispatch } = store;
export type State = ReturnType<typeof store.getState>;
export default store;
