import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '산화';
const element: EveryElement = '응결';
const weaponType: EveryWeaponCategory = '직검';
const [hp, atk, def] = [805, 22, 77];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
