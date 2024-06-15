import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '연무';
const element: EveryElement = '전도';
const weaponType: EveryWeaponCategory = '권갑';
const [hp, atk, def] = [682, 18, 134];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
