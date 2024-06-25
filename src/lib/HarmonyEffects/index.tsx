import { Name, Stats } from '../../types';
import { he001 } from './he001';
import { he002 } from './he002';
import { he003 } from './he003';
import { he004 } from './he004';
import { he005 } from './he005';
import { he006 } from './he006';
import { he007 } from './he007';

export type Effect2 = Partial<Record<Stats, number>>;
export type Effect5 = Partial<Record<Stats, number>>;
export class HarmonyEffect {
  constructor({
    code,
    name,
    effect2,
    effect5,
  }: {
    code: string;
    name: Name;
    effect2: Effect2;
    effect5: Effect5;
  }) {
    this.code = code;
    this.name = name;
    this.effect2 = effect2;
    this.effect5 = effect5;
  }
  code;
  name;
  effect2;
  effect5;
}

export const everyHarmony = {
  he001,
  he002,
  he003,
  he004,
  he005,
  he006,
  he007,
} as const;
export type HarmonyCode = keyof typeof everyHarmony;
export const harmonyNameMapping = Object.fromEntries(
  Object.entries(everyHarmony).map(([code, { name }]) => {
    return [code, name] as const;
  })
);
