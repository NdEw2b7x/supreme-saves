import { createSlice } from '@reduxjs/toolkit';
import {
  EveryChain,
  EveryElement,
  EveryRasonanceChain,
  EveryResonatorNameWithoutRover,
  EveryResonatorName,
  EverySkillLevel,
  EverySkillType,
  SkillSet,
} from '../types';

const name = 'resonatorsSlice';

let roverElement: EveryElement = '인멸';
const savedElement = localStorage.getItem('방랑자_속성');
if (savedElement) {
  roverElement = JSON.parse(savedElement);
} else {
  localStorage.setItem('방랑자_속성', JSON.stringify(roverElement));
}

type ERNR = EveryResonatorName;

export interface MyResonator {
  이름: ERNR;
  레벨: number;
  스킬: Record<EverySkillType, SkillSet>;
  체인: EveryRasonanceChain;
}

const defaultResonator = {
  레벨: 1,
  스킬: {
    '일반 공격': [1, false, false],
    '공명 스킬': [1, false, false],
    '공명 회로': [1, false, false],
    '공명 해방': [1, false, false],
    '변주 스킬': [1, false, false],
  },
  체인: 0,
};
const defaultRover = {
  이름: '방랑자',
  ...defaultResonator,
} as MyResonator;

export type MyResonators = Partial<Record<ERNR, MyResonator>>;

let initialState: { 공명자: MyResonators } = { 공명자: { 방랑자: defaultRover } };
type InitialState = typeof initialState;

let myResonators = localStorage.getItem('공명자');
if (myResonators) {
  initialState['공명자'] = JSON.parse(myResonators) as MyResonators;
}

const save = (state: InitialState) => {
  localStorage.setItem('공명자', JSON.stringify(state['공명자']));
};

const reducers = {
  addResonator: (state: InitialState, action: { payload: EveryResonatorNameWithoutRover }) => {
    const getResonators = state['공명자'];
    const newResonator: MyResonator = {
      이름: action.payload,
      레벨: 1,
      스킬: {
        '일반 공격': [1, false, false],
        '공명 스킬': [1, false, false],
        '공명 회로': [1, false, false],
        '공명 해방': [1, false, false],
        '변주 스킬': [1, false, false],
      },
      체인: 0,
    };
    state['공명자'] = { ...getResonators, [action.payload]: newResonator };
    save(state);
  },
  changeElement: (state: InitialState, action: { payload: EveryElement }) => {
    localStorage.setItem('방랑자_속성', JSON.stringify(action.payload));
    window.location.reload();
  },
  changeLevel: (state: InitialState, action: { payload: { name: ERNR; level: number } }) => {
    const getResonators = state['공명자'];
    const getResonator = getResonators[action.payload.name];
    if (getResonator?.레벨) {
      getResonator.레벨 = action.payload.level;
    }
    save(state);
  },
  changeSkillLevel: (
    state: InitialState,
    action: {
      payload: {
        name: ERNR;
        type: EverySkillType;
        level: EverySkillLevel;
      };
    }
  ) => {
    const getResonator = state['공명자'][action.payload.name];
    if (getResonator) {
      state['공명자'] = {
        ...state['공명자'],
        [action.payload.name]: {
          ...getResonator,
          스킬: {
            ...getResonator.스킬,
            [action.payload.type]: [
              action.payload.level,
              getResonator['스킬'][action.payload.type][1],
              getResonator['스킬'][action.payload.type][2],
            ],
          },
        },
      };
    }
    save(state);
  },
  toggleNode1: (state: InitialState, action: { payload: { name: ERNR; type: EverySkillType } }) => {
    const getResonator = state['공명자'][action.payload.name];
    if (getResonator) {
      if (getResonator['스킬'][action.payload.type][1]) {
        state['공명자'] = {
          ...state['공명자'],
          [action.payload.name]: {
            ...getResonator,
            스킬: {
              ...getResonator.스킬,
              [action.payload.type]: [getResonator['스킬'][action.payload.type][0], false, false],
            },
          },
        };
      } else {
        state['공명자'] = {
          ...state['공명자'],
          [action.payload.name]: {
            ...getResonator,
            스킬: {
              ...getResonator.스킬,
              [action.payload.type]: [getResonator['스킬'][action.payload.type][0], true, false],
            },
          },
        };
      }
    }
    save(state);
  },
  toggleNode2: (state: InitialState, action: { payload: { name: ERNR; type: EverySkillType } }) => {
    const getResonator = state['공명자'][action.payload.name];
    if (getResonator) {
      if (getResonator['스킬'][action.payload.type][2]) {
        state['공명자'] = {
          ...state['공명자'],
          [action.payload.name]: {
            ...getResonator,
            스킬: {
              ...getResonator.스킬,
              [action.payload.type]: [getResonator['스킬'][action.payload.type][0], true, false],
            },
          },
        };
      } else {
        state['공명자'] = {
          ...state['공명자'],
          [action.payload.name]: {
            ...getResonator,
            스킬: {
              ...getResonator.스킬,
              [action.payload.type]: [getResonator['스킬'][action.payload.type][0], true, true],
            },
          },
        };
      }
    }
    save(state);
  },
  changeChain: (state: InitialState, action: { payload: { name: ERNR; chain: EveryChain } }) => {
    const getResonators = state['공명자'];
    const getResonator = getResonators[action.payload.name];
    if (getResonator) {
      getResonator['체인'] = action.payload.chain;
    }
    save(state);
  },
};

const resonatorsSlice = createSlice({ initialState, reducers, name });
export const {
  addResonator,
  changeElement,
  changeLevel,
  changeSkillLevel,
  toggleNode1,
  toggleNode2,
  changeChain,
} = resonatorsSlice.actions;
export default resonatorsSlice.reducer;
