import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '기염';
const element: EveryElement = '기류';
const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [839, 35, 97];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['공격력', '공격력'],
});

export default result;
