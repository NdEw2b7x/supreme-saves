import { Effect2, Effect5 } from '.';
import HarmonyEffectData from './HarmonyEffectData';

const code = 'he004';
const name = '스쳐가는 바람';
const effect2: Effect2 = { stat: 'wind', value: 0.1 };
const effect5: Effect5 = [{ action: ['intro'], stat: 'wind', value: 0.3, buffType: 'self' }];

const result = new HarmonyEffectData({ code, name, effect2, effect5 });
export default result;
