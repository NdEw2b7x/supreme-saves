import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '설지';
const element: EveryElement = '응결';
const weaponType: EveryWeaponCategory = '증폭기';
const [hp, atk, def] = [1025, 17, 82];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
