import { createSlice } from '@reduxjs/toolkit';
import { currentDBVersion } from './grobalSlice';

const name = 'backpackSlice';

export const mapPlant = {
  Coral: '보라색 산호',
  Coriolus: '구름버섯',
  Fungus: '검은 연꽃',
  Iris: '붓꽃',
  Lanternberry: '등롱초',
  Pavo: '작령열매',
  Loong: '덴드로',
  Pecok: '공작화',
  Poppy: '개양귀비',
  Wintry: '인동국화',
} as const;
export type Plant = keyof typeof mapPlant;

export const mapWeeklyMeterial = {
  d1: '타종',
  d2: '스카',
  d3: '무망자',
  d4: '용',
  d5: '고래',
} as const;
export type WeeklyMeterial = keyof typeof mapWeeklyMeterial;

export const mapEpicMaterial = {
  B5: 'eorja',
  B4: 'eorja',
  B3: 'eorja',
  B2: 'eorja',
  S5: 'eorja',
  S4: 'eorja',
  S3: 'eorja',
  S2: 'eorja',
  P5: 'eorja',
  P4: 'eorja',
  P3: 'eorja',
  P2: 'eorja',
  G5: 'eorja',
  G4: 'eorja',
  G3: 'eorja',
  G2: 'eorja',
  Helix5: 'eorja',
  Helix4: 'eorja',
  Helix3: 'eorja',
  Helix2: 'eorja',
} as const;
export type EpicMaterial = keyof typeof mapEpicMaterial;
export const mapNormalMeterial = {
  Whisperin5: '전주파수 의음 성핵',
  Whisperin4: '고주파수 의음 성핵',
  Whisperin3: '중주파수 의음 성핵',
  Whisperin2: '저주파수 의음 성핵',
  Howler5: '전주파수 포효 성핵',
  Howler4: '고주파수 포효 성핵',
  Howler3: '중주파수 포효 성핵',
  Howler2: '저주파수 포효 성핵',
  Ring5: '링5',
  Ring4: '링5',
  Ring3: '링5',
  Ring2: '링2',
  Mask5: '마스크',
  Mask4: '마스크',
  Mask3: '마스크',
  Mask2: '마스크',
} as const;
export type NormalMeterial = keyof typeof mapNormalMeterial;

let initialState: Record<Plant | EpicMaterial | NormalMeterial | WeeklyMeterial, number> = {
  Iris: 0,
  Fungus: 0,
  Coriolus: 0,
  Lanternberry: 0,
  Pecok: 0,
  Poppy: 0,
  Wintry: 0,
  Coral: 0,
  Pavo: 0,
  Loong: 0,
  Whisperin5: 0,
  Whisperin4: 0,
  Whisperin3: 0,
  Whisperin2: 0,
  Howler5: 0,
  Howler4: 0,
  Howler3: 0,
  Howler2: 0,
  Ring5: 0,
  Ring4: 0,
  Ring3: 0,
  Ring2: 0,
  Mask5: 0,
  Mask4: 0,
  Mask3: 0,
  Mask2: 0,
  B5: 0,
  B4: 0,
  B3: 0,
  B2: 0,
  S5: 0,
  S4: 0,
  S3: 0,
  S2: 0,
  P5: 0,
  P4: 0,
  P3: 0,
  P2: 0,
  G5: 0,
  G4: 0,
  G3: 0,
  G2: 0,
  d1: 0,
  d2: 0,
  d3: 0,
  d4: 0,
  d5: 0,
  Helix5: 0,
  Helix4: 0,
  Helix3: 0,
  Helix2: 0,
};
type InitialState = typeof initialState;

let DBversion = localStorage.getItem('버전');
let backpackOnDB = localStorage.getItem('가방');
try {
  if (
    DBversion &&
    JSON.parse(DBversion) === currentDBVersion &&
    backpackOnDB &&
    Array.isArray(JSON.parse(backpackOnDB))
  ) {
    initialState = JSON.parse(backpackOnDB) as InitialState;
  }
} catch (error) {
  console.log(error);
  localStorage.removeItem('무기');
}

const save = (state: InitialState) => {
  localStorage.setItem('가방', JSON.stringify(state));
  localStorage.setItem('버전', JSON.stringify(currentDBVersion));
};

const reducers = {
  changeNumber: (
    state: InitialState,
    { payload: { name, number } }: { payload: { name: keyof InitialState; number: number } }
  ) => {
    state[name] = number;
    save(state);
  },
};

const backpackSlice = createSlice({ initialState, reducers, name });
export const { changeNumber } = backpackSlice.actions;
export default backpackSlice.reducer;
