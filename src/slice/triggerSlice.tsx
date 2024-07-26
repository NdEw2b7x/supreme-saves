import { createSlice } from '@reduxjs/toolkit'
import { Trigger } from 'types'

const name = 'triggerSlice'
type InitialState = Record<Trigger, boolean> & {
  stack: { [x: string]: number }
}
const initialState: InitialState = {
  basic: false,
  heavy: false,
  skill: false,
  burst: false,
  intro: false,
  dmg: false,
  stack: {},
}

const reducers = {
  toggleTrigger: (state: InitialState, { payload }: { payload: Trigger }) => {
    return { ...state, [payload]: !state[payload] }
  },
  setStack: (
    state: InitialState,
    { payload: [name, stack] }: { payload: [name: string, stack: number] }
  ) => {
    return { ...state, stack: { ...state.stack, [name]: stack } }
  },
}

const triggerSlice = createSlice({ initialState, reducers, name })
export const { toggleTrigger, setStack } = triggerSlice.actions
export default triggerSlice.reducer
