import { ResonatorElement, WeaponCategory, Name } from '../../types'
import ResonatorData, { genATKDamageNode } from './ResonatorData'

const name: Name = '금희'
const element: ResonatorElement = 'light'
const weaponCategory: WeaponCategory = '대검'
const [hp1, atk1, def1] = [866, 33, 103]

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  forte: {
    normal: {
      name: '달빛의 서리',
      basic: [
        genATKDamageNode([[0.3343]]),
        genATKDamageNode([[0.1961], [0.0981, 3]]),
        genATKDamageNode([[0.0536, 7], [0.1607]]),
        genATKDamageNode([[0.3174], [0.476]]),
      ],
      heavy: [genATKDamageNode([[0.12, 5], [0.18], [0.42]])],
      air: [genATKDamageNode([[0.062], [0.124], [0.434]])],
      airHeavy: [],
      counter: [genATKDamageNode([[0.0738, 7], [0.2214]])],
    },
    skill: {
      name: '달빛의 석양',
      skill: [
        genATKDamageNode([[0.0979, 4], [0.3915]]),
        {
          skillType: 'damage',
          value: [
            { scale: 'ATK', multiply: 0.0496, times: 4, extra: 0 },
            { scale: 'ATK', multiply: 0.1488, times: 4, extra: 0 },
            { scale: 'ATK', multiply: 0.1984, times: 1, extra: 0 },
          ],
          name: '창공의 무지개',
        },
      ],
    },
    circuit: {
      name: '만물합일',
      skill: [
        genATKDamageNode([[0.4458]], '하늘로 향해 · 일반 공격 1단', 'basic'),
        genATKDamageNode(
          [[0.3922], [0.1308], [0.1308]],
          '하늘로 향해 · 일반 공격 2단',
          'basic'
        ),
        genATKDamageNode(
          [[0.5002], [0.3335]],
          '하늘로 향해 · 일반 공격 3단',
          'basic'
        ),
        genATKDamageNode(
          [[0.0939, 6], [0.3756]],
          '하늘로 향해 · 일반 공격 4단',
          'basic'
        ),
        genATKDamageNode([[0.24], [0.56]], '하늘로 향해 · 강공격', 'heavy'),
        genATKDamageNode(
          [[0.2208], [0.1656, 2], [0.5519]],
          '하늘로 향해 · 회피 반격'
        ),
        genATKDamageNode(
          [[0.5068], [0.3801, 2], [1.267]],
          '달을 품은 용녀',
          'skill'
        ),
        genATKDamageNode([[0.1, 6]], '승천하는 용 · 햇살'),
        {
          skillType: 'damage',
          value: [{ scale: 'ATK', multiply: 1.75, times: 1, extra: 0 }],
          name: '승천하는 용 · 별빛',
        },
        {
          skillType: 'extraMultiflier',
          value: [{ multiply: 0.224, times: 1, scale: '봄의 빛', extra: 0 }],
          name: '배율 증가량',
        },
        genATKDamageNode([[0.224]], '「봄의 빛」 1pt 당 배율 증가량'),
      ],
      circuit: { name: '봄의 빛', circuitType: 'stack', max: 50 },
    },
    liberation: {
      name: '만물의 정화',
      skill: [genATKDamageNode([[2.514], [5.866]])],
    },
    intro: {
      name: '반룡의 빛',
      skill: [genATKDamageNode([[0.8]])],
    },
    outro: {
      name: '',
      skill: [],
    },
  },

  statBonus: ['atk', 'cRate'],
})

export default result
