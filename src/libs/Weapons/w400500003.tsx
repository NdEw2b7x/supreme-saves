import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400500003'
const name = '굉음'
const atk1 = 33
const subOption: WeaponSubStats = 'hp'

const result = new WeaponData({
  code,
  name,
  atk1,
  subOption,
  skill: {
    name: '빛의 비호',
    passive: [],
    active: [
      {
        trigger: ['basic', 'heavy'],
        value: [{ stat: 'heal', s1: 0.03, s5: 0.05 }],
      },
    ],
  },
})
export default result
