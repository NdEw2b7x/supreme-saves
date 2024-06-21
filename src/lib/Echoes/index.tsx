import { EchoCost, Harmony, everyHarmony } from '../../types';
import { getCost } from '../../types/everyEcho';
import EchoData from './EchoData';
import G01 from './G01';
import G02 from './G02';
import G03 from './G03';
import G04 from './G04';
import H01 from './H01';
import H02 from './H02';
import H05 from './H05';
import H08 from './H08';
import H09 from './H09';
import H11 from './H11';
import H12 from './H12';
// import H13 from './H13';
// import H14 from './H14';
import H15 from './H15';
// import H16 from './H16';
// import H17 from './H17';
// import H18 from './H18';
import H19 from './H19';
import H41 from './H41';
import H42 from './H42';
import H49 from './H49';
import H51 from './H51';
import H71 from './H71';
import H72 from './H72';
import H73 from './H73';
import H80 from './H80';
import H81 from './H81';
import H91 from './H91';
import N11 from './N11';
import N12 from './N12';
import N13 from './N13';
import N14 from './N14';
import N74 from './N74';
import R55 from './R55';
import R56 from './R56';
import S05 from './S05';
import S06 from './S06';
import S08 from './S08';
import S09 from './S09';
import W77 from './W77';
import X54 from './X54';

export { EchoData };

type n = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type EchoCode = `${'G' | 'H' | 'N' | 'R' | 'S' | 'W' | 'X'}${n}${n}`;

export const everyEchoData: Partial<Record<EchoCode, EchoData>> = {
  G01,
  G02,
  G03,
  G04,
  H01,
  H02,
  H05,
  H08,
  H09,
  // H10,
  H11,
  H12,
  // H13,
  // H14,
  H15,
  // H16,
  // H17,
  // H18,
  H19,
  H41,
  H42,
  H49,
  H51,
  H71,
  H72,
  H73,
  H80,
  H81,
  H91,
  N11,
  N12,
  N13,
  N14,
  N74,
  R55,
  R56,
  S05,
  S06,
  S08,
  S09,
  W77,
  X54,
} as const;

export const everyEchoInvertHarmony: Record<
  Harmony,
  Record<EchoCost, Partial<Record<EchoCode, EchoData>>>
> = {
  '야밤의 서리': { 4: {}, 3: {}, 1: {} },
  '솟구치는 용암': { 4: {}, 3: {}, 1: {} },
  '울려퍼지는 뇌음': { 4: {}, 3: {}, 1: {} },
  '스쳐가는 바람': { 4: {}, 3: {}, 1: {} },
  '빛나는 별': { 4: {}, 3: {}, 1: {} },
  '빛을 삼키는 해': { 4: {}, 3: {}, 1: {} },
  '찬란한 광휘': { 4: {}, 3: {}, 1: {} },
  '떠오르는 구름': { 4: {}, 3: {}, 1: {} },
  '끊임없는 잔향': { 4: {}, 3: {}, 1: {} },
};

everyHarmony.forEach((harmony) => {
  Object.values(everyEchoData).forEach((data) => {
    data.harmony.forEach((i) => {
      if (i === harmony) {
        const cost = getCost(data.dangerous);
        everyEchoInvertHarmony[harmony][cost] = {
          ...everyEchoInvertHarmony[harmony][cost],
          [data.code]: data,
        };
      }
    });
  });
});
