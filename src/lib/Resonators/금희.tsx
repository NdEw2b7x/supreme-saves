import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '기염';
// const name: EveryResonatorName = '장리';
const element: EveryElement = '회절';
const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [866, 33, 103];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['공격력', '회절 피해 보너스'],
});

export default result;
