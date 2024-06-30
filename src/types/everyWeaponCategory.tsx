export const everyWeaponCategory = ['대검', '직검', '권총', '권갑', '증폭기'] as const;
export type WeaponCategory = (typeof everyWeaponCategory)[number];
