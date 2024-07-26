import { MinorForte } from '../libs/Resonators/ResonatorData'
import { ResonatorCode, everyResonatorData } from '../libs/Resonators'
import { useSelector } from 'react-redux'
import { State } from '../store'

export const useByStatBonus = (code: ResonatorCode) => {
  const myResonators = useSelector(
    (state: State) => state.resonatorsSlice['공명자']
  )
  const byStatBonus: Record<MinorForte, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    ice: 0,
    fire: 0,
    electro: 0,
    wind: 0,
    light: 0,
    dark: 0,
    cRate: 0,
    cDmg: 0,
    heal: 0,
  }
  const myResonator = Object.fromEntries(myResonators.map(i => [i['코드'], i]))[
    code
  ]
  const statBonus = everyResonatorData[code]['statBonus']
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
    byStatBonus[i] =
      Math.round((1000 * ((trueCheck3 * 3 + trueCheck7 * 7) * max)) / 20) / 1000
  })
  return [statBonus, byStatBonus] as const
}
