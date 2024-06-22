import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400500004';
const atk1 = 33;
const subOption: WeaponSubStats = 'cRate';

// const skill: WeaponSkill = {
//   name: '끝없는 메아리',
//   condition: [{ when: ['공명 스킬'], stat: '협주 에너지', from: 8, to: 16 }],
// };

const result = new WeaponData({ code, atk1, subOption });

export default result;
