import { Effect2, HarmonyEffect } from '.';
import { Stats } from '../../types';

const code = 'he002';
const name = '솟구치는 용암';
const effect2: Effect2 = { fire: 0.1 };
const effect5: Partial<Record<Stats, number>> = { ice: 0.1 };

export const he002 = new HarmonyEffect({ code, name, effect2, effect5 });
