import { EveryElement, EveryStatistics } from '../../types';
import ResonatorData from './ResonatorData';

let element: EveryElement = '회절';
let [hp1, atk1, def1] = [912, 30, 112];
let minorForte: [Exclude<EveryStatistics, '공명 효율'>, Exclude<EveryStatistics, '공명 효율'>] = [
  '공격력',
  '회절 피해 보너스',
];

const elementFromStorage = localStorage.getItem('방랑자_속성');
if (elementFromStorage) {
  switch (JSON.parse(elementFromStorage)) {
    case '인멸':
      element = '인멸';
      [hp1, atk1, def1] = [866, 33, 103];
      minorForte = ['공격력', '인멸 피해 보너스'];
      break;
  }
}

const result = new ResonatorData({
  name: '방랑자',
  element,
  weaponCategory: '직검',
  basic: [hp1, atk1, def1],
  minorForte,
});

export default result;
