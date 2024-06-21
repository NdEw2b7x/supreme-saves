import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '카카루';
const element: EveryElement = '전도';
const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [840, 35, 97];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['공격력%', '크리티컬 피해'],
});

export default result;
