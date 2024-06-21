import { createSlice } from '@reduxjs/toolkit';
import { EchoCode, EchoRarity, EveryResonatorName, Harmony } from '../types';
import { everyEchoData } from '../lib/Echoes';
import { EchoPrimaryMainStats, EchoSubStats } from '../types/everyStatistics';

const name = 'echoesSlice';

type EchoSlot = 1 | 2 | 3 | 4 | 5;
export interface MyEcho {
  코드: EchoCode;
  이름: string;
  희귀: EchoRarity;
  레벨: number;
  '메인 스텟': EchoPrimaryMainStats;
  '서브 스텟': {
    1?: { stat: EchoSubStats; value: number };
    2?: { stat: EchoSubStats; value: number };
    3?: { stat: EchoSubStats; value: number };
    4?: { stat: EchoSubStats; value: number };
    5?: { stat: EchoSubStats; value: number };
  };
  화음: Harmony;
  장착?: [EveryResonatorName, EchoSlot];
}

export type EchoId = `echo_${number}`;
export type MyEchoes = Partial<Record<EchoId, MyEcho>>;

let initialState: { 에코: MyEchoes } = { 에코: {} };
type InitialState = typeof initialState;

let myEchoes = localStorage.getItem('에코');
if (myEchoes) {
  initialState['에코'] = JSON.parse(myEchoes) as MyEchoes;
}

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
    };
    state['에코'] = {
      ...state['에코'],
      ['echo_' + Math.floor((9 * Math.random() + 1) * 100000000).toString()]: newEcho,
    };
    save(state);
  },
  changeEchoLevel: (state: InitialState, action: { payload: { id: EchoId; level: number } }) => {
    const findEcho = state['에코'][action.payload.id];
    const level = action.payload.level;
    if (findEcho) {
      if (level >= 0 && level <= 25) {
        findEcho.레벨 = action.payload.level;
      }
    }
    save(state);
  },
  changeSyntonize: (
    state: InitialState,
    action: { payload: { id: EchoId; rank: 1 | 2 | 3 | 4 | 5 } }
  ) => {
    save(state);
  },
  changeEquip: (
    state: InitialState,
    action: { payload: { id: EchoId; equip: EveryResonatorName | '미장착' } }
  ) => {
    const id = action.payload.id;
    const newOwner = action.payload.equip;
    const targetWeapon = state['에코'][id] as MyEcho;
    if (newOwner === '미장착') {
      state['에코'] = { ...state['에코'], [id]: { ...targetWeapon, 장착: '미장착' } };
    } else {
    }
    save(state);
    window.location.reload();
  },
};

const echoesSlice = createSlice({ initialState, reducers, name });
export const { addEcho, changeEchoLevel, changeSyntonize, changeEquip } = echoesSlice.actions;
export default echoesSlice.reducer;
