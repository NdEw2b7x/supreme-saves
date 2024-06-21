import { EveryWeaponSubOption, WeaponData } from '.';

const code = '500500001';
const atk1 = 40;
const subOption: EveryWeaponSubOption = '공격력%';

const result = new WeaponData({ code, atk1, subOption });

export default result;
