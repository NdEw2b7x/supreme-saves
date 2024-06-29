import { Effect2, Effect5 } from '.';
import HarmonyEffectData from './HarmonyEffectData';

const code = 'he002';
const name = '솟구치는 용암';
const effect2: Effect2 = { stat: 'fire', value: 0.1 };
const effect5: Effect5 = [
  {
    action: ['skill'],
    stat: 'fire',
    value: 0.3,
    buffType: 'self',
  },
];
const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
