import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400100002'
const atk1 = 27
const subOption: WeaponSubStats = 'energy'

const result = new WeaponData({
  code,
  name: '기묘한 울림',
  atk1,
  subOption,
  skill: { passive: [], active: [] },
})
export default result
