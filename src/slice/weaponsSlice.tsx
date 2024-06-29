import { createSlice } from '@reduxjs/toolkit';
import { ResonatorName, Name, Syntonize, Rank } from '../types';
import { WeaponCode, everyWeaponData } from '../lib/Weapons';

const name = 'weaponsSlice';

export type WeaponId = `weapon_${number}`;
export interface MyWeapon {
  식별: WeaponId;
  코드: WeaponCode;
  이름: Name;
  레벨: number;
  돌파: Rank;
  공진: Syntonize;
  스킬: {};
  장착: ResonatorName | '';
}

let initialState: { 무기: MyWeapon[]; 장착: Partial<Record<ResonatorName, WeaponId>> } = {
  무기: [],
  장착: {},
};
type InitialState = typeof initialState;

let weaponsOnDB = localStorage.getItem('무기');
if (weaponsOnDB) {
  initialState['무기'] = JSON.parse(weaponsOnDB) as MyWeapon[];
}

initialState['무기'].forEach((myWeapon) => {
  if (myWeapon['장착'] !== '') {
    initialState['장착'] = { ...initialState['장착'], [myWeapon['장착']]: myWeapon['식별'] };
  }
});

const save = (state: InitialState) => {
  localStorage.setItem('무기', JSON.stringify(state['무기']));
};

const reducers = {
  addWeapon: (state: InitialState, { payload }: { payload: WeaponCode }) => {
    const newWeapon: MyWeapon = {
      식별: `weapon_${Math.floor((9 * Math.random() + 1) * 100000000)}`,
      코드: payload,
      이름: everyWeaponData[payload].getName(),
      레벨: 1,
      돌파: 0,
      공진: 1,
      장착: '',
      스킬: {},
    };
    state['무기'].push(newWeapon);
    save(state);
  },
  changeWeaponLevel: (
    state: InitialState,
    { payload: { id, level } }: { payload: { id: WeaponId; level: number } }
  ) => {
    const nowWeapons = Object.fromEntries(state['무기'].map((i) => [i.식별, i]));
    nowWeapons[id]['레벨'] = level;
    state['무기'] = Object.values(nowWeapons);
    save(state);
  },
  changeSyntonize: (
    state: InitialState,
    { payload: { id, syntonize } }: { payload: { id: WeaponId; syntonize: 1 | 2 | 3 | 4 | 5 } }
  ) => {
    const nowWeapons = Object.fromEntries(
      state['무기'].map((myWeapon) => [myWeapon['식별'], myWeapon])
    );
    nowWeapons[id]['공진'] = syntonize;
    state['무기'] = Object.values(nowWeapons);
    save(state);
  },
  changeEquip: (
    state: InitialState,
    { payload: { id, equip } }: { payload: { id: WeaponId; equip: ResonatorName } }
  ) => {
    const currentWeapons = Object.fromEntries(state['무기'].map((i) => [i.식별, i]));
    const targetId = id;
    const guestOwner = equip;
    const targetInfo = currentWeapons[targetId];

    const hostOwner = targetInfo['장착'];
    const currentId = state['장착'][guestOwner];
    if (currentId) {
      // 맞교환
      targetInfo['장착'] = guestOwner;
      currentWeapons[currentId]['장착'] = hostOwner;
      state['장착'] = { ...state['장착'], [guestOwner]: targetId };
      if (hostOwner !== '') {
        state['장착'] = { ...state['장착'], [hostOwner]: currentId };
      }
    } else {
      // 전달
      targetInfo['장착'] = guestOwner;
      state['장착'] = { ...state['장착'], [guestOwner]: targetId };
    }
    state['무기'] = Object.values(currentWeapons);
    save(state);
    window.location.reload();
  },
};

const weaponsSlice = createSlice({ initialState, reducers, name });
export const { addWeapon, changeWeaponLevel, changeSyntonize, changeEquip } = weaponsSlice.actions;
export default weaponsSlice.reducer;
