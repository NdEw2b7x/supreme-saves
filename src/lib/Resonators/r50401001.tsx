import { EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [839, 35, 97];

const result = new ResonatorData({
  name: '기염',
  element: 'wind',
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
    skill: {
      name: '',
      skill: [],
    },
    circuit: {
      name: '',
      skill: [],
      gaugeName: '',
    },
    burst: { name: '', skill: [] },
    intro: { name: '', skill: [] },
    outro: { name: '', skill: [] },
  },
  minorFortes: ['atk', 'cRate'],
});

export default result;
