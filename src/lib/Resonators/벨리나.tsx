import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '벨리나';
const element: EveryElement = '회절';
const weaponType: EveryWeaponCategory = '증폭기';
const [hp, atk, def] = [1139, 27, 90];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
