export const everyHarmony = [
  '야밤의 서리',
  '솟구치는 용암',
  '울려퍼지는 뇌음',
  '스쳐가는 바람',
  '빛나는 별',
  '빛을 삼키는 해',
  '찬란한 광휘',
  '떠오르는 구름',
  '끊임없는 잔향',
] as const
export type Harmony = (typeof everyHarmony)[number]

export const everyEchoToHarmony: Record<Harmony, readonly string[]> = {
  '야밤의 서리': [
    '반디의 군세',
    '경전차 로봇',
    '딩동동',
    '갈기늑대 · 눈꽃',
    '용비늘의 기축',
    '상강의 사냥꾼',
    '쇄아멧돼지',
    '꾹꾹복어',
    '두더지',
    '서릿땅거북',
    '용융 프리즘',
    '응결 프리즘',
    '초혼의 악사',
    '가시장미버섯(성체)',
  ],
  '솟구치는 용암': [
    '쇄아멧돼지',
    '꾹꾹복어',
    '두더지',
    '서릿땅거북',
    '용융 프리즘',
  ],
  '울려퍼지는 뇌음': [
    '쇄아멧돼지',
    '꾹꾹복어',
    '두더지',
    '서릿땅거북',
    '용융 프리즘',
  ],
  '스쳐가는 바람': [
    '쇄아멧돼지',
    '꾹꾹복어',
    '두더지',
    '서릿땅거북',
    '용융 프리즘',
  ],
  '빛나는 별': [
    '쇄아멧돼지',
    '꾹꾹복어',
    '두더지',
    '서릿땅거북',
    '용융 프리즘',
  ],
  '빛을 삼키는 해': [
    '쇄아멧돼지',
    '꾹꾹복어',
    '두더지',
    '서릿땅거북',
    '용융 프리즘',
  ],
  '찬란한 광휘': [
    '쇄아멧돼지',
    '꾹꾹복어',
    '두더지',
    '서릿땅거북',
    '용융 프리즘',
  ],
  '떠오르는 구름': [
    '쇄아멧돼지',
    '꾹꾹복어',
    '두더지',
    '서릿땅거북',
    '용융 프리즘',
  ],
  '끊임없는 잔향': [
    '쇄아멧돼지',
    '꾹꾹복어',
    '두더지',
    '서릿땅거북',
    '용융 프리즘',
  ],
} as const
