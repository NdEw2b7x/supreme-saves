import { EveryWeaponSubOption, WeaponData } from '.';

const code = '400200002';
const atk1 = 31;
const subOption: EveryWeaponSubOption = '공격력';

const result = new WeaponData({ code, atk1, subOption });

export default result;
