import ResonatorData from './ResonatorData'

const result = new ResonatorData({
  name: '절지',
  element: 'ice',
  weaponCategory: '증폭기',
  base: [980, 30, 98],
  forte: {
    normal: {
      name: '',
      basic: [],
      heavy: [],
      air: [],
      airHeavy: [],
      counter: [],
    },
    skill: {
      name: '',
      skill: [],
    },
    circuit: {
      name: '',
      circuit: {
        name: '',
        circuitType: 'stack',
        max: 0,
      },
      skill: [],
    },
    liberation: {
      name: '',
      skill: [],
    },
    intro: {
      name: '',
      skill: [],
    },
    outro: {
      name: '',
      skill: [],
    },
  },
  statBonus: ['atk', 'ice'],
})

export default result
