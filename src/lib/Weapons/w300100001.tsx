import { EveryWeaponSubOption, WeaponData } from '.';

const code = '300100001';
const atk1 = 26;
const subOption: EveryWeaponSubOption = '공격력';
// const skill: WeaponSkill = {
//   name: '필사의 결심',
//   condition: [{ when: ['변주 스킬'], stat: '공격력', from: 8, to: 16 }],
// };

const result = new WeaponData({ code, atk1, subOption });

export default result;
