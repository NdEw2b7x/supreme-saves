import { createSlice } from '@reduxjs/toolkit';
import { Trigger } from '../lib/Weapons';

const name = 'triggerSlice';

type InitialState = Record<Trigger, boolean> & { stack: number };
let initialState: InitialState = {
  basic: false,
  heavy: false,
  skill: false,
  burst: false,
  intro: false,
  dmg: false,
  stack: 0,
};

const reducers = {
  toggleTrigger: (state: InitialState, { payload }: { payload: Trigger }) => {
    return { ...state, [payload]: !state[payload] };
  },
  setStack: (state: InitialState, { payload }: { payload: number }) => {
    return { ...state, stack: payload };
  },
};

const triggerSlice = createSlice({ initialState, reducers, name });
export const { toggleTrigger, setStack } = triggerSlice.actions;
export default triggerSlice.reducer;
