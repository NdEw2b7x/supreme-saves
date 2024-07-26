import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '모르테피';
const element = 'fire';
const weaponCategory: WeaponCategory = '권총';
const [hp1, atk1, def1] = [802, 20, 93];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  statBonus: ['atk', 'fire'],
});

export default result;
