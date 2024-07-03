import { createSlice } from '@reduxjs/toolkit';
import { EveryChain, Element, RasonanceChain, Name, Rank } from '../types';
import { ResonatorCode, everyResonatorData, isRover } from '../lib/Resonators';
import { ForteLineName } from '../types/Movement';

const name = 'resonatorsSlice';

let roverElement: Element = 'dark';
const elementOnDB = localStorage.getItem('방랑자');
try {
  if (elementOnDB) {
    roverElement = JSON.parse(elementOnDB);
  } else {
    localStorage.setItem('방랑자', JSON.stringify(roverElement));
  }
} catch (error) {
  console.log(error);
  localStorage.removeItem('방랑자');
}

export const everySkillLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type SkillLevel = (typeof everySkillLevel)[number];
export type SkillSet = { level: SkillLevel; subNode: [boolean, boolean] };

export interface MyResonator {
  코드: ResonatorCode;
  이름: Name;
  레벨: number;
  돌파: Rank;
  스킬: Record<ForteLineName, { 레벨: SkillLevel; 연결점: [boolean, boolean] }>;
  체인: RasonanceChain;
}

const defaultRover: MyResonator = {
  코드: 'RoverDark',
  이름: '방랑자',
  레벨: 1,
  돌파: 0,
  스킬: {
    '일반 공격': { 레벨: 1, 연결점: [false, false] },
    '공명 스킬': { 레벨: 1, 연결점: [false, false] },
    '공명 회로': { 레벨: 1, 연결점: [false, false] },
    '공명 해방': { 레벨: 1, 연결점: [false, false] },
    '변주 스킬': { 레벨: 1, 연결점: [false, false] },
  },
  체인: 0,
};

let initialState: { 공명자: MyResonator[]; element: Element } = {
  공명자: [defaultRover],
  element: 'dark',
};
type InitialState = typeof initialState;

// let DBversion = localStorage.getItem('버전');
let resonatorsOnDB = localStorage.getItem('공명자');
try {
  if (resonatorsOnDB) {
    if (Array.isArray(JSON.parse(resonatorsOnDB))) {
      initialState['공명자'] = JSON.parse(resonatorsOnDB);
    } else {
      localStorage.removeItem('공명자');
    }
  }
} catch (error) {
  console.log(error);
}

const save = (state: InitialState) => {
  localStorage.setItem('공명자', JSON.stringify(state['공명자']));
};

const reducers = {
  addResonator: (state: InitialState, { payload }: { payload: ResonatorCode }) => {
    state['공명자'].push({
      코드: payload,
      이름: everyResonatorData[payload].name,
      레벨: 1,
      돌파: 0,
      스킬: {
        '일반 공격': { 레벨: 1, 연결점: [false, false] },
        '공명 스킬': { 레벨: 1, 연결점: [false, false] },
        '공명 회로': { 레벨: 1, 연결점: [false, false] },
        '공명 해방': { 레벨: 1, 연결점: [false, false] },
        '변주 스킬': { 레벨: 1, 연결점: [false, false] },
      },
      체인: 0,
    } as MyResonator);
    save(state);
  },
  changeElement: (state: InitialState, { payload }: { payload: Element }) => {
    localStorage.setItem('방랑자', JSON.stringify(payload));
    state['element'] = payload;
  },
  changeRank: (
    state: InitialState,
    { payload: { code, rank } }: { payload: { code: ResonatorCode; rank: Rank } }
  ) => {
    const current = Object.fromEntries(state['공명자'].map((i) => [i['코드'], i]));
    const getResonator = current[code];
    getResonator['돌파'] = rank;
    if (isRover(code)) {
      (['RoverLight', 'RoverDark'] as ResonatorCode[]).forEach((code) => {
        if (current[code]) {
          current[code]['돌파'] = rank;
        }
      });
    }
    state['공명자'] = Object.values(current);
    save(state);
  },
  changeLevel: (
    state: InitialState,
    { payload: { code, level } }: { payload: { code: ResonatorCode; level: number } }
  ) => {
    const current = Object.fromEntries(state['공명자'].map((i) => [i['코드'], i]));
    const getResonator = current[code];
    getResonator['레벨'] = level;
    if (isRover(code)) {
      (['RoverLight', 'RoverDark'] as ResonatorCode[]).forEach((code) => {
        if (current[code]) {
          current[code]['레벨'] = level;
        }
      });
    }
    state['공명자'] = Object.values(current);
    save(state);
  },
  changeSkillLevel: (
    state: InitialState,
    {
      payload: { code, line, level },
    }: {
      payload: {
        code: ResonatorCode;
        line: ForteLineName;
        level: SkillLevel;
      };
    }
  ) => {
    const current = Object.fromEntries(state['공명자'].map((i) => [i['코드'], i]));
    current[code]['스킬'][line]['레벨'] = level;
    state['공명자'] = Object.values(current);
    save(state);
  },
  toggleNode: (
    state: InitialState,
    {
      payload: { code, line, order },
    }: { payload: { code: ResonatorCode; line: ForteLineName; order: 1 | 2 } }
  ) => {
    const current = Object.fromEntries(state['공명자'].map((i) => [i['코드'], i]));
    const getResonator = current[code];
    if (order === 1) {
      if (getResonator['스킬'][line]['연결점'][0]) {
        getResonator['스킬'][line]['연결점'] = [false, false];
      } else {
        getResonator['스킬'][line]['연결점'] = [true, false];
      }
    } else {
      if (getResonator['스킬'][line]['연결점'][1]) {
        getResonator['스킬'][line]['연결점'] = [true, false];
      } else {
        getResonator['스킬'][line]['연결점'] = [true, true];
      }
    }
    state['공명자'] = Object.values(current);
    save(state);
  },
  changeChain: (
    state: InitialState,
    { payload: { code, chain } }: { payload: { code: ResonatorCode; chain: EveryChain } }
  ) => {
    const current = Object.fromEntries(state['공명자'].map((i) => [i['코드'], i]));
    current[code]['체인'] = chain;
    state['공명자'] = Object.values(current);
    save(state);
  },
};

const resonatorsSlice = createSlice({ initialState, reducers, name });
export const {
  addResonator,
  changeElement,
  changeRank,
  changeLevel,
  changeSkillLevel,
  toggleNode,
  changeChain,
} = resonatorsSlice.actions;
export default resonatorsSlice.reducer;
