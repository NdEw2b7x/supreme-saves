import { createSlice } from '@reduxjs/toolkit';
import { currentDBVersion } from './grobalSlice';
import { Name, Syntonize, Rank } from '../types';
import { ResonatorCode_ } from '../lib/Resonators';
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
  장착: ResonatorCode_ | '';
}

let initialState: { 무기: MyWeapon[]; 장착: Partial<Record<ResonatorCode_, WeaponId>> } = {
  무기: [],
  장착: {},
};
type InitialState = typeof initialState;

let DBversion = localStorage.getItem('버전');
let weaponsOnDB = localStorage.getItem('무기');
try {
  if (
    DBversion &&
    JSON.parse(DBversion) === currentDBVersion &&
    weaponsOnDB &&
    Array.isArray(JSON.parse(weaponsOnDB))
  ) {
    initialState['무기'] = JSON.parse(weaponsOnDB) as MyWeapon[];
  }
} catch (error) {
  console.log(error);
  localStorage.removeItem('무기');
}

initialState['무기'].forEach((myWeapon) => {
  if (myWeapon['장착'] !== '') {
    initialState['장착'] = { ...initialState['장착'], [myWeapon['장착']]: myWeapon['식별'] };
  }
});

const save = (state: InitialState) => {
  localStorage.setItem('무기', JSON.stringify(state['무기']));
  localStorage.setItem('버전', JSON.stringify(currentDBVersion));
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
    const nowWeapons = Object.fromEntries(state['무기'].map((i) => [i['식별'], i]));
    nowWeapons[id]['레벨'] = level;
    state['무기'] = Object.values(nowWeapons);
    save(state);
  },
  changeWeaponRank: (
    state: InitialState,
    { payload: { id, rank } }: { payload: { id: WeaponId; rank: Rank } }
  ) => {
    const currentWeapons = Object.fromEntries(state['무기'].map((i) => [i['식별'], i]));
    currentWeapons[id]['돌파'] = rank;
    const level = currentWeapons[id]['레벨'];
    currentWeapons[id]['레벨'] =
      rank === 6
        ? level > 80
          ? level
          : 80
        : rank === 5
        ? level > 80
          ? 80
          : level < 70
          ? 70
          : level
        : rank === 4
        ? level > 70
          ? 70
          : level < 60
          ? 60
          : level
        : rank === 3
        ? level > 60
          ? 60
          : level < 50
          ? 50
          : level
        : rank === 2
        ? level > 40
          ? 40
          : level < 20
          ? 20
          : level
        : rank === 1
        ? level > 20
          ? 20
          : level
        : 1;
    state['무기'] = Object.values(currentWeapons);
    save(state);
  },
  changeSyntonize: (
    state: InitialState,
    { payload: { id, syntonize } }: { payload: { id: WeaponId; syntonize: Syntonize } }
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
    {
      payload: { id: targetId, equip: guestOwner },
    }: { payload: { id: WeaponId; equip: ResonatorCode_ } }
  ) => {
    const currentWeapons = Object.fromEntries(state['무기'].map((i) => [i['식별'], i]));
    const targetInfo = currentWeapons[targetId];

    const hostOwner = targetInfo['장착'];
    const currentId = state['장착'][guestOwner];
    if (currentId) {
      targetInfo['장착'] = guestOwner;
      currentWeapons[currentId]['장착'] = hostOwner;
      state['장착'] = { ...state['장착'], [guestOwner]: targetId };
      if (hostOwner !== '') {
        state['장착'] = { ...state['장착'], [hostOwner]: currentId };
      }
    } else {
      targetInfo['장착'] = guestOwner;
      state['장착'] = { ...state['장착'], [guestOwner]: targetId };
    }
    state['무기'] = Object.values(currentWeapons);
    save(state);
  },
  deleteWeapon: (state: InitialState, { payload: { id } }: { payload: { id: WeaponId } }) => {
    const current = Object.fromEntries(state['무기'].map((i) => [i['식별'], i]));
    delete current[id];
    state['무기'] = Object.values(current);
    save(state);
  },
};

const weaponsSlice = createSlice({ initialState, reducers, name });
export const {
  addWeapon,
  changeWeaponLevel,
  changeWeaponRank,
  changeSyntonize,
  changeEquip,
  deleteWeapon,
} = weaponsSlice.actions;
export default weaponsSlice.reducer;
