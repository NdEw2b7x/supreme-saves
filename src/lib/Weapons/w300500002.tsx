import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '300500002';
const atk1 = 24;
const subOption: WeaponSubStats = 'hp';
// const skill: WeaponSkill = {
//   name: '필사의 결심',
//   condition: [{ when: ['변주 스킬'], stat: '공격력', from: 8, to: 16 }],
// };

const result = new WeaponData({
  code,
  atk1,
  subOption,
  skill: { passive: [], active: [] },
});
export default result;
