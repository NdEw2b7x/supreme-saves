import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400300003'
const atk1 = 33
const subOption: WeaponSubStats = 'atk'

const result = new WeaponData({
  code,
  name: '천공의 순간',
  atk1,
  subOption,
  skill: { passive: [], active: [] },
})
export default result
