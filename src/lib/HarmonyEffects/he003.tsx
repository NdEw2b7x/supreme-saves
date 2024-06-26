import { Effect2 } from '.';
import HarmonyEffectData from './HarmonyEffectData';
import { Harmony, Stats } from '../../types';

const code = 'he003';
const name: Harmony = '울려퍼지는 뇌음';
const effect2: Effect2 = { electro: 0.1 };
const effect5: Partial<Record<Stats, number>> = { electro: 0.1 };

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
