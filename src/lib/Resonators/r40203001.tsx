import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '치샤';
const element: EveryElement = '용융';
const weaponCategory: EveryWeaponCategory = '권총';
const [hp1, atk1, def1] = [727, 24, 78];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['atk', 'fire'],
});

export default result;
