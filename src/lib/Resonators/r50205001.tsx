import { EveryElement, ResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '앙코';
const element: EveryElement = '용융';
const weaponCategory: EveryWeaponCategory = '증폭기';
const [hp1, atk1, def1] = [841, 34, 102];

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
  minorFortes: ['atk', 'fire'],
});

export default result;
