import { EveryElement, ResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name: ResonatorName = '벨리나';
const element: EveryElement = '회절';
const weaponCategory: EveryWeaponCategory = '증폭기';
const [hp1, atk1, def1] = [1139, 27, 90];

const skill: ResonatorData['skill'] = {
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
    scale: 'ATK',
    multiply: 0,
    times: undefined,
  },
  burst: [],
  intro: [],
  outro: [],
  inherent: [],
};

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  skill,
  minorFortes: ['atk', 'heal'],
});

export default result;
