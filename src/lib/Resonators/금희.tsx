import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '기염';
// const name: EveryResonatorName = '장리';
const element: EveryElement = '회절';
const weaponType: EveryWeaponCategory = '대검';
const [hp, atk, def] = [866, 33, 103];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
