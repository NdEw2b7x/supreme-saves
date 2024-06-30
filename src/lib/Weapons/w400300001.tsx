import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400300001';
const atk1 = 33;
const subOption: WeaponSubStats = 'atk';

const result = new WeaponData({
  code,
  name: '불멸의 성화',
  atk1,
  subOption,
  skill: {
    name: '정면돌파',
    passive: [],
    active: [{ trigger: ['intro'], value: [{ stat: 'atk', s1: 0.15, s5: 0.3 }] }],
  },
});
export default result;
