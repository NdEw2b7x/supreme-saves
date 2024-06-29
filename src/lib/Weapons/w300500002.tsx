import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '300500002';
const atk1 = 24;
const subOption: WeaponSubStats = 'energy';
const result = new WeaponData({
  code,
  name: '수행자의 증폭기 · 탐색',
  atk1,
  subOption,
  skill: { name: '기나긴 여정', passive: [], active: [] },
});
export default result;
