import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '양양';
const element: EveryElement = '기류';
const weaponCategory: EveryWeaponCategory = '직검';
const [hp1, atk1, def1] = [816, 20, 90];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['공격력', '공격력'],
});

export default result;
