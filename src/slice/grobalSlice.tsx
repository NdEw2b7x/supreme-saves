import { createSlice } from '@reduxjs/toolkit';
import {
  EchoCost,
  EveryElement,
  EveryRarity,
  EveryResonatorName,
  EveryWeaponCategory,
} from '../types';

// localStorage.clear();
// sessionStorage.clear();

const name = 'grobalSlice';

export const everyPage = ['공명자', '무기', '에코', '기타'] as const;
export type EveryPage = (typeof everyPage)[number];
export const everySubPage = ['', '추가', '상세'] as const;
export type EverySubPage = (typeof everySubPage)[number];

interface InitialFilter {
  element: Record<EveryElement, boolean>;
  rarity: Record<EveryRarity, boolean>;
  weaponCategory: Record<EveryWeaponCategory, boolean>;
  cost: Record<EchoCost, boolean>;
}
interface InitialState {
  page: EveryPage;
  subPage: EverySubPage;
  detail?: EveryResonatorName;
  filter: InitialFilter;
}
const initialFilter: InitialFilter = {
  element: { 응결: true, 용융: true, 전도: true, 기류: true, 회절: true, 인멸: true },
  rarity: { 5: true, 4: true, 3: true },
  weaponCategory: { 대검: true, 직검: true, 권총: true, 권갑: true, 증폭기: true },
  cost: { 4: true, 3: true, 1: true },
} as const;
const initialState: InitialState = { page: '공명자', subPage: '', filter: initialFilter };

const modeFromStorage = sessionStorage.getItem('page');
if (modeFromStorage) {
  initialState.page = JSON.parse(modeFromStorage) as EveryPage;
}
const filterFromStorage = sessionStorage.getItem('filter');
if (filterFromStorage) {
  initialState.filter = JSON.parse(filterFromStorage) as InitialFilter;
}
const reducers = {
  changePage: (state: InitialState, action: { payload: EveryPage }) => {
    const selected = action.payload;
    state.page = selected;
    state.subPage = '';
    sessionStorage.setItem('page', JSON.stringify(selected));
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
        filter: keyof InitialFilter;
        item: EveryRarity | EveryWeaponCategory | EveryElement | EchoCost;
      };
    }
  ) => {
    const item = action.payload.item;
    switch (item) {
      case 5:
      case 4:
      case 3:
      case 1:
        if (action.payload.filter === 'rarity' && item !== 1) {
          const filterR = state.filter.rarity;
          const nowR = filterR[item];
          const countTrueR = Object.values(filterR).filter((i) => i === true).length;
          if (countTrueR === 3) {
            Object.entries(filterR).forEach(([rarity]) => {
              filterR[Number(rarity) as EveryRarity] = false;
            });
            filterR[item] = true;
          } else if (countTrueR === 1) {
            if (filterR[item]) {
              Object.entries(filterR).forEach(([rarity]) => {
                filterR[Number(rarity) as EveryRarity] = true;
              });
            } else {
              filterR[item] = !nowR;
            }
          } else {
            filterR[item] = !nowR;
          }
        } else if (item !== 5) {
          const filterC = state.filter.cost;
          const nowC = filterC[item];
          const countTrueC = Object.values(filterC).filter((i) => i === true).length;
          if (countTrueC === 3) {
            Object.entries(filterC).forEach(([cost]) => {
              filterC[Number(cost) as EchoCost] = false;
            });
            filterC[item] = true;
          } else if (countTrueC === 1) {
            if (filterC[item]) {
              Object.entries(filterC).forEach(([cost]) => {
                filterC[Number(cost) as EchoCost] = true;
              });
            } else {
              filterC[item] = !nowC;
            }
          } else {
            filterC[item] = !nowC;
          }
        }
        break;
      case '대검':
      case '직검':
      case '권총':
      case '권갑':
      case '증폭기':
        const filterW = state.filter.weaponCategory;
        const nowW = filterW[item];
        const countTrueW = Object.values(filterW).filter((i) => i === true).length;
        if (countTrueW === 5) {
          Object.entries(filterW).forEach(([category]) => {
            filterW[category as EveryWeaponCategory] = false;
          });
          filterW[item] = true;
        } else if (countTrueW === 1) {
          if (filterW[item]) {
            Object.entries(filterW).forEach(([category]) => {
              filterW[category as EveryWeaponCategory] = true;
            });
          } else {
            filterW[item] = !nowW;
          }
        } else {
          filterW[item] = !nowW;
        }
        break;
      case '응결':
      case '용융':
      case '전도':
      case '기류':
      case '회절':
      case '인멸':
        const filterE = state.filter.element;
        const nowE = filterE[item];
        const countTrueE = Object.values(filterE).filter((i) => i === true).length;
        if (countTrueE === 6) {
          Object.entries(filterE).forEach(([e]) => {
            filterE[e as EveryElement] = false;
          });
          filterE[item] = true;
        } else if (countTrueE === 1) {
          if (filterE[item]) {
            Object.entries(filterE).forEach(([e]) => {
              filterE[e as EveryElement] = true;
            });
          } else {
            filterE[item] = !nowE;
          }
        } else {
          filterE[item] = !nowE;
        }
        break;
    }
    sessionStorage.setItem('filter', JSON.stringify(state.filter));
  },
};
const grobalSlice = createSlice({ name, initialState, reducers });

export const { changePage, changeSubPage, selectDetail, changefilter } = grobalSlice.actions;
export default grobalSlice.reducer;
