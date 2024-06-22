import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '능양';
const element: EveryElement = '응결';
const weaponCategory: EveryWeaponCategory = '권갑';
const [hp1, atk1, def1] = [831, 35, 99];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['atk', 'ice'],
});

export default result;
