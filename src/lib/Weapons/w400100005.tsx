import { EveryWeaponSubOption, WeaponData } from '.';

const code = '400100005';
const atk1 = 33;
const subOption: EveryWeaponSubOption = '공명 효율';

const result = new WeaponData({ code, atk1, subOption });

export default result;
