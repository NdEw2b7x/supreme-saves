import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '설지';
const element: EveryElement = '응결';
const weaponCategory: EveryWeaponCategory = '증폭기';
const [hp1, atk1, def1] = [1025, 17, 82];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  basic: [hp1, atk1, def1],
  minorForte: ['공격력', '공격력'],
});

export default result;
