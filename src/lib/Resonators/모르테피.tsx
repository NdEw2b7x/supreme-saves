import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '모르테피';
const element: EveryElement = '용융';
const weaponType: EveryWeaponCategory = '권총';
const [hp, atk, def] = [802, 20, 93];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
