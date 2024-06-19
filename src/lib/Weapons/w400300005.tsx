import { EveryWeaponSubOption, WeaponData } from '.';

const code = '400300005';
// const name = '26형 권총 · 맹렬한 돌격';
const atk1 = 31;
const subOption: EveryWeaponSubOption = '공격력';

const result = new WeaponData({ code, atk1, subOption });

export default result;
