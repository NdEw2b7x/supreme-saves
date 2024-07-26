import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '알토';
const element = 'wind';
const weaponCategory: WeaponCategory = '권총';
const [hp1, atk1, def1] = [788, 21, 88];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  statBonus: ['atk', 'wind'],
});

export default result;
