import { EveryWeaponSubOption, WeaponData } from '.';

const code = '500500002';
const atk1 = 40;
const subOption: EveryWeaponSubOption = '크리티컬 확률';

const result = new WeaponData({ code, atk1, subOption });

export default result;
