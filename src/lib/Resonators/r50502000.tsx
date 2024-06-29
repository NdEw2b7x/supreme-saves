import { Element } from '../../types';
import ResonatorData, { MinorForte } from './ResonatorData';

let element: Element = 'light';
let [hp1, atk1, def1] = [912, 30, 112];
let minorFortes: [MinorForte, MinorForte] = ['atk', 'light'];

const elementFromStorage = localStorage.getItem('방랑자_속성');
if (elementFromStorage) {
  switch (JSON.parse(elementFromStorage)) {
    case '인멸':
      element = 'dark';
      [hp1, atk1, def1] = [866, 33, 103];
      minorFortes = ['atk', 'dark'];
      break;
  }
}

const result = new ResonatorData({
  name: '방랑자',
  element,
  weaponCategory: '직검',
  base: [hp1, atk1, def1],
  skill: {
    basic: {
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
      gaugeName: '',
    },
    burst: { name: '', skill: [] },
    intro: { name: '', skill: [] },
    outro: { name: '', skill: [] },
  },
  minorFortes,
});

export default result;
