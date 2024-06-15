import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '능양';
// const name: EveryResonatorName = '장리';
const element: EveryElement = '용융';
const weaponType: EveryWeaponCategory = '직검';
const [hp, atk, def] = [831, 37, 90];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
