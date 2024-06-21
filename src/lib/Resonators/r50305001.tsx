import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '음림';
const element: EveryElement = '전도';
const weaponCategory: EveryWeaponCategory = '증폭기';
const [hp1, atk1, def1] = [880, 32, 105];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['공격력%', '크리티컬 확률'],
});

export default result;
