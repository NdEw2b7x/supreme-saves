import { EveryElement, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const element: EveryElement = '기류';
const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [839, 35, 97];

const result = new ResonatorData({
  name: '기염',
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
  minorFortes: ['atk', 'cRate'],
});

export default result;
