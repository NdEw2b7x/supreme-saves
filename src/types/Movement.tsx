import { Forte } from '../lib/Resonators/ResonatorData';

export const everyMovement = ['basic', 'heavy', 'skill', 'liberation'] as const;
export type Movement = (typeof everyMovement)[number];

export type NormalAttack = keyof typeof nameNormalAttack;
export const nameNormalAttack = {
  basic: '일반 공격',
  heavy: '강공격',
  air: '공중 공격',
  airHeavy: '공중 강공격',
  counter: '회피 반격',
} as const;

export type ForteLine = keyof Forte;
export const mapForteLine: Record<ForteLine, string> = {
  normal: '일반 공격',
  skill: '공명 스킬',
  circuit: '공명 회로',
  liberation: '공명 해방',
  intro: '변주 스킬',
} as const;

export const everyForteLineName = [
  '일반 공격',
  '공명 스킬',
  '공명 회로',
  '공명 해방',
  '변주 스킬',
] as const;
export type ForteLineName = (typeof everyForteLineName)[number];
