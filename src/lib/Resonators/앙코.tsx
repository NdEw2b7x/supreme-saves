import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '앙코';
const element: EveryElement = '용융';
const weaponCategory: EveryWeaponCategory = '증폭기';
const [hp1, atk1, def1] = [841, 34, 102];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['공격력', '공격력'],
});

export default result;
