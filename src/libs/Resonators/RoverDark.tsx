import ResonatorData, { genATKDamageNode } from './ResonatorData';

const result = new ResonatorData({
  name: '방랑자',
  element: 'dark',
  weaponCategory: '직검',
  base: [866, 33, 103],
  forte: {
    normal: {
      name: '깃털의 소리',
      basic: [
        genATKDamageNode([[0.285]]),
        genATKDamageNode([[0.285, 2]]),
        genATKDamageNode([[0.4275]]),
        genATKDamageNode([[0.2027, 3]]),
        genATKDamageNode([[0.475, 2]]),
      ],
      heavy: [genATKDamageNode([[0.48]])],
      air: [genATKDamageNode([[0.589]])],
      airHeavy: [],
      counter: [genATKDamageNode([[0.9025]])],
    },
    skill: {
      name: '평정의 칼날',
      skill: [genATKDamageNode([[1.44, 2]])],
    },
    circuit: {
      name: '영야개명',
      circuit: { name: '어둠의 흐름', circuitType: 'mode', max: 100 },
      skill: [genATKDamageNode([[1.1475]], '풍습', 'heavy')],
      enhanced: {
        name: '다크 서지',
        basic: {
          basic: [
            genATKDamageNode([[0.2835]]),
            genATKDamageNode([[0.4725]]),
            genATKDamageNode([[0.783]]),
            genATKDamageNode([[0.1868, 3], [0.5603]]),
            genATKDamageNode([[0.1435, 4], [0.5738]]),
            genATKDamageNode([[0.1435, 4], [0.5738]]),
          ],
          heavy: [
            genATKDamageNode([[0.637], [0.05, 4]]),
            genATKDamageNode([[0.637], [0.05, 4]], '우짖는 칼날'),
          ],
        },
        skill: {
          skill: [
            genATKDamageNode(
              [
                [1.39, 2],
                [0.05, 4],
              ],
              '격살'
            ),
          ],
        },
      },
    },
    liberation: { name: '임연사적', skill: [genATKDamageNode([[7.65]])] },
    intro: { name: '화찰', skill: [genATKDamageNode([[1]])] },
    outro: { name: '소리의 부름', skill: [genATKDamageNode([[1.433]])] },
  },
  statBonus: ['atk', 'dark'],
  chain: {
    1: { name: '현의 여운', contents: [{ category: 'selfBuff', stat: 'skill', value: 0.3 }] },
    2: { name: '낮과 밤', contents: [] },
    3: {
      name: '만물의 울림',
      contents: [{ category: 'heal', value: [{ scale: 'HP', multiplier: 0.1 }] }],
    },
    4: {
      name: '인멸의 먼지 소리',
      contents: [{ category: 'debuff', stat: 'dark_res', value: 0.1 }],
    },
    5: { name: '만물의 경청', contents: [] },
    6: { name: '다크 서지 상승', contents: [{ category: 'selfBuff', stat: 'cRate', value: 0.25 }] },
  },
});

export default result;

// type chainItem<T> = T extends { category: 'heal' }
//   ? { category: 'heal'; value: { scale: string; muliple: number; flat?: number }[] }
//   : {};
