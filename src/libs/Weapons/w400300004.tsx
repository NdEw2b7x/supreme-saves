import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400300004'
// const name = '뇌전';
const atk1 = 31
const subOption: WeaponSubStats = 'atk'

const result = new WeaponData({
  code,
  atk1,
  subOption,
  skill: { passive: [], active: [] },
})
export default result
