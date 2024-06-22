import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400300005';
// const name = '26형 권총 · 맹렬한 돌격';
const atk1 = 31;
const subOption: WeaponSubStats = 'atk';

const result = new WeaponData({ code, atk1, subOption });

export default result;
