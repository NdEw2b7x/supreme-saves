import { WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const weaponCategory: WeaponCategory = '직검';
const [hp1, atk1, def1] = [831, 37, 90];

const result = new ResonatorData({
  name: '장리',
  element: 'fire',
  weaponCategory,
  base: [hp1, atk1, def1],
  skill: {
    basic: {
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
      gaugeName: '',
    },
    burst: { name: '', skill: [] },
    intro: { name: '', skill: [] },
    outro: { name: '', skill: [] },
  },
  minorFortes: ['atk', 'fire'],
});

export default result;
