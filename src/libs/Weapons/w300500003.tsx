import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '300500003'
const atk1 = 24
const subOption: WeaponSubStats = 'hp'

const result = new WeaponData({
  code,
  name: '원능의 증폭기 · 견습V',
  atk1,
  subOption,
  skill: { name: '도움의 손길', passive: [], active: [] },
})
export default result
