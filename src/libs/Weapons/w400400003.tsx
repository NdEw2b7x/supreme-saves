import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400400003'
const atk1 = 33
const subOption: WeaponSubStats = 'atk'

const result = new WeaponData({
  code,
  name: '천공의 역행',
  atk1,
  subOption,
  skill: { passive: [], active: [] },
})
export default result
