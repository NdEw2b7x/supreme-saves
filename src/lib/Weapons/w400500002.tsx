import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400500002';
const name = '판타지 변주';
const atk1 = 27;
const subOption: WeaponSubStats = 'energy';

// const skill: WeaponSkill = {
//   name: '끝없는 메아리',
//   condition: [{ when: ['공명 스킬'], stat: '협주 에너지', from: 8, to: 16 }],
// };

const result = new WeaponData({
  code,
  name,
  atk1,
  subOption,
  skill: { name: '끝없는 메아리', passive: [], active: [] },
});
export default result;
