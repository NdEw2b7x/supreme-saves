import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400100004';
const atk1 = 33;
const subOption: WeaponSubStats = 'cRate';

const result = new WeaponData({ code, atk1, subOption, skill: { passive: [] } });
export default result;
