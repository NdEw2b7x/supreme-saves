import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500400001';
const atk1 = 47;
const subOption: WeaponSubStats = 'atk';

const skill = {
  passive: [],
  active: [],
};
const result = new WeaponData({ code, atk1, subOption, skill });
export default result;
