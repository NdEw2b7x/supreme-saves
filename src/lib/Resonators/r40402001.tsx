import { ResonatorName, WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '양양';
const element = 'wind';
const weaponCategory: WeaponCategory = '직검';
const [hp1, atk1, def1] = [816, 20, 90];

const result = new ResonatorData({
  name,
  element,
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
  minorFortes: ['atk', 'wind'],
});

export default result;
