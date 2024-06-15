import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '앙코';
const element: EveryElement = '용융';
const weaponType: EveryWeaponCategory = '증폭기';
const [hp, atk, def] = [841, 34, 102];

const result = new ResonatorData(name, element, weaponType, [hp, atk, def]);

export default result;
