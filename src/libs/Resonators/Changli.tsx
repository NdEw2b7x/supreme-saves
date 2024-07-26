import ResonatorData, { genATKDamageNode } from './ResonatorData'

const result = new ResonatorData({
  name: '장리',
  element: 'fire',
  weaponCategory: '직검',
  base: [831, 37, 90],
  forte: {
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
      circuit: { name: '이화', circuitType: 'stack', max: 4 },
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
})

export default result
