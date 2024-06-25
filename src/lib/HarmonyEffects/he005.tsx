import { Effect2, HarmonyEffect } from '.';
import { Stats } from '../../types';

const code = 'he005';
const name = '야밤의 서리';
const effect2: Effect2 = { light: 0.1 };
const effect5: Partial<Record<Stats, number>> = { ice: 0.1 };

export const he005 = new HarmonyEffect({ code, name, effect2, effect5 });
