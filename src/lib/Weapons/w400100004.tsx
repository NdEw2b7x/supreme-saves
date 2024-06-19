import { EveryWeaponSubOption, WeaponData } from '.';

const code = '400100004';
const atk1 = 33;
const subOption: EveryWeaponSubOption = '크리티컬 확률';

const result = new WeaponData({ code, atk1, subOption });

export default result;
