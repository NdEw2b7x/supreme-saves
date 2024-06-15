import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '단근';
const element: EveryElement = '인멸';
const weaponType: EveryWeaponCategory = '직검';
const [hp, atk, def] = [755, 21, 94];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
