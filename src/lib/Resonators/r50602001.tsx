import { Element } from '../../types';
import ResonatorData, { MinorForte, ResonatorSkill, genATKSkillNode } from './ResonatorData';

let element: Element = 'light';
let [hp1, atk1, def1] = [912, 30, 112];
let minorFortes: [MinorForte, MinorForte] = ['atk', 'light'];

let skill: ResonatorSkill = {
  basic: { name: '', basic: [], heavy: [], air: [], airHeavy: [], counter: [] },
  skill: { name: '', skill: [] },
  circuit: { name: '', skill: [], gaugeName: '' },
  burst: { name: '', skill: [] },
  intro: { name: '', skill: [] },
  outro: { name: '', skill: [] },
};

const genNode = genATKSkillNode('atack');
const elementFromStorage = localStorage.getItem('방랑자_속성');
if (elementFromStorage) {
  switch (JSON.parse(elementFromStorage)) {
    case '인멸':
      element = 'dark';
      [hp1, atk1, def1] = [866, 33, 103];
      skill = {
        basic: {
          name: '깃털의 소리',
          basic: [
            genNode([[0.285]]),
            genNode([[0.285, 2]]),
            genNode([[0.4275]]),
            genNode([[0.2027, 3]]),
            genNode([[0.475, 2]]),
          ],
          heavy: [genNode([[0.48]])],
          air: [genNode([[0.589]])],
          airHeavy: [],
          counter: [genNode([[0.9025]])],
        },
        skill: {
          name: '평정의 칼날',
          skill: [genNode([[1.44, 2]])],
        },
        circuit: {
          name: '영야개명',
          skill: [genNode([[1.1475]])],
          enhanced: {
            name: '다크 서지',
            basic: {
              basic: [
                genNode([[0.2835]]),
                genNode([[0.4725]]),
                genNode([[0.783]]),
                genNode([[0.1868, 3], [0.5603]]),
                genNode([[0.1435, 4], [0.5738]]),
                genNode([[0.1435, 4], [0.5738]]),
              ],
              heavy: [genNode([[0.637], [0.05, 4]], '명검')],
            },
            skill: {
              skill: [
                genNode(
                  [
                    [1.39, 2],
                    [0.05, 4],
                  ],
                  '격살'
                ),
              ],
            },
          },
          gaugeName: '어둠의 흐름',
        },
        burst: {
          name: '임연사적',
          skill: [genNode([[7.65]])],
        },
        intro: {
          name: '화찰',
          skill: [{ scale: 'ATK', value: [{ multiply: 1 }], skillType: 'atack' }],
        },
        outro: { name: '소리의 부름', skill: [genNode([[1.433]])] },
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
