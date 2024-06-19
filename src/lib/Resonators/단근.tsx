import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '단근';
const element: EveryElement = '인멸';
const weaponCategory: EveryWeaponCategory = '직검';
const [hp1, atk1, def1] = [755, 21, 94];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['공격력', '공격력'],
});

export default result;
