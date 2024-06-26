import { Effect2 } from '.';
import HarmonyEffectData from './HarmonyEffectData';
import { Stats } from '../../types';

const code = 'he006';
const name = '빛을 삼키는 해';
const effect2: Effect2 = { dark: 0.1 };
const effect5: Partial<Record<Stats, number>> = { ice: 0.1 };

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
