import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500200002';
const atk1 = 47;
const subOption: WeaponSubStats = 'atk';

// const skill = {
//   name: '불사조의 깃털',
//   dafault: [{ stat: '크리티컬 확률', from: 8, to: 16 }],
//   stack: [{ name: '빛나는 깃털', cap: 14, stat: '공명 스킬', from: 4, to: 8 }],
// };

const result = new WeaponData({ code, atk1, subOption });

export default result;
