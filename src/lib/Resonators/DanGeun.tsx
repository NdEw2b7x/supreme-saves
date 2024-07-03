import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '단근';
const weaponCategory: WeaponCategory = '직검';
const [hp1, atk1, def1] = [755, 21, 94];

const result = new ResonatorData({
  name,
  element: 'dark',
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
  statBonus: ['atk', 'dark'],
});

export default result;
