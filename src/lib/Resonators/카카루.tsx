import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '카카루';
const element: EveryElement = '전도';
const weaponType: EveryWeaponCategory = '대검';
const [hp, atk, def] = [840, 35, 97];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
