import { EveryElement } from '../../types';
import ResonatorData, { MinorForte, genNamedSkill, genSkill } from './ResonatorData';

let element: EveryElement = '회절';
let [hp1, atk1, def1] = [912, 30, 112];
let minorFortes: [MinorForte, MinorForte] = ['atk', 'light'];

let skill: ResonatorData['skill'] = {
  basic: {
    name: '',
    basic: [],
    heavy: [],
    air: {
      multiply: 0,
      scale: 'ATK',
    },
    counter: {
      multiply: 0,
      scale: 'ATK',
    },
  },
  skill: [],
  circuit: {
    name: '',
    scale: 'ATK',
    multiply: 0,
  },
  burst: [],
  intro: [],
  outro: [],
  inherent: [],
};

const genSkillAtk = genSkill('ATK');
const genNamedSkillAtk = genNamedSkill('ATK');
const elementFromStorage = localStorage.getItem('방랑자_속성');
if (elementFromStorage) {
  switch (JSON.parse(elementFromStorage)) {
    case '인멸':
      element = '인멸';
      [hp1, atk1, def1] = [866, 33, 103];
      skill = {
        basic: {
          name: '깃털의 소리',
          basic: [
            genSkillAtk([[0.285]]),
            genSkillAtk([[0.285, 2]]),
            genSkillAtk([[0.4275]]),
            genSkillAtk([[0.2027, 3]]),
            genSkillAtk([[0.475, 2]]),
          ],
          heavy: [genSkillAtk([[0.48]])],
          air: { scale: 'ATK', multiply: 0.589 },
          counter: { scale: 'ATK', multiply: 0.9025 },
        },
        skill: [{ name: '평정의 칼날', value: [{ multiply: 1.44, times: 2 }] }],
        circuit: {
          name: '영야개명',
          replace: 'heavy',
          scale: 'ATK',
          multiply: 1.1475,
          enhanced: {
            name: '다크 서지',
            basic: {
              basic: [
                genSkillAtk([[0.2835]]),
                genSkillAtk([[0.4725]]),
                genSkillAtk([[0.783]]),
                genSkillAtk([[0.1868, 3], [0.5603]]),
                genSkillAtk([[0.1435, 4], [0.5738]]),
                genSkillAtk([[0.1435, 4], [0.5738]]),
              ],
              heavy: [genNamedSkillAtk([[0.637], [0.05, 4]], '명검')],
            },
            skill: [
              genNamedSkillAtk(
                [
                  [1.39, 2],
                  [0.05, 4],
                ],
                '격살'
              ),
            ],
          },
        },
        burst: [{ name: '임연사적', multiply: 7.65 }],
        intro: [{ name: '화찰', multiply: 1 }],
        outro: [{ name: '소리의 부름', scale: 'ATK', multiply: 1.433 }],
        inherent: [],
      };
      minorFortes = ['atk', 'dark'];
      break;
  }
}
// const chain = {
//   1: { category: 'selfBuff', name: '현의 여운', stat: 'skill', value: 0.3 },
//   4: { category: 'debuff', name: '인멸의 먼지 소리', stat: 'dark_res', value: 0.1 },
//   6: { category: 'selfBuff', name: '다크 서지 상승', stat: 'cRate', value: 0.25 },
// };

const result = new ResonatorData({
  name: '방랑자',
  element,
  weaponCategory: '직검',
  base: [hp1, atk1, def1],
  skill,
  minorFortes,
});

export default result;
