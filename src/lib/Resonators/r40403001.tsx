import { ResonatorName, WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '알토';
const element = 'wind';
const weaponCategory: WeaponCategory = '권총';
const [hp1, atk1, def1] = [788, 21, 88];

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
      airHeavy: [],
      counter: [],
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
