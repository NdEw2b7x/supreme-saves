import { EveryWeaponSubOption, WeaponData } from '.';

const code = '400100001';
const atk1 = 27;
const subOption: EveryWeaponSubOption = '방어력%';

const result = new WeaponData({ code, atk1, subOption });

export default result;
