import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '알토';
const element: EveryElement = '기류';
const weaponCategory: EveryWeaponCategory = '권총';
const [hp1, atk1, def1] = [788, 21, 88];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['공격력', '공격력'],
});

export default result;
