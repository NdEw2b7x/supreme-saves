import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500300001';
const atk1 = 47;
const subOption: WeaponSubStats = 'cRate';

const result = new WeaponData({ code, atk1, subOption });

export default result;
