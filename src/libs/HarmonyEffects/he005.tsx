import { Effect2, Effect5 } from '.';
import HarmonyEffectData from './HarmonyEffectData';

const code = 'he005';
const name = '빛나는 별';
const effect2: Effect2 = { stat: 'light', value: 0.1 };
const effect5: Effect5 = [{ buffType: 'self', action: ['intro'], stat: 'light', value: 0.3 }];

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
