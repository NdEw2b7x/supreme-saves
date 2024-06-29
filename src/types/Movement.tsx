export const everyMovement = ['basic', 'heavy', 'skill', 'liberation'] as const;
export type Movement = (typeof everyMovement)[number];
