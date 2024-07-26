import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '도기';
const weaponCategory: WeaponCategory = '대검';
const [hp1, atk1, def1] = [716, 18, 128];

const result = new ResonatorData({
  name,
  element: 'dark',
  weaponCategory,
  base: [hp1, atk1, def1],
  statBonus: ['def', 'dark'],
});

export default result;
