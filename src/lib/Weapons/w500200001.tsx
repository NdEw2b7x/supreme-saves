import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500200001';
const atk1 = 47;
const subOption: WeaponSubStats = 'cRate';

const result = new WeaponData({
  code,
  name: '천년의 회류',
  atk1,
  subOption,
  skill: {
    name: '무한의 소용돌이',
    passive: [{ stat: 'energy', s1: 0.128, s5: 0.256 }],
    active: [{ trigger: ['skill'], value: [{ stat: 'atk', s1: 0.06, s5: 0.12, stack: 2 }] }],
  },
});
export default result;
