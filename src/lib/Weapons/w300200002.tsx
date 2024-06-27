import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '300200002';
const name = '수행자의 직검 · 행적';
const atk1 = 24;
const subOption: WeaponSubStats = 'energy';
// const skill: WeaponSkill = {
//   name: '필사의 결심',
//   condition: [{ when: ['변주 스킬'], stat: '공격력', from: 8, to: 16 }],
// };

const result = new WeaponData({
  code,
  name,
  atk1,
  subOption,
  skill: { passive: [], active: [] },
});
export default result;
