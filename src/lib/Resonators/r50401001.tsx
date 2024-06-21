import { EveryElement, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const element: EveryElement = '기류';
const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [839, 35, 97];

const result = new ResonatorData({
  name: '기염',
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['공격력%', '크리티컬 확률'],
});

export default result;
