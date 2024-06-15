import { EveryWeaponSubOption, WeaponData } from '.';

const code = '400100003';
const atk1 = 27;
const subOption: EveryWeaponSubOption = '공명 효율';

const result = new WeaponData({ code, atk1, subOption });

export default result;
