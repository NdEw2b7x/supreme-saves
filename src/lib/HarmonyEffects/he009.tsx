import { Effect2 } from '.';
import HarmonyEffectData from './HarmonyEffectData';
import { Stats } from '../../types';

const code = 'he009';
const name = '끊임없는 잔향';
const effect2: Effect2 = { atk: 0.1 };
const effect5: Partial<Record<Stats, number>> = { ice: 0.1 };

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
