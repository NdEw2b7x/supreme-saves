import { Effect2, Effect5 } from '.';
import HarmonyEffectData from './HarmonyEffectData';

const code = 'he007';
const name = '찬란한 광휘';
const effect2: Effect2 = { stat: 'heal', value: 0.1 };
const effect5: Effect5 = [{ action: ['heal'], stat: 'atk', value: 0.15, buffType: 'team' }];

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
