import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '감심';
const weaponCategory: WeaponCategory = '권갑';
const [hp1, atk1, def1] = [1129, 27, 92];

const result = new ResonatorData({
  name,
  element: 'wind',
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
  statBonus: ['atk', 'cRate'],
});

export default result;
