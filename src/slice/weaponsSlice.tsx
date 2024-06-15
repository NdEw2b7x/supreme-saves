import { createSlice } from '@reduxjs/toolkit';
import { EveryResonatorName, EveryWeaponCode } from '../types';

const name = 'weaponsSlice';

interface MyWeapon {
  코드: EveryWeaponCode;
  레벨: number;
  중첩: 1 | 2 | 3 | 4 | 5;
  장착: EveryResonatorName | '미장착';
}
type WeaponId = `weapon_${number}`;
type MyWeapons = Partial<Record<WeaponId, MyWeapon>>;

type WeaponMapping = Partial<Record<EveryResonatorName, WeaponId>>;

let initialState: { 무기: MyWeapons; 맵핑: WeaponMapping } = { 무기: {}, 맵핑: {} };
type InitialState = typeof initialState;

let myWeapons = localStorage.getItem('무기');
if (myWeapons) {
  initialState['무기'] = JSON.parse(myWeapons) as MyWeapons;
}

let initMap: WeaponMapping = {};
const savedWeapons = initialState['무기'];
Object.keys(savedWeapons).forEach((i) => {
  const savedWeapon = savedWeapons[i as WeaponId];
  if (savedWeapon) {
    initMap = { ...initMap, [savedWeapon.장착]: i as WeaponId };
  }
});
initialState['맵핑'] = initMap;

const save = (state: InitialState) => {
  localStorage.setItem('무기', JSON.stringify(state['무기']));
};

const reducers = {
  addWeapon: (state: InitialState, action: { payload: EveryWeaponCode }) => {
    const newWeapon: MyWeapon = {
      코드: action.payload,
      레벨: 1,
      중첩: 1,
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
  changeStack: (
    state: InitialState,
    action: { payload: { id: WeaponId; stack: 1 | 2 | 3 | 4 | 5 } }
  ) => {
    const nowWeapons = state['무기'];
    const getWeapon = nowWeapons[action.payload.id];
    if (getWeapon) {
      getWeapon['중첩'] = action.payload.stack;
    }
    save(state);
  },
  changeEquip: (
    state: InitialState,
    action: { payload: { id: WeaponId; equip: EveryResonatorName } }
  ) => {
    const newOwnerName = action.payload.equip;
    const newOwnerNowWeapon = state['맵핑'][newOwnerName];
    const thisWeapon = state['무기'][action.payload.id];
    const thisWeaponOldOwner = thisWeapon?.장착;
    if (thisWeapon) {
      thisWeapon.장착 = newOwnerName;
    }
    if (newOwnerNowWeapon) {
      const thatWeapon = state['무기'][newOwnerNowWeapon];
      if (thatWeapon) {
        if (thisWeaponOldOwner) {
          thatWeapon.장착 = thisWeaponOldOwner;
        }
      }
    }
  },
};

const weaponsSlice = createSlice({ initialState, reducers, name });
export const { addWeapon, changeWeaponLevel, changeStack } = weaponsSlice.actions;
export default weaponsSlice.reducer;
