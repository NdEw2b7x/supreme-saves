import { WeaponSubStats } from '../../types'
import WeaponData from './WeaponData'

const code = '400400004'
const atk1 = 33
const subOption: WeaponSubStats = 'cRate'
// const skill: WeaponSkill = {
//   name: '전사의 충정',
//   afterSkill: [
//     { stat: '공격력', from: 8, to: 16 },
//     { stat: 'HP', from: 10, to: 20 },
//   ],
// };

const result = new WeaponData({
  code,
  atk1,
  subOption,
  skill: { passive: [], active: [] },
})
export default result
