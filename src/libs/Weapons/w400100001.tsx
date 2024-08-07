import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400100001'
const atk1 = 27
const subOption: WeaponSubStats = 'def'

const result = new WeaponData({
  code,
  name: '장야의 불빛',
  atk1,
  subOption,
  skill: { passive: [], active: [] },
})
export default result
