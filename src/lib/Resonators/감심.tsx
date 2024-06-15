import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '감심';
const element: EveryElement = '기류';
const weaponType: EveryWeaponCategory = '권갑';
const [hp, atk, def] = [1129, 27, 92];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
