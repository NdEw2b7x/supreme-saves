import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '감심';
const element: EveryElement = '기류';
const weaponCategory: EveryWeaponCategory = '권갑';
const [hp1, atk1, def1] = [1129, 27, 92];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['공격력%', '크리티컬 확률'],
});

export default result;
