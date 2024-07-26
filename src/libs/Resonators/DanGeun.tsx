import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '단근';
const weaponCategory: WeaponCategory = '직검';
const [hp1, atk1, def1] = [755, 21, 94];

const result = new ResonatorData({
  name,
  element: 'dark',
  weaponCategory,
  base: [hp1, atk1, def1],
  statBonus: ['atk', 'dark'],
});

export default result;
