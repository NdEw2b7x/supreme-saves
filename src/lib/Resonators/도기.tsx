import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '도기';
const element: EveryElement = '인멸';
const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [716, 18, 128];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['방어력', '인멸 피해 보너스'],
});

export default result;
