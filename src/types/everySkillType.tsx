export const everySkillType = [
  '일반 공격',
  '공명 스킬',
  '공명 회로',
  '공명 해방',
  '변주 스킬',
] as const;
export type EverySkillType = (typeof everySkillType)[number];

export const everySkillLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type EverySkillLevel = (typeof everySkillLevel)[number];
type MinorForte = true | false;
export type SkillSet = [EverySkillLevel, MinorForte, MinorForte];
