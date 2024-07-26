import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400300002'
const atk1 = 27
const subOption: WeaponSubStats = 'energy'

const result = new WeaponData({
  code,
  name: '화려한 악곡',
  atk1,
  subOption,
  skill: { passive: [], active: [] },
})
export default result
