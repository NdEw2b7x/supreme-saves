import { Effect2, Effect5 } from '.';
import HarmonyEffectData from './HarmonyEffectData';

const code = 'he003';
const name = '울려퍼지는 뇌음';
const effect2: Effect2 = { stat: 'electro', value: 0.1 };
const effect5: Effect5 = [
  { action: ['heavy'], stat: 'electro', value: 0.15, buffType: 'self' },
  { action: ['skill'], stat: 'electro', value: 0.15, buffType: 'self' },
];

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
