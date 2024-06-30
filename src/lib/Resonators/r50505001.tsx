import { Element, ResonatorName, WeaponCategory } from '../../types';
import ResonatorData, { genATKSkillNode } from './ResonatorData';

const name: ResonatorName = '벨리나';
const element: Element = 'light';
const weaponCategory: WeaponCategory = '증폭기';
const [hp1, atk1, def1] = [1139, 27, 90];
const genNode = genATKSkillNode('atack');
const skill: ResonatorData['skill'] = {
  basic: {
    name: '육모',
    basic: [
      genNode([[0.1904]]),
      genNode([[0.2573]]),
      genNode([[0.1287, 2]]),
      genNode([[0.3386]]),
      genNode([[0.3603]]),
    ],
    heavy: [genNode([[0.5]])],
    air: [genNode([[0.2835]]), genNode([[0.27]]), genNode([[0.1279, 3]])],
    airHeavy: [genNode([[0.31]])],
    counter: [genNode([[0.65]])],
  },
  skill: {
    name: '식물 실험',
    skill: [genNode([[0.18, 3], [0.36]])],
  },
  circuit: {
    name: '별꽃의 개화',
    gaugeName: '광합성 에너지',
    skill: [
      genNode([[0.3267], [0.49]], '강공격·별꽃의 개화', 'heavy'),

      genNode([[0.3402]], '공중 공격·별꽃의 개화 1단', 'basic'),
      genNode([[0.321]], '공중 공격·별꽃의 개화 2단', 'basic'),
      genNode([[0.1534, 3]], '공중 공격·별꽃의 개화 3단', 'basic'),

      {
        scale: 'ATK',
        skillType: 'heal',
        value: [{ flat: 625 }, { multiply: 0.1417 }],
        name: '별꽃의 개화',
      },
    ],
  },
  burst: {
    name: '자라난 초목',
    skill: [
      genNode([[1]]),
      {
        scale: 'ATK',
        skillType: 'heal',
        value: [{ flat: 500, multiply: 0.1133 }],
        name: '자라난 초목',
      },
      genNode([[0.05]], '협동 공격'),
      {
        scale: 'ATK',
        skillType: 'heal',
        value: [{ flat: 225, multiply: 0.051 }],
        name: '협동 공격',
      },
    ],
  },
  intro: { name: '확산', skill: [genNode([[0.5]])] },
  outro: {
    name: '꽃의 만발',
    skill: [{ skillType: 'heal', scale: 'ATK', value: [{ multiply: 0.19 }] }],
  },
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
