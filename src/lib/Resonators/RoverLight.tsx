import ResonatorData from './ResonatorData';

const result = new ResonatorData({
  name: '방랑자',
  element: 'light',
  weaponCategory: '직검',
  base: [912, 30, 112],
  skill: {
    normal: {
      name: '',
      basic: [],
      heavy: [],
      air: [],
      counter: [],
      airHeavy: [],
    },
    skill: { name: '', skill: [] },
    circuit: {
      name: '',
      skill: [],
      circuit: { name: '', max: 0 },
    },
    liberation: { name: '', skill: [] },
    intro: { name: '', skill: [] },
    outro: { name: '', skill: [] },
  },
  statBonus: ['atk', 'light'],
});

export default result;
