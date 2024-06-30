import { ResonatorName, WeaponCategory, Element } from '../../types';
import ResonatorData, { genATKSkillNode } from './ResonatorData';

const name: ResonatorName = '앙코';
const element: Element = 'fire';
const weaponCategory: WeaponCategory = '증폭기';
const [hp1, atk1, def1] = [841, 34, 102];
const genNode = genATKSkillNode('atack');

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  skill: {
    basic: {
      name: '그늘이와 구름이 출격',
      basic: [
        genNode([[0.28]]),
        genNode([[0.333]]),
        genNode([[0.3335, 2]]),
        genNode([[0.1925, 4]]),
        genNode([[1.2]], '메에메에'),
      ],
      heavy: [genNode([[0.941]])],
      air: [genNode([[0.62]])],
      airHeavy: [],
      counter: [genNode([[0.6334]])],
    },
    skill: {
      name: '불꽃 양',
      skill: [genNode([[0.3853, 8]], '불꽃 양'), genNode([[1.706]], '열렬한 환영식')],
    },
    circuit: {
      name: '그늘이와 구름이',
      gaugeName: '',
      skill: [],
    },
    burst: { name: '', skill: [] },
    intro: { name: '', skill: [] },
    outro: { name: '', skill: [] },
  },
  minorFortes: ['atk', 'fire'],
});

export default result;
