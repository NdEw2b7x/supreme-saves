import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '벨리나';
const element: EveryElement = '회절';
const weaponCategory: EveryWeaponCategory = '증폭기';
const [hp1, atk1, def1] = [1139, 27, 90];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['공격력', '치료 효과 보너스'],
});

export default result;
