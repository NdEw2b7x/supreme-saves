import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '알토';
const element: EveryElement = '기류';
const weaponType: EveryWeaponCategory = '권총';
const [hp, atk, def] = [788, 21, 88];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
