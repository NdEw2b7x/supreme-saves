import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400100001';
const atk1 = 27;
const subOption: WeaponSubStats = 'def';

const result = new WeaponData({ code, atk1, subOption, skill: { passive: [] } });
export default result;
