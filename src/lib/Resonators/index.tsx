import { EveryResonatorName } from '../../types';
import ResonatorData from './ResonatorData';
import 감심 from './r50404001';
import 기염 from './r50401001';
import 능양 from './r50104001';
import 단근 from './r40602001';
import 도기 from './r40601000';
import 모르테피 from './r40203002';
import 방랑자 from './r50602001';
import 벨리나 from './r50505001';
import 산화 from './r40102001';
import 설지 from './r40105001';
import 알토 from './r40403001';
import 앙코 from './r50205001';
import 양양 from './r40402001';
import 연무 from './r40304001';
import 음림 from './r50305001';
import 치샤 from './r40203001';
import 카카루 from './r50301001';

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
