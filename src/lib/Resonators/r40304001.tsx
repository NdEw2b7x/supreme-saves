import { EveryElement, EveryResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: EveryResonatorName = '연무';
const element: EveryElement = '전도';
const weaponCategory: EveryWeaponCategory = '권갑';
const [hp1, atk1, def1] = [682, 18, 134];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  minorFortes: ['방어력%', '전도 피해 보너스'],
});

export default result;
