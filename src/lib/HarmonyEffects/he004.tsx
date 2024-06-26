import { Effect2 } from '.';
import HarmonyEffectData from './HarmonyEffectData';
import { Harmony, Stats } from '../../types';

const code = 'he004';
const name: Harmony = '스쳐가는 바람';
const effect2: Effect2 = { wind: 0.1 };
const effect5: Partial<Record<Stats, number>> = { wind: 0.1 };

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
