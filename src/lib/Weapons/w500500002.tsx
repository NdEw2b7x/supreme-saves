import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500500002';
const atk1 = 40;
const subOption: WeaponSubStats = 'cRate';

const result = new WeaponData({ code, atk1, subOption });

export default result;
