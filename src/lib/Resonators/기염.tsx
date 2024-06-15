import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '기염';
const element: EveryElement = '기류';
const weaponType: EveryWeaponCategory = '대검';
const [hp, atk, def] = [839, 35, 97];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
