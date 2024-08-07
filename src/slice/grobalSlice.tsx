import { createSlice } from '@reduxjs/toolkit'
import {
  EchoCost,
  ResonatorElement,
  EveryRarity,
  WeaponCategory,
} from '../types'
import { ResonatorCode } from '../libs/Resonators'

export const currentDBVersion = 'A'

const name = 'grobalSlice'

export const everyPage = ['공명자', '무기', '에코', '기타'] as const
export type EveryPage = (typeof everyPage)[number]
export const everySubPage = ['추가', '상세'] as const
export type EverySubPage = (typeof everySubPage)[number]

interface InitialFilter {
  element: Record<ResonatorElement, boolean>
  rarity: Record<EveryRarity, boolean>
  weaponCategory: Record<WeaponCategory, boolean>
  cost: Record<EchoCost, boolean>
}
interface InitialState {
  page: EveryPage
  subPage?: EverySubPage
  detail?: ResonatorCode
  filter: InitialFilter
}
const initialFilter: InitialFilter = {
  element: {
    ice: true,
    fire: true,
    electro: true,
    wind: true,
    light: true,
    dark: true,
  },
  rarity: { 5: true, 4: true, 3: true },
  weaponCategory: {
    대검: true,
    직검: true,
    권총: true,
    권갑: true,
    증폭기: true,
  },
  cost: { 4: true, 3: true, 1: true },
} as const
const initialState: InitialState = { page: '공명자', filter: initialFilter }

const modeFromStorage = sessionStorage.getItem('page')
if (modeFromStorage) {
  initialState.page = JSON.parse(modeFromStorage) as EveryPage
}
const filterFromStorage = sessionStorage.getItem('filter')
if (filterFromStorage) {
  initialState.filter = JSON.parse(filterFromStorage) as InitialFilter
}
const reducers = {
  changePage: (state: InitialState, { payload }: { payload: EveryPage }) => {
    sessionStorage.setItem('page', JSON.stringify(payload))
    const state_: InitialState = { ...state, page: payload, subPage: undefined }
    return state_
  },
  changeSubPage: (
    state: InitialState,
    { payload }: { payload: EverySubPage | undefined }
  ) => {
    state['subPage'] = payload
  },
  selectDetail: (
    state: InitialState,
    { payload }: { payload: ResonatorCode }
  ) => {
    state['detail'] = payload
  },
  changefilter: (
    state: InitialState,
    {
      payload: { filter, item },
    }: {
      payload: {
        filter: keyof InitialFilter
        item: EveryRarity | WeaponCategory | ResonatorElement | EchoCost
      }
    }
  ) => {
    switch (item) {
      case 5:
      case 4:
      case 3:
      case 1:
        if (filter === 'rarity' && item !== 1) {
          const filterR = state.filter.rarity
          const nowR = filterR[item]
          const countTrueR = Object.values(filterR).filter(
            i => i === true
          ).length
          if (countTrueR === 3) {
            Object.entries(filterR).forEach(([rarity]) => {
              filterR[Number(rarity) as EveryRarity] = false
            })
            filterR[item] = true
          } else if (countTrueR === 1) {
            if (filterR[item]) {
              Object.entries(filterR).forEach(([rarity]) => {
                filterR[Number(rarity) as EveryRarity] = true
              })
            } else {
              filterR[item] = !nowR
            }
          } else {
            filterR[item] = !nowR
          }
        } else if (item !== 5) {
          const filterC = state.filter.cost
          const nowC = filterC[item]
          const countTrueC = Object.values(filterC).filter(
            i => i === true
          ).length
          if (countTrueC === 3) {
            Object.entries(filterC).forEach(([cost]) => {
              filterC[Number(cost) as EchoCost] = false
            })
            filterC[item] = true
          } else if (countTrueC === 1) {
            if (filterC[item]) {
              Object.entries(filterC).forEach(([cost]) => {
                filterC[Number(cost) as EchoCost] = true
              })
            } else {
              filterC[item] = !nowC
            }
          } else {
            filterC[item] = !nowC
          }
        }
        break
      case '대검':
      case '직검':
      case '권총':
      case '권갑':
      case '증폭기':
        const filterW = state.filter.weaponCategory
        const nowW = filterW[item]
        const countTrueW = Object.values(filterW).filter(i => i === true).length
        if (countTrueW === 5) {
          Object.entries(filterW).forEach(([category]) => {
            filterW[category as WeaponCategory] = false
          })
          filterW[item] = true
        } else if (countTrueW === 1) {
          if (filterW[item]) {
            Object.entries(filterW).forEach(([category]) => {
              filterW[category as WeaponCategory] = true
            })
          } else {
            filterW[item] = !nowW
          }
        } else {
          filterW[item] = !nowW
        }
        break
      case 'ice':
      case 'fire':
      case 'electro':
      case 'wind':
      case 'light':
      case 'dark':
        const filterE = state.filter.element
        const nowE = filterE[item]
        const countTrueE = Object.values(filterE).filter(i => i === true).length
        if (countTrueE === 6) {
          Object.entries(filterE).forEach(([e]) => {
            filterE[e as ResonatorElement] = false
          })
          filterE[item] = true
        } else if (countTrueE === 1) {
          if (filterE[item]) {
            Object.entries(filterE).forEach(([e]) => {
              filterE[e as ResonatorElement] = true
            })
          } else {
            filterE[item] = !nowE
          }
        } else {
          filterE[item] = !nowE
        }
        break
    }
    sessionStorage.setItem('filter', JSON.stringify(state.filter))
  },
}
const grobalSlice = createSlice({ name, initialState, reducers })

export const { changePage, changeSubPage, selectDetail, changefilter } =
  grobalSlice.actions
export default grobalSlice.reducer
