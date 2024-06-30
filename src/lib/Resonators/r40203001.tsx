import { ResonatorName, WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '치샤';
const element = 'fire';
const weaponCategory: WeaponCategory = '권총';
const [hp1, atk1, def1] = [727, 24, 78];

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
  minorFortes: ['atk', 'fire'],
});

export default result;
