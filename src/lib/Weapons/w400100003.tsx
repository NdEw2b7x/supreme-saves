import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400100003';
const atk1 = 33;
const subOption: WeaponSubStats = 'atk';

const result = new WeaponData({
  code,
  name: '저무는 동녘',
  atk1,
  subOption,
  skill: {
    name: '잠재력의 상한',
    passive: [],
    active: [{ trigger: ['skill'], value: [{ stat: 'atk', s1: 0.03, s5: 0.06 }], stack: 4 }],
  },
});
export default result;
