import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500200002';
const atk1 = 47;
const subOption: WeaponSubStats = 'atk';
const result = new WeaponData({
  code,
  name: '솟아오르는 화염',
  atk1,
  subOption,
  skill: {
    name: '불사조의 깃털',
    passive: [{ stat: 'cRate', s1: 0.08, s5: 0.16 }],
    active: [
      {
        trigger: ['dmg'],
        value: [{ stat: 'skill', s1: 0.04, s5: 0.08, name: '빛나는 깃털', stack: 14 }],
      },
    ],
  },
});
export default result;
