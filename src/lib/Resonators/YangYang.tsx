import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '양양';
const element = 'wind';
const weaponCategory: WeaponCategory = '직검';
const [hp1, atk1, def1] = [816, 20, 90];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  skill: {
    normal: {
      name: '',
      basic: [],
      heavy: [],
      air: [],
      counter: [],
      airHeavy: [],
    },
    skill: { name: '', skill: [] },
    circuit: {
      name: '',
      skill: [],
      circuit: { name: '', max: 0 },
    },
    liberation: { name: '', skill: [] },
    intro: { name: '', skill: [] },
    outro: { name: '', skill: [] },
  },
  statBonus: ['atk', 'wind'],
});

export default result;
