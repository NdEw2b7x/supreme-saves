import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '500300001'
const atk1 = 47
const subOption: WeaponSubStats = 'cRate'
const skill = {
  passive: [],
  active: [],
}
const result = new WeaponData({ code, atk1, subOption, skill })
export default result
