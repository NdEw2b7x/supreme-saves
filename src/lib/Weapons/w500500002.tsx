import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500500002';
const atk1 = 40;
const subOption: WeaponSubStats = 'cRate';

const result = new WeaponData({
  code,
  name: '꼭두각시의 손',
  atk1,
  subOption,
  skill: {
    name: '뇌전의 증폭',
    passive: [
      { stat: 'ice', s1: 0.12, s5: 0.24 },
      { stat: 'fire', s1: 0.12, s5: 0.24 },
      { stat: 'electro', s1: 0.12, s5: 0.24 },
      { stat: 'wind', s1: 0.12, s5: 0.24 },
      { stat: 'light', s1: 0.12, s5: 0.24 },
      { stat: 'dark', s1: 0.12, s5: 0.24 },
    ],
    active: [{ trigger: ['skill'], stat: 'atk', s1: 0.12, s5: 0.24, stack: 2 }],
    field: [{ on: false, stat: 'atk', s1: 0.12, s5: 0.24 }],
  },
});

export default result;
