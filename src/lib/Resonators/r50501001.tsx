import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '기염';
// const name: EveryResonatorName = '금희';
const element: EveryElement = '회절';
const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [866, 33, 103];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['atk', 'light'],
});

export default result;
