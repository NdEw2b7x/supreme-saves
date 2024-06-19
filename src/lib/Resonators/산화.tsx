import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '산화';
const element: EveryElement = '응결';
const weaponCategory: EveryWeaponCategory = '직검';
const [hp1, atk1, def1] = [805, 22, 77];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['공격력', '응결 피해 보너스'],
});

export default result;
