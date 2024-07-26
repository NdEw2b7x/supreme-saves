import { WeaponCategory } from '../../types';
import ResonatorData, { ResonatorSkill, genATKDamageNode } from './ResonatorData';

const name = '음림';
const weaponCategory: WeaponCategory = '증폭기';
const [hp1, atk1, def1] = [880, 32, 105];
const forte: ResonatorSkill = {
  normal: {
    name: '현사의 화련무',
    basic: [
      genATKDamageNode([[0.1449]]),
      genATKDamageNode([[0.1701, 2]]),
      genATKDamageNode([[0.07035, 7]]),
      genATKDamageNode([[0.378]]),
    ],
    heavy: [genATKDamageNode([[0.15, 2]])],
    air: [genATKDamageNode([[0.62]])],
    airHeavy: [],
    counter: [genATKDamageNode([[0.1218, 7]])],
  },
  skill: {
    name: '자기장의 포효',
    skill: [
      genATKDamageNode([[0.3, 3]], '자기장의 포효'),
      genATKDamageNode([[0.45, 4]], '천둥의 폭발'),
      genATKDamageNode([[0.1]], '자기장의 폭발'),
    ],
  },
  circuit: {
    name: '천면 매혹',
    skill: [genATKDamageNode([[0.9, 2]]), genATKDamageNode([[0.3956]], '심판의 뇌전')],
    circuit: { name: '심판 게이지', circuitType: 'mode', max: 100 },
  },
  liberation: { name: '파천의 뇌격', skill: [genATKDamageNode([[0.5863, 7]])] },
  intro: { name: '광풍의 뇌정', skill: [genATKDamageNode([[0.072, 10]])] },
  outro: { name: '', skill: [] },
};
// inherent: [{ trigger: 'skill', stat: 'cRate', value: 0.15 }],

const result = new ResonatorData({
  name,
  element: 'electro',
  weaponCategory,
  base: [hp1, atk1, def1],
  forte,
  statBonus: ['atk', 'cRate'],
  bossMeterial: 'R56',
  normalMaterial: 'Whisperin',
  plant: 'Coriolus',
  upgrade: 'Feather',
});

export default result;
