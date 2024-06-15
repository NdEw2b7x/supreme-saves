import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '치샤';
const element: EveryElement = '용융';
const weaponType: EveryWeaponCategory = '권총';
const [hp, atk, def] = [727, 24, 78];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
