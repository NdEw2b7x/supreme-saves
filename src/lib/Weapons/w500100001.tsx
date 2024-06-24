import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500100001';
const atk1 = 47;
const subOption: WeaponSubStats = 'atk';

const result = new WeaponData({ code, atk1, subOption });

export default result;