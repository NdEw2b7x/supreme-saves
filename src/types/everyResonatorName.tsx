export const everyResonatorNameWithoutRover = [
  '능양', // 응결
  '앙코', // 용융
  '카카루', // 전도
  '감심', // 기류
  '벨리나', // 회절
  '산화', // 응결
  '설지', // 응결
  '모르테피', // 용융
  '치샤', // 용융
  '연무', // 전도
  '알토', // 기류
  '양양', // 기류
  '단근', // 인멸
  '도기', // 인멸
  '기염', // 1.0.1
  '음림', // 1.0.2
  // '금희', // 1.1.1
  // '장리', // 1.1.2
] as const;
export type EveryResonatorNameWithoutRover = (typeof everyResonatorNameWithoutRover)[number];

export const everyResonatorName = ['방랑자', ...everyResonatorNameWithoutRover] as const;
export type EveryResonatorName = (typeof everyResonatorName)[number];
