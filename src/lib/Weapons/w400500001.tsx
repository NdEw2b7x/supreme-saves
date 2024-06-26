import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400500001';
const name = '금주의 수호';
const atk1 = 31;
const subOption: WeaponSubStats = 'atk';

// const skill: WeaponSkill = {
//   name: '전사의 충정',
//   afterSkill: [
//     { stat: '공격력', from: 8, to: 16 },
//     { stat: 'HP', from: 10, to: 20 },
//   ],
// };

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
        stat: 'atk',
        s1: 0.08,
        s5: 0.16,
      },
      {
        trigger: ['intro'],
        stat: 'hp',
        s1: 0.1,
        s5: 0.2,
      },
    ],
  },
});
export default result;
