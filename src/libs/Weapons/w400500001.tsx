import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400500001'
const name = '금주의 수호'
const atk1 = 31
const subOption: WeaponSubStats = 'atk'

const result = new WeaponData({
  code,
  name,
  atk1,
  subOption,
  skill: {
    name: '전사의 충정',
    passive: [],
    active: [
      {
        trigger: ['intro'],
        value: [
          { stat: 'atk', s1: 0.08, s5: 0.16 },
          { stat: 'hp', s1: 0.1, s5: 0.2 },
        ],
      },
    ],
  },
})
export default result
