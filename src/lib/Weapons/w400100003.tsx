import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400100003';
const atk1 = 27;
const subOption: WeaponSubStats = 'energy';

const result = new WeaponData({
  code,
  atk1,
  subOption,
  skill: { passive: [], active: [] },
});
export default result;
