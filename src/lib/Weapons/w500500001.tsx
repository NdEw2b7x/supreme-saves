import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '500500001';
const atk1 = 40;
const subOption: WeaponSubStats = 'atk';

const result = new WeaponData({ code, atk1, subOption });

export default result;
