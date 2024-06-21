import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '알토';
const element: EveryElement = '기류';
const weaponCategory: EveryWeaponCategory = '권총';
const [hp1, atk1, def1] = [788, 21, 88];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['공격력%', '기류 피해 보너스'],
});

export default result;