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

let initialState: { 무기: MyWeapons; 맵핑: WeaponMapping } = { 무기: {}, 맵핑: {} };
type InitialState = typeof initialState;

let myWeapons = localStorage.getItem('무기');
if (myWeapons) {
  initialState['무기'] = JSON.parse(myWeapons) as MyWeapons;
}

Object.entries(initialState['무기']).forEach(([id, myWeapon]) => {
  if (myWeapon && myWeapon['장착'] !== '미장착') {
    initialState['맵핑'] = { ...initialState['맵핑'], [myWeapon['장착']]: id };
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
    action: { payload: { id: WeaponId; equip: EveryResonatorName | '미장착' } }
  ) => {
    const id = action.payload.id;
    const newOwner = action.payload.equip;
    const targetWeapon = state['무기'][id] as MyWeapon;
    if (newOwner === '미장착') {
      state['무기'] = { ...state['무기'], [id]: { ...targetWeapon, 장착: '미장착' } };
      state['맵핑'] = { ...state['맵핑'], [targetWeapon.장착]: undefined };
    } else {
      const oldOwner = targetWeapon.장착;
      const oldWeaponId = state['맵핑'][newOwner];
      if (oldWeaponId) {
        const oldWeapon = state['무기'][oldWeaponId];
        state['무기'] = {
          ...state['무기'],
          [id]: { ...targetWeapon, 장착: newOwner },
          [oldWeaponId]: { ...oldWeapon, 장착: oldOwner },
        };
        state['맵핑'] = { ...state['맵핑'], [newOwner]: id, [oldOwner]: oldWeaponId };
      } else {
        state['무기'] = { ...state['무기'], [id]: { ...targetWeapon, 장착: newOwner } };
        state['맵핑'] = { ...state['맵핑'], [newOwner]: id };
      }
    }
    save(state);
    window.location.reload();
  },
};

const weaponsSlice = createSlice({ initialState, reducers, name });
export const { addWeapon, changeWeaponLevel, changeSyntonize, changeEquip } = weaponsSlice.actions;
export default weaponsSlice.reducer;
