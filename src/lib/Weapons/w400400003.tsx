import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400400003';
const atk1 = 27;
const subOption: WeaponSubStats = 'energy';
// const skill: WeaponSkill = {
//   name: '전사의 충정',
//   afterSkill: [
//     { stat: '공격력', from: 8, to: 16 },
//     { stat: 'HP', from: 10, to: 20 },
//   ],
// };

const result = new WeaponData({ code, atk1, subOption });

export default result;
