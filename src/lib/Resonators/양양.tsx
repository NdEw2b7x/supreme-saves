import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '양양';
const element: EveryElement = '기류';
const weaponType: EveryWeaponCategory = '직검';
const [hp, atk, def] = [816, 20, 90];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
