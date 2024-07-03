import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '카카루';
const weaponCategory: WeaponCategory = '대검';
const [hp1, atk1, def1] = [840, 35, 97];

const result = new ResonatorData({
  name,
  element: 'electro',
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
  statBonus: ['atk', 'cDmg'],
});

export default result;
