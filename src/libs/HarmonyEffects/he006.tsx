import { Effect2, Effect5 } from '.';
import HarmonyEffectData from './HarmonyEffectData';

const code = 'he006';
const name = '빛을 삼키는 해';
const effect2: Effect2 = { stat: 'dark', value: 0.1 };
const effect5: Effect5 = [
  { buffType: 'self', action: ['basic', 'heavy'], stat: 'dark', value: 0.075, stack: 4 },
];

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
