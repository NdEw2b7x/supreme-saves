export const everyEchoCost = [4, 3, 1] as const;
export type EchoCost = (typeof everyEchoCost)[number];

export const everyEchoDangerous = ['해일', '노도', '거랑', '경파'] as const;
export type EchoDangerous = (typeof everyEchoDangerous)[number];

export const getCost: (x: EchoDangerous) => EchoCost = (x: EchoDangerous) => {
  switch (x) {
    case '경파':
      return 1;
    case '거랑':
      return 3;
    default:
      return 4;
  }
};
