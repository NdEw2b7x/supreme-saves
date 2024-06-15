import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '능양';
const element: EveryElement = '응결';
const weaponType: EveryWeaponCategory = '권갑';
const [hp, atk, def] = [831, 35, 99];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
