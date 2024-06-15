import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '방랑자';
let element: EveryElement = '인멸';
const weaponType: EveryWeaponCategory = '직검';
const [hp, atk, def] = [866, 33, 103];
// switch (defaultRoverElement) {
//   case '회절':
//     break;

//   default:
//     break;
// }

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
