export const everyRarity = [5, 4, 3] as const;
export type EveryRarity = (typeof everyRarity)[number];

export const everyChain = [0, 1, 2, 3, 4, 5, 6] as const;
export type EveryChain = (typeof everyRarity)[number];
