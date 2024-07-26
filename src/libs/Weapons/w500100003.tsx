import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '500100003'
const atk1 = 47
const subOption: WeaponSubStats = 'cRate'

const result = new WeaponData({
  code,
  atk1,
  subOption,
  skill: {
    name: '신의 가호',
    passive: [
      { stat: 'ice', s1: 0.12, s5: 0.24 },
      { stat: 'fire', s1: 0.12, s5: 0.24 },
      { stat: 'electro', s1: 0.12, s5: 0.24 },
      { stat: 'wind', s1: 0.12, s5: 0.24 },
      { stat: 'light', s1: 0.12, s5: 0.24 },
      { stat: 'dark', s1: 0.12, s5: 0.24 },
    ],
    active: [
      {
        trigger: ['intro'],
        value: [{ stat: 'skill', s1: 0.24, s5: 0.48 }],
        stackName: '가호',
      },
      {
        trigger: ['skill'],
        value: [{ stat: 'skill', s1: 0.24, s5: 0.48 }],
        stackName: '축복',
      },
    ],
  },
})
export default result
