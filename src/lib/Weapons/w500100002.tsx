import { EveryWeaponSubOption, WeaponData } from '.';

const code = '500100002';
const atk1 = 47;
const subOption: EveryWeaponSubOption = '크리티컬 피해';

const result = new WeaponData({ code, atk1, subOption });

export default result;
