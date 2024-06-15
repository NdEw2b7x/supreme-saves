import { createSlice } from '@reduxjs/toolkit';
import { EveryElement, EveryRarity, EveryResonatorName, EveryWeaponCategory } from '../types';

const name = 'grobalSlice';

export const everyPage = ['공명자', '무기', '에코', '기타'] as const;
export type EveryPage = (typeof everyPage)[number];
export const everySubPage = ['', '추가', '상세'] as const;
export type EverySubPage = (typeof everySubPage)[number];
const initialFilter = {
  rarity: { 5: true, 4: true, 3: true },
  weaponCategory: { 대검: true, 직검: true, 권총: true, 권갑: true, 증폭기: true },
  element: { 응결: true, 용융: true, 전도: true, 기류: true, 회절: true, 인멸: true },
};

const initialState: {
  page: EveryPage;
  subPage: EverySubPage;
  detail?: EveryResonatorName;
  filter: typeof initialFilter;
} = { page: '공명자', subPage: '', filter: initialFilter };
type InitialState = typeof initialState;

const storedMode = sessionStorage.getItem('page');
if (storedMode) {
  const modeCheck = function (value: string): value is EveryPage {
    return everyPage.includes(value as EveryPage);
  };
  if (modeCheck(storedMode)) {
    initialState.page = storedMode;
  }
}
const reducers = {
  changePage: (state: InitialState, action: { payload: EveryPage }) => {
    const selected = action.payload;
    state.page = selected;
    state.subPage = '';
    sessionStorage.setItem('page', selected);
  },
  changeSubPage: (state: InitialState, action: { payload: EverySubPage }) => {
    state.subPage = action.payload;
  },
  selectDetail: (state: InitialState, action: { payload: EveryResonatorName }) => {
    state.detail = action.payload;
  },
  changefilter: (
    state: InitialState,
    action: {
      payload: {
        filter: 'rarity' | 'element' | 'weaponCategory';
        item: EveryRarity | EveryWeaponCategory | EveryElement;
      };
    }
  ) => {
    const item = action.payload.item;
    switch (item) {
      case 5:
      case 4:
      case 3:
        state.filter.rarity[item] = !state.filter.rarity[item];
        break;
      case '대검':
      case '직검':
      case '권총':
      case '권갑':
      case '증폭기':
        state.filter.weaponCategory[item] = !state.filter.weaponCategory[item];
        break;
      case '응결':
      case '용융':
      case '전도':
      case '기류':
      case '회절':
      case '인멸':
        state.filter.element[item] = !state.filter.element[item];
        break;
    }
  },
};
const grobalSlice = createSlice({ name, initialState, reducers });

export const { changePage, changeSubPage, selectDetail, changefilter } = grobalSlice.actions;
export default grobalSlice.reducer;
