import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400100005'
const atk1 = 33
const subOption: WeaponSubStats = 'energy'

const result = new WeaponData({
  code,
  atk1,
  subOption,
  skill: { passive: [], active: [] },
})
export default result
