import { ResonatorName, WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '연무';
const element = 'electro';
const weaponCategory: WeaponCategory = '권갑';
const [hp1, atk1, def1] = [682, 18, 134];

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
  minorFortes: ['def', 'electro'],
});

export default result;
