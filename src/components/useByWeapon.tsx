import { useSelector } from 'react-redux'
import { State } from '../store'
import { EveryWeaponAtk1, WeaponSubStats } from '../types'
import { getWeaponAtk, getWeaponSubOptionValue } from '../libs/formula'
import { ResonatorCode, ResonatorCode_, isRover } from '../libs/Resonators'
import { everyWeaponData } from '../libs/Weapons'

export const useByWeapon = (code: ResonatorCode) => {
  const equipWeapons = useSelector((state: State) => state.weaponsSlice['장착'])
  const myWeapons = Object.fromEntries(
    useSelector((state: State) => state.weaponsSlice['무기']).map(i => [
      i['식별'],
      i,
    ])
  )
  let weaponAtk = 0
  const byWeapon: Record<WeaponSubStats, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    cRate: 0,
    cDmg: 0,
  }
  const id = equipWeapons[isRover(code) ? 'Rover' : (code as ResonatorCode_)]
  if (id) {
    const myWeapon = myWeapons[id]
    if (myWeapon) {
      const code = myWeapon['코드']
      const data = everyWeaponData[myWeapon['코드']]
      const level = myWeapon['레벨']
      const rank = myWeapon['돌파']
      const atk1: EveryWeaponAtk1 = data.atk1
      const sub = data.subOption
      weaponAtk = getWeaponAtk({ code, level, rank })
      byWeapon[sub] = getWeaponSubOptionValue(atk1, sub)(level)
    }
  }
  return [weaponAtk, byWeapon] as const
}
