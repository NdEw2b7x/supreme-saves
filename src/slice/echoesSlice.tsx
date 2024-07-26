import { createSlice } from '@reduxjs/toolkit'
import { EchoRarity, Harmony, Name } from '../types'
import { ResonatorCode_ } from '../libs/Resonators'
import { EchoCode, everyEchoData } from '../libs/Echoes'
import { EchoPrimaryMainStats, EchoSubStats } from '../types/everyStatistics'

const name = 'echoesSlice'

export type EchoSubStatsId = keyof MyEcho['서브 스텟']
export type EchoId = `echo_${number}`
export interface MyEcho {
  식별: EchoId
  코드: EchoCode
  이름: Name
  희귀: EchoRarity
  레벨: number
  '메인 스텟': EchoPrimaryMainStats
  '서브 스텟': {
    [x in 1 | 2 | 3 | 4 | 5]?: { stat: EchoSubStats; value: number }
  }
  화음: Harmony
  장착: { 공명자: ResonatorCode_ | ''; 슬롯: 0 | EchoEquipSlot }
}

export type EchoEquipSlot = 1 | 2 | 3 | 4 | 5

const initialState: {
  에코: MyEcho[]
  장착: Partial<Record<ResonatorCode_, Partial<Record<EchoEquipSlot, EchoId>>>>
} = {
  에코: [],
  장착: {},
}
type InitialState = typeof initialState

const echoesOnDB = localStorage.getItem('에코')
if (echoesOnDB) {
  try {
    if (Array.isArray(JSON.parse(echoesOnDB))) {
      initialState['에코'] = JSON.parse(echoesOnDB) as MyEcho[]
    } else {
      localStorage.removeItem('에코')
      window.location.reload()
    }
  } catch (error) {
    console.log(error)
  }
}

initialState['에코'].forEach(({ 식별, 장착: { 공명자, 슬롯 } }) => {
  if (공명자 !== '') {
    initialState['장착'] = {
      ...initialState['장착'],
      [공명자]: {
        ...initialState['장착'][공명자],
        [슬롯]: 식별,
      },
    }
  }
})

const save = (state: InitialState) => {
  localStorage.setItem('에코', JSON.stringify(state['에코']))
}

const reducers = {
  addEcho: (
    state: InitialState,
    {
      payload: { code, rarity, level, main, harmony },
    }: {
      payload: {
        code: EchoCode
        rarity: EchoRarity
        level: number
        main: EchoPrimaryMainStats
        harmony: Harmony
      }
    }
  ) => {
    const newEcho: MyEcho = {
      식별: `echo_${Math.floor((9 * Math.random() + 1) * 100000000)}`,
      코드: code,
      이름: everyEchoData[code]?.name,
      희귀: rarity,
      레벨: level,
      '메인 스텟': main,
      '서브 스텟': {},
      화음: harmony,
      장착: { 공명자: '', 슬롯: 0 },
    }
    state['에코'].push(newEcho)
    save(state)
  },
  changeEchoLevel: (
    state: InitialState,
    { payload: { id, level } }: { payload: { id: EchoId; level: number } }
  ) => {
    const current = Object.fromEntries(state['에코'].map(i => [i['식별'], i]))
    const getEcho = current[id]
    if (getEcho) {
      const rarity = getEcho['희귀'] * 5
      if (level >= 0 && level <= rarity) {
        getEcho.레벨 = level
      }
      if (level < 25) {
        const sNumber = Math.ceil(1 + level / 5) as 1 | 2 | 3 | 4 | 5
        for (let i = sNumber; i <= 5; i++) {
          getEcho['서브 스텟'][i] = undefined
        }
      }
    }
    state['에코'] = Object.values(current)
    save(state)
  },
  changeSubStat: (
    state: InitialState,
    {
      payload: { id, order, stat, value },
    }: {
      payload: {
        id: EchoId
        order: EchoSubStatsId
        stat: EchoSubStats
        value: number
      }
    }
  ) => {
    const current = Object.fromEntries(state['에코'].map(i => [i['식별'], i]))
    current[id]['서브 스텟'][order] = { stat, value }
    state['에코'] = Object.values(current)
    save(state)
  },
  changeEquip: (
    state: InitialState,
    {
      payload: {
        id,
        equip: { name, slot },
      },
    }: {
      payload: {
        id: EchoId
        equip: { name: ResonatorCode_; slot: EchoEquipSlot }
      }
    }
  ) => {
    const currentState = Object.fromEntries(
      state['에코'].map(i => [i['식별'], i])
    )
    state['에코'] = Object.values(currentState)

    const targetId = id
    const targetInfo = currentState[targetId]
    const guestOwner = name
    const guestSlot = slot

    const hostOwner = targetInfo['장착']['공명자']
    const hostSlot = targetInfo['장착']['슬롯']
    const currentId = state['장착'][guestOwner]?.[guestSlot]
    if (currentId) {
      currentState[targetId]['장착'] = { 공명자: guestOwner, 슬롯: guestSlot }
      currentState[currentId]['장착'] = { 공명자: hostOwner, 슬롯: hostSlot }
      state['장착'] = {
        ...state['장착'],
        [guestOwner]: { ...state['장착'][guestOwner], [guestSlot]: targetId },
      }
      if (hostOwner !== '') {
        state['장착'] = {
          ...state['장착'],
          [hostOwner]: { ...state['장착'][hostOwner], [hostSlot]: currentId },
        }
      }
    } else {
      currentState[targetId]['장착'] = { 공명자: guestOwner, 슬롯: guestSlot }
      if (hostOwner !== '') {
        if (hostOwner === guestOwner) {
          state['장착'] = {
            ...state['장착'],
            [guestOwner]: {
              ...state['장착'][guestOwner],
              [guestSlot]: targetId,
              [hostSlot]: undefined,
            },
          }
        } else {
          state['장착'] = {
            ...state['장착'],
            [guestOwner]: {
              ...state['장착'][guestOwner],
              [guestSlot]: targetId,
            },
            [hostOwner]: {
              ...state['장착'][hostOwner],
              [hostSlot]: undefined,
            },
          }
        }
      } else {
        state['장착'] = {
          ...state['장착'],
          [guestOwner]: { ...state['장착'][guestOwner], [guestSlot]: targetId },
        }
      }
    }
    state['에코'] = Object.values(currentState)
    save(state)
  },
  deleteEcho: (state: InitialState, { payload }: { payload: EchoId }) => {
    const current = Object.fromEntries(
      (state['에코'] as MyEcho[]).map(i => [i['식별'], i])
    )
    delete current[payload]
    state['에코'] = Object.values(current)
    save(state)
  },
}

const echoesSlice = createSlice({ initialState, reducers, name })
export const {
  addEcho,
  changeEchoLevel,
  changeSubStat,
  changeEquip,
  deleteEcho,
} = echoesSlice.actions
export default echoesSlice.reducer
