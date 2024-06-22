import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400100005';
const atk1 = 33;
const subOption: WeaponSubStats = 'energy';

const result = new WeaponData({ code, atk1, subOption });

export default result;
