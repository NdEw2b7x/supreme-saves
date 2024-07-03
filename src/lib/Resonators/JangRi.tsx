import { WeaponCategory } from '../../types';
import ResonatorData, { genATKDamageNode } from './ResonatorData';

const weaponCategory: WeaponCategory = '직검';
const [hp1, atk1, def1] = [831, 37, 90];

const result = new ResonatorData({
  name: '장리',
  element: 'fire',
  weaponCategory,
  base: [hp1, atk1, def1],
  skill: {
    normal: {
      name: '불사조의 힘',
      basic: [],
      heavy: [],
      air: [],
      airHeavy: [],
      counter: [],
    },
    skill: { name: '불멸의 깃털', skill: [] },
    circuit: {
      name: '이화의 화신',
      circuit: { name: '이화', max: 4 },
      skill: [genATKDamageNode([[0.1631, 5], [1.9025]], '이화의 화신')],
    },
    liberation: {
      name: '이화의 충성심',
      skill: [genATKDamageNode([[6.1]])],
    },
    intro: { name: '정의의 심판', skill: [] },
    outro: { name: '끊이지 않는 전법', skill: [] },
  },
  statBonus: ['atk', 'cRate'],
});

export default result;
