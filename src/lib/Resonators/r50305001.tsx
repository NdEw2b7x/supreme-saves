import { EveryElement, ResonatorName, EveryWeaponCategory } from '../../types';
import ResonatorData, { ResonatorSkill, genNamedSkill } from './ResonatorData';

const name: ResonatorName = '음림';
const element: EveryElement = '전도';
const weaponCategory: EveryWeaponCategory = '증폭기';
const [hp1, atk1, def1] = [880, 32, 105];
const genNamedSkillAtk = genNamedSkill('ATK');
const skill: ResonatorSkill = {
  basic: {
    name: '현사의 화련무',
    basic: [
      {
        scale: 'ATK',
        value: [
          { multiply: 0.1449 },
          { multiply: 0.1701, times: 2 },
          { multiply: 0.0704, times: 7 },
          { multiply: 0.378 },
        ],
      },
    ],
    heavy: [{ scale: 'ATK', value: [{ multiply: 0.15, times: 2 }] }],
    air: { scale: 'ATK', multiply: 0.62 },
    counter: { scale: 'ATK', multiply: 0.1218, times: 7 },
  },
  skill: [
    genNamedSkillAtk([[0.3, 3]], '자기장의 포효'),
    genNamedSkillAtk([[0.45, 4]], '천둥의 폭발'),
    genNamedSkillAtk([[0.1]], '자기장의 폭발'),
  ],
  circuit: { name: '천면 매혹', replace: 'heavy', scale: 'ATK', multiply: 0.9, times: 2 },
  burst: [{ name: '파천의 뇌격', multiply: 0.5863, times: 7 }],
  intro: [{ name: '광풍의 뇌정', multiply: 0.072, times: 10 }],
  outro: [],
  inherent: [{ trigger: 'skill', stat: 'cRate', value: 0.15 }],
};

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  skill,
  minorFortes: ['atk', 'cRate'],
});

export default result;
