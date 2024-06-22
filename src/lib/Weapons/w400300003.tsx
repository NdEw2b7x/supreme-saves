import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400300003';
const atk1 = 27;
const subOption: WeaponSubStats = 'energy';

const result = new WeaponData({ code, atk1, subOption });

export default result;
