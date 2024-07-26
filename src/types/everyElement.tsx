export const everyElement = [
  '응결',
  '용융',
  '전도',
  '기류',
  '회절',
  '인멸',
] as const
export type EveryElement = (typeof everyElement)[number]

export const elementStat = [
  'ice',
  'fire',
  'electro',
  'wind',
  'light',
  'dark',
] as const
export type Element = (typeof elementStat)[number]

export const mapElement: Record<Element, string> = {
  ice: '응결',
  fire: '용융',
  electro: '전도',
  wind: '기류',
  light: '회절',
  dark: '인멸',
}
