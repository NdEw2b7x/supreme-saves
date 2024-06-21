import { EveryElement, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const element: EveryElement = '용융';
const weaponCategory: EveryWeaponCategory = '직검';
const [hp1, atk1, def1] = [831, 37, 90];

const result = new ResonatorData({
  name: '장리',
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['공격력%', '용융 피해 보너스'],
});

export default result;
