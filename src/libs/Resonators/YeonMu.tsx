import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '연무';
const element = 'electro';
const weaponCategory: WeaponCategory = '권갑';
const [hp1, atk1, def1] = [682, 18, 134];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  statBonus: ['def', 'electro'],
});

export default result;
