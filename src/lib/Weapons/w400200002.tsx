import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400200002';
const atk1 = 27;
const subOption: WeaponSubStats = 'energy';

const result = new WeaponData({
  code,
  name: '행진의 서곡',
  atk1,
  subOption,
  skill: { passive: [], active: [] },
});
export default result;
