import { createSlice } from '@reduxjs/toolkit';
import { currentDBVersion } from './grobalSlice';

const name = 'enemySlice';

let initialState: { 레벨: number; 저항: number } = { 레벨: 80, 저항: 0.1 };
type InitialState = typeof initialState;

let DBversion = localStorage.getItem('버전');
let enemyOnDB = localStorage.getItem('적');
try {
  if (
    DBversion &&
    JSON.parse(DBversion) === currentDBVersion &&
    enemyOnDB &&
    JSON.parse(enemyOnDB)
  ) {
    initialState = JSON.parse(enemyOnDB) as InitialState;
  }
} catch (error) {
  console.log(error);
  localStorage.removeItem('적');
}

const save = (state: InitialState) => {
  localStorage.setItem('적', JSON.stringify(state));
  localStorage.setItem('버전', JSON.stringify(currentDBVersion));
};

const reducers = {
  changeEnemyLevel: (state: InitialState, { payload }: { payload: number }) => {
    state['레벨'] = payload;
    save(state);
  },
  changeEnemyRes: (state: InitialState, { payload }: { payload: number }) => {
    state['저항'] = payload;
    save(state);
  },
};

const enemySlice = createSlice({ initialState, reducers, name });
export const { changeEnemyLevel, changeEnemyRes } = enemySlice.actions;
export default enemySlice.reducer;
