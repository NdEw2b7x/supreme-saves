import { EveryElement, ResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '산화';
const element: EveryElement = '응결';
const weaponCategory: EveryWeaponCategory = '직검';
const [hp1, atk1, def1] = [805, 22, 77];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['atk', 'ice'],
});

export default result;
