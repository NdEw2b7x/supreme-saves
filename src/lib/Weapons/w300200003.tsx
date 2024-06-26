import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '300200003';
const name = '원능의 직검 · 견습II';
const atk1 = 26;
const subOption: WeaponSubStats = 'atk';
// const skill: WeaponSkill = {
//   name: '필사의 결심',
//   condition: [{ when: ['변주 스킬'], stat: '공격력', from: 8, to: 16 }],
// };

const result = new WeaponData({ code, name, atk1, subOption, skill: { passive: [] } });
export default result;
