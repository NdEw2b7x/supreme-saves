import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '300300001'
const atk1 = 26
const subOption: WeaponSubStats = 'atk'

const result = new WeaponData({
  code,
  name: '흑야의 권총 · 흑성',
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
