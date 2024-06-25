import { EveryElement, ResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '양양';
const element: EveryElement = '기류';
const weaponCategory: EveryWeaponCategory = '직검';
const [hp1, atk1, def1] = [816, 20, 90];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['atk', 'wind'],
});

export default result;
