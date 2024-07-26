import { Harmony, Stats } from '../../types';
import HarmonyEffectData from './HarmonyEffectData';
import he001 from './he001';
import he002 from './he002';
import he003 from './he003';
import he004 from './he004';
import he005 from './he005';
import he006 from './he006';
import he007 from './he007';
import he008 from './he008';
import he009 from './he009';

export type Effect2 = { stat: Stats; value: number };
export type Effect5 = {
  buffType: 'self' | 'team' | 'next';
  action: ('basic' | 'heavy' | 'skill' | 'burst' | 'intro' | 'outro' | 'heal')[];
  onField?: boolean;
  stat: Stats;
  value: number;
  stack?: number;
}[];

export const everyHarmonyEffectData: Record<Harmony, HarmonyEffectData> = {
  '야밤의 서리': he001,
  '솟구치는 용암': he002,
  '울려퍼지는 뇌음': he003,
  '스쳐가는 바람': he004,
  '빛나는 별': he005,
  '빛을 삼키는 해': he006,
  '찬란한 광휘': he007,
  '떠오르는 구름': he008,
  '끊임없는 잔향': he009,
} as const;
