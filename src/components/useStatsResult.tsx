import { getMyEchoValues } from '.'
import { useSelector } from 'react-redux'
import { State } from '../store'
import { MyResonator } from '../slice/resonatorsSlice'
import { EveryWeaponAtk1, Harmony, Stats } from '../types'
import {
  getATK,
  getDEF,
  getHP,
  getWeaponAtk,
  getWeaponSubOptionValue,
} from '../libs/formula'
import {
  ResonatorCode,
  ResonatorCode_,
  codeConverter,
  everyResonatorData,
  isRover,
} from '../libs/Resonators'
import { everyHarmonyEffectData } from '../libs/HarmonyEffects'
import { everyWeaponData } from '../libs/Weapons'
import { EchoEquipSlot } from '../slice/echoesSlice'

export const useStatsResult = (
  resonatorCode: ResonatorCode
): Record<Stats, number> => {
  const myResonators = Object.fromEntries(
    useSelector((state: State) => state.resonatorsSlice['공명자']).map(i => [
      i['코드'],
      i,
    ])
  )
  const myWeapons = Object.fromEntries(
    useSelector((state: State) => state.weaponsSlice['무기']).map(i => [
      i['식별'],
      i,
    ])
  )
  const equipWeapons = useSelector((state: State) => state.weaponsSlice['장착'])
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코'])
  const equipEchoes = useSelector((state: State) => state.echoesSlice['장착'])
  const triggerState = useSelector((state: State) => state.triggerSlice)

  const myResonator = myResonators[resonatorCode] as MyResonator
  const values: Record<Stats, number> = {
    baseHp: 0,
    resonatorAtk: 0,
    weaponAtk: 0,
    baseAtk: 0,
    baseDef: 0,
    hp: 0,
    atk: 0,
    def: 0,
    energy: 1,
    ice: 0,
    fire: 0,
    electro: 0,
    wind: 0,
    light: 0,
    dark: 0,
    cRate: 0.05,
    cDmg: 1.5,
    heal: 0,
    basic: 0,
    heavy: 0,
    skill: 0,
    liberation: 0,
    flatHp: 0,
    flatAtk: 0,
    flatDef: 0,
  }
  type Stat = keyof typeof values

  const statBonus = everyResonatorData[resonatorCode]['statBonus']
  const skill = myResonator['스킬']
  statBonus.forEach(i => {
    const trueCheck3 =
      i === 'hp' || i === 'atk' || i === 'def'
        ? [
            skill['공명 스킬']['연결점'][0],
            skill['공명 해방']['연결점'][0],
          ].filter(i => i).length
        : [
            skill['일반 공격']['연결점'][0],
            skill['변주 스킬']['연결점'][0],
          ].filter(i => i).length
    const trueCheck7 =
      i === 'hp' || i === 'atk' || i === 'def'
        ? [
            skill['공명 스킬']['연결점'][1],
            skill['공명 해방']['연결점'][1],
          ].filter(i => i).length
        : [
            skill['일반 공격']['연결점'][1],
            skill['변주 스킬']['연결점'][1],
          ].filter(i => i).length
    const max =
      i === 'def' ? 0.152 : i === 'cRate' ? 0.08 : i === 'cDmg' ? 0.16 : 0.12
    values[i] =
      values[i] +
      Number((((trueCheck3 * 3 + trueCheck7 * 7) * max) / 20).toFixed(3))
  })
  let weaponAtk = 0
  const id =
    equipWeapons[
      isRover(resonatorCode) ? 'Rover' : (resonatorCode as ResonatorCode_)
    ]
  if (id) {
    const myWeapon = myWeapons[id]
    const code = myWeapon['코드']
    const level = myWeapon['레벨']
    const rank = myWeapon['돌파']
    const s = myWeapon['공진']
    const data = everyWeaponData[code]
    const atk1: EveryWeaponAtk1 = data.atk1
    const sub: Stats = data.subOption

    data.skill.passive
      .map(
        ({ stat, s1, s5 }) => [stat, s1 + ((s5 - s1) * (s - 1)) / 4] as const
      )
      .forEach(([stat, value]) => {
        values[stat] += value
      })
    data.skill.active.forEach(({ trigger, value, stackName }) => {
      if (
        trigger
          .map(i => {
            return triggerState[i]
          })
          .filter(i => i).length > 0
      ) {
        value
          .map(({ stat, s1, s5 }) => {
            return [
              stat,
              (s1 + ((s5 - s1) * (s - 1)) / 4) *
                (triggerState['stack'][stackName ?? '스택'] ?? 1),
            ] as const
          })
          .forEach(([stat, value]) => {
            values[stat] += value
          })
      }
    })
    weaponAtk = getWeaponAtk({ level, code, rank })
    values[sub] += getWeaponSubOptionValue(atk1, sub)(level)
  }
  Object.entries(
    getMyEchoValues(
      ([1, 2, 3, 4, 5] as EchoEquipSlot[]).map(i => {
        const echoId = equipEchoes[codeConverter(resonatorCode)]?.[i]
        return echoId
          ? Object.fromEntries(myEchoes.map(i => [i['식별'], i]))[echoId]
          : undefined
      })
    )
  ).forEach(([stat, value]) => {
    values[stat as Stat] =
      Math.floor(values[stat as Stat] * 10000 + value * 10000) / 10000
  })

  const countHarmony: Record<Harmony, 0 | 1 | 2 | 3 | 4 | 5> = {
    '야밤의 서리': 0,
    '솟구치는 용암': 0,
    '울려퍼지는 뇌음': 0,
    '스쳐가는 바람': 0,
    '빛나는 별': 0,
    '빛을 삼키는 해': 0,
    '찬란한 광휘': 0,
    '떠오르는 구름': 0,
    '끊임없는 잔향': 0,
  }
  ;([1, 2, 3, 4, 5] as EchoEquipSlot[])
    .map(i => {
      const echoId = equipEchoes[codeConverter(resonatorCode)]?.[i]
      return echoId
        ? Object.fromEntries(myEchoes.map(i => [i['식별'], i]))[echoId]
        : undefined
    })
    .forEach(i => {
      if (i) {
        countHarmony[i['화음']] += 1
      }
    })

  Object.entries(
    Object.fromEntries(Object.entries(countHarmony).filter(([, c]) => c >= 2))
  )
    .map(([h, c]) =>
      c >= 2 ? everyHarmonyEffectData[h as Harmony].effect2 : undefined
    )
    .forEach(i => {
      if (i) {
        values[i.stat] += i.value
      }
    })

  values['baseHp'] = getHP(myResonator)
  values['resonatorAtk'] = getATK(myResonator)
  values['weaponAtk'] = weaponAtk
  values['baseAtk'] = values['resonatorAtk'] + values['weaponAtk']
  values['baseDef'] = getDEF(myResonator)
  return values
}
