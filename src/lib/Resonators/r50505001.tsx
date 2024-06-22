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
  base: [hp1, atk1, def1],
  minorFortes: ['atk', 'heal'],
});

export default result;
