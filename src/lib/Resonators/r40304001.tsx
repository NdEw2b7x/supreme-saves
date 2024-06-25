import { EveryElement, ResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '연무';
const element: EveryElement = '전도';
const weaponCategory: EveryWeaponCategory = '권갑';
const [hp1, atk1, def1] = [682, 18, 134];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['def', 'electro'],
});

export default result;
