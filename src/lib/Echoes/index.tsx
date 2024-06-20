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

export { EchoData };

type n = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type EchoCode = `${'G' | 'H'}${n}${n}`;

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
} as const;
