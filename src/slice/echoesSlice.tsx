import { createSlice } from '@reduxjs/toolkit';
import { EchoCode, EchoRarity, EveryResonatorName, Harmony } from '../types';
import { everyEchoData } from '../lib/Echoes';
import { EchoPrimaryMainStats, EchoSubStats } from '../types/everyStatistics';

const name = 'echoesSlice';

export type EchoSubStatsId = keyof MyEcho['서브 스텟'];
export interface MyEcho {
  코드: EchoCode;
  이름: string;
  희귀: EchoRarity;
  레벨: number;
  '메인 스텟': EchoPrimaryMainStats;
  '서브 스텟': {
    [x in 's1' | 's2' | 's3' | 's4' | 's5']?: { stat: EchoSubStats; value: number };
  };
  화음: Harmony;
  장착: { 공명자: EveryResonatorName | '미장착'; 슬롯: 0 | EchoEquipSlot };
}

export type EchoEquipSlot = 1 | 2 | 3 | 4 | 5;
export type EchoId = `echo_${number}`;
export type MyEchoes = Partial<Record<EchoId, MyEcho>>;

const initialState: {
  에코: MyEchoes;
  장착: Partial<Record<EveryResonatorName, Partial<Record<1 | 2 | 3 | 4 | 5, EchoId>>>>;
} = {
  에코: {},
  장착: {},
};
type InitialState = typeof initialState;

const myEchoes = localStorage.getItem('에코');
if (myEchoes) {
  initialState['에코'] = JSON.parse(myEchoes) as MyEchoes;
}

Object.entries(initialState['에코']).forEach(([id, info]) => {
  if (info && info['장착']['공명자'] !== '미장착') {
    initialState['장착'] = {
      ...initialState['장착'],
      [info['장착']['공명자']]: {
        ...initialState['장착'][info['장착']['공명자']],
        [info['장착']['슬롯']]: id,
      },
    };
  }
});

const save = (state: InitialState) => {
  localStorage.setItem('에코', JSON.stringify(state['에코']));
};

const reducers = {
  addEcho: (
    state: InitialState,
    action: {
      payload: {
        code: EchoCode;
        rarity: EchoRarity;
        level: number;
        main: EchoPrimaryMainStats;
        harmony: Harmony;
      };
    }
  ) => {
    const code = action.payload.code;
    const newEcho: MyEcho = {
      코드: code,
      이름: everyEchoData[code]?.name as string,
      희귀: action.payload.rarity,
      레벨: action.payload.level,
      '메인 스텟': action.payload.main,
      '서브 스텟': {},
      화음: action.payload.harmony,
      장착: { 공명자: '미장착', 슬롯: 0 },
    };
    state['에코'] = {
      ...state['에코'],
      ['echo_' + Math.floor((9 * Math.random() + 1) * 100000000).toString()]: newEcho,
    };
    save(state);
  },
  changeEchoLevel: (state: InitialState, action: { payload: { id: EchoId; level: number } }) => {
    const getEcho = state['에코'][action.payload.id];
    const level = action.payload.level;
    if (getEcho) {
      const rarity = getEcho['희귀'] * 5;
      if (level >= 0 && level <= rarity) {
        getEcho.레벨 = action.payload.level;
      }
      if (level < 25) {
        const sNumber = Math.ceil((level + 1) / 5) as 1 | 2 | 3 | 4 | 5;
        getEcho['서브 스텟'][`s${sNumber}`] = undefined;
      }
    }
    save(state);
  },
  changeSubStat: (
    state: InitialState,
    action: { payload: { id: EchoId; order: EchoSubStatsId; stat: EchoSubStats; value: number } }
  ) => {
    const id = action.payload.id;
    state['에코'] = {
      ...state['에코'],
      [id]: {
        ...state['에코'][id],
        '서브 스텟': {
          ...state['에코'][id]?.['서브 스텟'],
          [action.payload.order]: { stat: action.payload.stat, value: action.payload.value },
        },
      },
    };
    save(state);
  },
  changeEquip: (
    state: InitialState,
    action: {
      payload: {
        id: EchoId;
        equip: { name: EveryResonatorName | '미장착'; slot: EchoEquipSlot };
      };
    }
  ) => {
    const targetId = action.payload.id;
    const targetInfo = state['에코'][targetId] as MyEcho;
    const guestOwner = action.payload.equip.name;
    const guestSlot = action.payload.equip.slot;
    if (guestOwner === '미장착') {
      state['에코'] = {
        ...state['에코'],
        [targetId]: { ...targetInfo, 장착: { 공명자: '미장착', 슬롯: 0 } },
      };
      state['장착'] = { ...state['장착'], [targetInfo['장착']['공명자']]: undefined };
    } else {
      const hostOwner = targetInfo['장착']['공명자'];
      const hostSlot = targetInfo['장착']['슬롯'];
      const currentId = state['장착'][guestOwner]?.[guestSlot];
      if (currentId) {
        const currentInfo = state['에코'][currentId];
        state['에코'] = {
          ...state['에코'],
          [targetId]: { ...targetInfo, 장착: { 공명자: guestOwner, 슬롯: guestSlot } },
          [currentId]: { ...currentInfo, 장착: { 공명자: hostOwner, 슬롯: hostSlot } },
        };
        state['장착'] = {
          ...state['장착'],
          [guestOwner]: { ...state['장착'][guestOwner], [guestSlot]: targetId },
        };
        if (hostOwner !== '미장착') {
          state['장착'] = {
            ...state['장착'],
            [hostOwner]: { ...state['장착'][hostOwner], [hostSlot]: currentId },
          };
        }
      } else {
        state['에코'] = {
          ...state['에코'],
          [targetId]: { ...targetInfo, 장착: { 공명자: guestOwner, 슬롯: guestSlot } },
        };
        state['장착'] = {
          ...state['장착'],
          [guestOwner]: { ...state['장착'][guestOwner], [guestSlot]: targetId },
        };
      }
    }
    save(state);
    // window.location.reload();
  },
};

const echoesSlice = createSlice({ initialState, reducers, name });
export const { addEcho, changeEchoLevel, changeSubStat, changeEquip } = echoesSlice.actions;
export default echoesSlice.reducer;
