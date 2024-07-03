import { Element, WeaponCategory } from '../../types';
import ResonatorData from './ResonatorData';

const name = '설지';
const element: Element = 'ice';
const weaponCategory: WeaponCategory = '증폭기';
const [hp1, atk1, def1] = [1025, 17, 82];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  skill: {
    normal: {
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
      circuit: { name: '', max: 0 },
    },
    liberation: { name: '', skill: [] },
    intro: { name: '', skill: [] },
    outro: { name: '', skill: [] },
  },
  statBonus: ['hp', 'heal'],
  plant: 'Lanternberry',
  normalMaterial: 'Howler',
  bossMeterial: 'N74',
  upgrade: 'Bell',
});

export default result;
