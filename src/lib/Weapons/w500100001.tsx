import { EveryWeaponSubOption, WeaponData } from '.';

const code = '500100001';
const atk1 = 47;
const subOption: EveryWeaponSubOption = '공격력';

const result = new WeaponData({ code, atk1, subOption });

export default result;
