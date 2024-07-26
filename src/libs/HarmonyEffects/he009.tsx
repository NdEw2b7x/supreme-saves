import { Effect2, Effect5 } from '.';
import HarmonyEffectData from './HarmonyEffectData';

const code = 'he009';
const name = '끊임없는 잔향';
const effect2: Effect2 = { stat: 'atk', value: 0.1 };
const effect5: Effect5 = [
  { buffType: 'self', action: [], onField: true, stat: 'atk', value: 0.05, stack: 4 },
];

const result = new HarmonyEffectData({ code, name, effect2, effect5 });

export default result;
