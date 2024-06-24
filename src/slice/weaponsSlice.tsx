import { createSlice } from '@reduxjs/toolkit';
import { EveryResonatorName, EveryWeaponCode } from '../types';

const name = 'weaponsSlice';

export interface MyWeapon {
  코드: EveryWeaponCode;
  레벨: number;
  공진: 1 | 2 | 3 | 4 | 5;
  장착: EveryResonatorName | '미장착';
}
export type WeaponId = `weapon_${number}`;
export type MyWeapons = Partial<Record<WeaponId, MyWeapon>>;

type WeaponMapping = Partial<Record<EveryResonatorName, WeaponId>>;

let initialState: { 무기: MyWeapons; 장착: WeaponMapping } = { 무기: {}, 장착: {} };
type InitialState = typeof initialState;

let myWeapons = localStorage.getItem('무기');
if (myWeapons) {
  initialState['무기'] = JSON.parse(myWeapons) as MyWeapons;
}

Object.entries(initialState['무기']).forEach(([id, myWeapon]) => {
  if (myWeapon && myWeapon['장착'] !== '미장착') {
    initialState['장착'] = { ...initialState['장착'], [myWeapon['장착']]: id };
  }
});

const save = (state: InitialState) => {
  localStorage.setItem('무기', JSON.stringify(state['무기']));
};

const reducers = {
  addWeapon: (state: InitialState, action: { payload: EveryWeaponCode }) => {
    const newWeapon: MyWeapon = {
      코드: action.payload,
      레벨: 1,
      공진: 1,
      장착: '미장착',
    };
    state['무기'] = {
      ...state['무기'],
      ['weapon_' + Math.floor((9 * Math.random() + 1) * 100000000).toString()]: newWeapon,
    };
    save(state);
  },
  changeWeaponLevel: (
    state: InitialState,
    action: { payload: { id: WeaponId; level: number } }
  ) => {
    const nowWeapons = state['무기'];
    const getWeapon = nowWeapons[action.payload.id];
    if (getWeapon?.레벨) {
      getWeapon.레벨 = action.payload.level;
    }
    save(state);
  },
  changeSyntonize: (
    state: InitialState,
    action: { payload: { id: WeaponId; rank: 1 | 2 | 3 | 4 | 5 } }
  ) => {
    const nowWeapons = state['무기'];
    const getWeapon = nowWeapons[action.payload.id];
    if (getWeapon) {
      getWeapon['공진'] = action.payload.rank;
    }
    save(state);
  },
  changeEquip: (
    state: InitialState,
    action: { payload: { id: WeaponId; equip: EveryResonatorName } }
  ) => {
    const targetId = action.payload.id;
    const guestOwner = action.payload.equip;
    const targetInfo = state['무기'][targetId] as MyWeapon;

    const hostOwner = targetInfo['장착'];
    const currentId = state['장착'][guestOwner];
    if (currentId) {
      const currentInfo = state['무기'][currentId];
      state['무기'] = {
        ...state['무기'],
        [targetId]: { ...targetInfo, 장착: guestOwner },
        [currentId]: { ...currentInfo, 장착: hostOwner },
      };
      state['장착'] = { ...state['장착'], [guestOwner]: targetId };
      if (hostOwner !== '미장착') {
        state['장착'] = { ...state['장착'], [hostOwner]: currentId };
      }
    } else {
      state['무기'] = { ...state['무기'], [targetId]: { ...targetInfo, 장착: guestOwner } };
      state['장착'] = { ...state['장착'], [guestOwner]: targetId };
    }
    save(state);
    window.location.reload();
  },
};

const weaponsSlice = createSlice({ initialState, reducers, name });
export const { addWeapon, changeWeaponLevel, changeSyntonize, changeEquip } = weaponsSlice.actions;
export default weaponsSlice.reducer;
