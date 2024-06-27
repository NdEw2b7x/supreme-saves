import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500500001';
const atk1 = 40;
const subOption: WeaponSubStats = 'atk';

const result = new WeaponData({
  code,
  name: '파도의 기록',
  atk1,
  subOption,
  skill: {
    name: '끝없는 물결',
    passive: [{ stat: 'energy', s1: 0.128, s5: 0.256 }],
    active: [{ trigger: ['basic'], value: [{ stat: 'basic', s1: 0.032, s5: 0.064, stack: 5 }] }],
  },
});

export default result;
