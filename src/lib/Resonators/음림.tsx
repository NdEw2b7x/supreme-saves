import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '음림';
const element: EveryElement = '전도';
const weaponType: EveryWeaponCategory = '증폭기';
const [hp, atk, def] = [880, 32, 105];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
