import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '300100001';
const name = '흑야의 대검 · 현명';
const atk1 = 26;
const subOption: WeaponSubStats = 'atk';

const result = new WeaponData({
  code,
  name,
  atk1,
  subOption,
  skill: {
    name: '필사의 결심',
    passive: [],
    active: [{ trigger: ['intro'], value: [{ stat: 'atk', s1: 0.08, s5: 0.16 }] }],
  },
});
export default result;
