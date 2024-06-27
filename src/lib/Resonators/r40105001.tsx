import { EveryElement, ResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '설지';
const element: EveryElement = '응결';
const weaponCategory: EveryWeaponCategory = '증폭기';
const [hp1, atk1, def1] = [1025, 17, 82];

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
  minorFortes: ['hp', 'heal'],
});

export default result;
