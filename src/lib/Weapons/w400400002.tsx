import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400400002';
const atk1 = 27;
const subOption: WeaponSubStats = 'energy';

const result = new WeaponData({
  code,
  name: '바람의 악센트',
  atk1,
  subOption,
  skill: { passive: [], active: [] },
});
export default result;
