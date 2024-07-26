import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '치샤';
const element = 'fire';
const weaponCategory: WeaponCategory = '권총';
const [hp1, atk1, def1] = [727, 24, 78];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  statBonus: ['atk', 'fire'],
});

export default result;
