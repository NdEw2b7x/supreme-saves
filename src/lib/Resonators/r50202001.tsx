import { EveryElement, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const element: EveryElement = '용융';
const weaponCategory: EveryWeaponCategory = '직검';
const [hp1, atk1, def1] = [831, 37, 90];

const result = new ResonatorData({
  name: '장리',
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  skill: {
    basic: {
      name: '',
      basic: [],
      heavy: [],
      air: {
        multiply: 0,
        times: undefined,
        scale: 'ATK',
      },
      counter: {
        multiply: 0,
        times: undefined,
        scale: 'ATK',
      },
    },
    skill: [],
    circuit: {
      name: '',
      replace: undefined,
      multiply: 0,
      times: undefined,
      scale: 'ATK',
    },
    burst: [],
    intro: [],
    outro: [],
    inherent: [],
  },
  minorFortes: ['atk', 'fire'],
});

export default result;
