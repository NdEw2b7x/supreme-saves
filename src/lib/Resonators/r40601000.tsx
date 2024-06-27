import { EveryElement, ResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '도기';
const element: EveryElement = '인멸';
const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [716, 18, 128];

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
  minorFortes: ['def', 'dark'],
});

export default result;
