import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '500100002'
const atk1 = 47
const subOption: WeaponSubStats = 'cDmg'

const result = new WeaponData({
  code,
  atk1,
  subOption,
  skill: { passive: [], active: [] },
})
export default result
