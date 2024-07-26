import { configureStore } from '@reduxjs/toolkit'
import enemySlice from './slice/enemySlice'
import {
  echoesSlice,
  grobalSlice,
  resonatorsSlice,
  weaponsSlice,
  triggerSlice,
} from './slice'

const reducer = {
  grobalSlice,
  resonatorsSlice,
  weaponsSlice,
  echoesSlice,
  triggerSlice,
  enemySlice,
}
const store = configureStore({ reducer })

export const { dispatch } = store
export type State = ReturnType<typeof store.getState>
export default store
