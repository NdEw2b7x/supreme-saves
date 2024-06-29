import { Effect2, Effect5 } from '.';
import HarmonyEffectData from './HarmonyEffectData';

const code = 'he001';
const name = '야밤의 서리';
const effect2: Effect2 = { stat: 'ice', value: 0.1 };
const effect5: Effect5 = [
  { action: ['basic', 'heavy'], stat: 'ice', value: 0.1, stack: 3, buffType: 'self' },
];

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
