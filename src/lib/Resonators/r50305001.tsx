import { ResonatorName, WeaponCategory } from '../../types';
import ResonatorData, { ResonatorSkill, genATKSkillNode } from './ResonatorData';

const name: ResonatorName = '음림';
const weaponCategory: WeaponCategory = '증폭기';
const [hp1, atk1, def1] = [880, 32, 105];
const genNode = genATKSkillNode('atack');
const skill: ResonatorSkill = {
  basic: {
    name: '현사의 화련무',
    basic: [
      genNode([[0.1449]]),
      genNode([[0.1701, 2]]),
      genNode([[0.07035, 7]]),
      genNode([[0.378]]),
    ],
    heavy: [genNode([[0.15, 2]])],
    air: [genNode([[0.62]])],
    airHeavy: [],
    counter: [genNode([[0.1218, 7]])],
  },
  skill: {
    name: '자기장의 포효',
    skill: [
      genNode([[0.3, 3]], '자기장의 포효'),
      genNode([[0.45, 4]], '천둥의 폭발'),
      genNode([[0.1]], '자기장의 폭발'),
    ],
  },
  circuit: {
    name: '천면 매혹',
    skill: [genNode([[0.9, 2]])],
    coAtack: { skill: [[genNode([[0.3956]], '심판의 뇌전')]] },
    gaugeName: '',
  },
  burst: { name: '파천의 뇌격', skill: [genNode([[0.5863, 7]])] },
  intro: { name: '광풍의 뇌정', skill: [genNode([[0.072, 10]])] },
  outro: { name: '', skill: [] },
};
// inherent: [{ trigger: 'skill', stat: 'cRate', value: 0.15 }],

const result = new ResonatorData({
  name,
  element: 'electro',
  weaponCategory,
  base: [hp1, atk1, def1],
  skill,
  minorFortes: ['atk', 'cRate'],
});

export default result;
