import { Effect2, Effect5 } from '.';
import HarmonyEffectData from './HarmonyEffectData';

const code = 'he008';
const name = '떠오르는 구름';
const effect2: Effect2 = { stat: 'energy', value: 0.1 };
const effect5: Effect5 = [{ action: ['outro'], stat: 'energy', value: 0, buffType: 'next' }];

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
