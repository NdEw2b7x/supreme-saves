import { EveryWeaponSubOption, WeaponData } from '.';

const code = '500200001';
const atk1 = 47;
const subOption: EveryWeaponSubOption = '크리티컬 확률';

const result = new WeaponData({ code, atk1, subOption });

export default result;
