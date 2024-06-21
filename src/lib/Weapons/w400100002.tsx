import { EveryWeaponSubOption, WeaponData } from '.';

const code = '400100002';
const atk1 = 33;
const subOption: EveryWeaponSubOption = '공격력%';

const result = new WeaponData({ code, atk1, subOption });

export default result;
