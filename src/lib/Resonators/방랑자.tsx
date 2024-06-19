import { EveryElement } from '../../types';
import ResonatorData from './ResonatorData';

let element: EveryElement = '인멸';
let [hp1, atk1, def1] = [0, 0, 0];

const elementFromStorage = localStorage.getItem('방랑자_속성');
if (elementFromStorage) {
  switch (JSON.parse(elementFromStorage)) {
    case '회절':
      element = '회절';
      [hp1, atk1, def1] = [912, 30, 112];
      break;
    case '인멸':
      element = '인멸';
      [hp1, atk1, def1] = [866, 33, 103];
      break;
  }
}
const result = new ResonatorData('방랑자', element, '직검', [hp1, atk1, def1]);

export default result;
