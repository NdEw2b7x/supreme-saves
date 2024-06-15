import { EveryResonatorName } from '../../types';
import ResonatorData from './ResonatorData';
import 감심 from './감심';
import 기염 from './기염';
import 능양 from './능양';
import 단근 from './단근';
import 도기 from './도기';
import 모르테피 from './모르테피';
import 방랑자 from './방랑자';
import 벨리나 from './벨리나';
import 산화 from './산화';
import 설지 from './설지';
import 알토 from './알토';
import 앙코 from './앙코';
import 양양 from './양양';
import 연무 from './연무';
import 음림 from './음림';
import 치샤 from './치샤';
import 카카루 from './카카루';

export const everyResonatorData: Record<EveryResonatorName, ResonatorData> = {
  감심,
  기염,
  //   금희,
  능양,
  단근,
  도기,
  모르테피,
  방랑자,
  벨리나,
  산화,
  설지,
  알토,
  앙코,
  양양,
  연무,
  음림,
  //   장리,
  치샤,
  카카루,
} as const;
