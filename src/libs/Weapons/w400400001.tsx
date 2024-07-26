import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400400001'
const atk1 = 27
const subOption: WeaponSubStats = 'def'

const result = new WeaponData({
  code,
  atk1,
  subOption,
  skill: {
    name: '정면돌파',
    passive: [],
    active: [
      { trigger: ['intro'], value: [{ stat: 'atk', s1: 0.15, s5: 0.3 }] },
    ],
  },
})
export default result
