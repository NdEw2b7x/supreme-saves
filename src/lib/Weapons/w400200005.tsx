import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400200005';
const atk1 = 31;
const subOption: WeaponSubStats = 'atk';

const result = new WeaponData({
  code,
  atk1,
  subOption,
  skill: { passive: [], active: [] },
});
export default result;
