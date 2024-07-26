import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '300200001'
const name = '흑야의 직검 · 흑뢰'
const atk1 = 26
const subOption: WeaponSubStats = 'atk'

const result = new WeaponData({
  code,
  name,
  atk1,
  subOption,
  skill: {
    name: '필사의 결심',
    passive: [],
    active: [
      { trigger: ['intro'], value: [{ stat: 'atk', s1: 0.8, s5: 0.16 }] },
    ],
  },
})
export default result
