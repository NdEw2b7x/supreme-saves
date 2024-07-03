import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '능양';
const weaponCategory: WeaponCategory = '권갑';
const [hp1, atk1, def1] = [831, 35, 99];

const result = new ResonatorData({
  name,
  element: 'ice',
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
  statBonus: ['atk', 'ice'],
});

export default result;
