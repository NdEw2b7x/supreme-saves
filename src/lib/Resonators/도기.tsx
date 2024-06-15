import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '도기';
const element: EveryElement = '인멸';
const weaponType: EveryWeaponCategory = '대검';
const [hp, atk, def] = [716, 18, 128];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
