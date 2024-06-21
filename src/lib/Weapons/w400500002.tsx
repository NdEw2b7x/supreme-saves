import { EveryWeaponSubOption, WeaponData } from '.';

const code = '400500002';
const atk1 = 33;
const subOption: EveryWeaponSubOption = 'HP%';
// const skill: WeaponSkill = {
//   name: '빛의 비호',
//   condition: [{ when: ['일반 공격', '강공격'], stat: '치료 효과 보너스', from: 3, to: 5 }],
// };

const result = new WeaponData({ code, atk1, subOption });

export default result;
