import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400500004'
const atk1 = 33
const subOption: WeaponSubStats = 'cRate'

const result = new WeaponData({
  code,
  name: '청음',
  atk1,
  subOption,
  skill: {
    name: '강유병존',
    passive: [],
    active: [
      { trigger: ['burst'], value: [{ stat: 'atk', s1: 0.15, s5: 0.48 }] },
    ],
  },
})
export default result
