import { ResonatorElement, WeaponCategory } from '../../types'
import ResonatorData, {
  ResonatorSkill,
  genATKDamageNode,
} from './ResonatorData'

const name = '벨리나'
const element: ResonatorElement = 'light'
const weaponCategory: WeaponCategory = '증폭기'
const [hp1, atk1, def1] = [1139, 27, 90]
const forte: ResonatorSkill = {
  normal: {
    name: '육모',
    basic: [
      genATKDamageNode([[0.1904]]),
      genATKDamageNode([[0.2573]]),
      genATKDamageNode([[0.1287, 2]]),
      genATKDamageNode([[0.3386]]),
      genATKDamageNode([[0.3603]]),
    ],
    heavy: [genATKDamageNode([[0.5]])],
    air: [
      genATKDamageNode([[0.2835]]),
      genATKDamageNode([[0.27]]),
      genATKDamageNode([[0.1279, 3]]),
    ],
    airHeavy: [genATKDamageNode([[0.31]])],
    counter: [genATKDamageNode([[0.65]])],
  },
  skill: {
    name: '식물 실험',
    skill: [genATKDamageNode([[0.18, 3], [0.36]])],
  },
  circuit: {
    name: '별꽃의 개화',
    circuit: { name: '광합성 에너지', circuitType: 'stack', max: 4 },
    skill: [
      genATKDamageNode([[0.3267], [0.49]], '강공격·별꽃의 개화', 'heavy'),

      genATKDamageNode([[0.3402]], '공중 공격·별꽃의 개화 1단', 'basic'),
      genATKDamageNode([[0.321]], '공중 공격·별꽃의 개화 2단', 'basic'),
      genATKDamageNode([[0.1534, 3]], '공중 공격·별꽃의 개화 3단', 'basic'),

      {
        skillType: 'heal',
        value: [{ extra: 625, scale: 'ATK', multiply: 0.1417, times: 1 }],
        name: '별꽃의 개화',
      },
    ],
  },
  liberation: {
    name: '자라난 초목',
    skill: [
      genATKDamageNode([[1]]),
      {
        skillType: 'heal',
        value: [{ extra: 500, multiply: 0.1133, scale: 'ATK', times: 1 }],
        name: '자라난 초목',
      },
      genATKDamageNode([[0.05]], '협동 공격'),
      {
        skillType: 'heal',
        value: [{ extra: 225, multiply: 0.051, scale: 'ATK', times: 1 }],
        name: '협동 공격',
      },
    ],
  },
  intro: { name: '확산', skill: [genATKDamageNode([[0.5]])] },
  outro: {
    name: '꽃의 만발',
    skill: [
      {
        skillType: 'heal',
        value: [{ extra: 0, scale: 'ATK', multiply: 0.19, times: 6 }],
        name: '',
      },
    ],
  },
}

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  forte,
  statBonus: ['atk', 'heal'],
})

export default result
