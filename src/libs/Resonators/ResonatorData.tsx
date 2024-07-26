import { Plant } from '../../slice/backpackSlice'
import {
  EchoPrimaryMainStats,
  ResonatorElement,
  Movement,
  Name,
  WeaponCategory,
} from '../../types'
import { EchoCode } from '../Echoes'

export type Scale = 'HP' | 'ATK' | 'DEF'
// export const genSkill =
//   (x: Scale) =>
//   (skillType: SkillType) =>
//   (values: [x: number, y?: number][], name?: Name, dmgType?: Movement): SkillNode => ({
//     name: '',
//     scale: x,
//     value: values.map(([multiply, times]) => ({ multiply, times })),
//     dmgType,
//   });
export const genDamageNode =
  (scale: Scale) =>
  (
    values: [x: number, y?: number][],
    name?: Name,
    dmgType?: Movement,
    extra?: number
  ): SkillNode => ({
    skillType: 'damage',
    value: values.map(([multiply, times]) => ({
      scale,
      multiply,
      times: times ?? 1,
      extra: extra ?? 0,
    })),
    name: name ?? '',
    dmgType,
  })
export const genHPDamageNode = genDamageNode('HP')
export const genATKDamageNode = genDamageNode('ATK')
export const genDEFDamageNode = genDamageNode('DEF')

export type SkillType =
  | 'damage'
  | 'heal'
  | 'replace'
  | 'boost'
  | 'multiflier'
  | 'buffSelf'
  | 'buffAll'
  | 'buffTeam'

export interface SkillValues {
  damage: { scale: Scale; multiply: number; times: number; extra: number }
  heal: { scale: Scale; multiply: number; times: number; extra: number }
  extraMultiflier: {
    scale: string
    multiply: number
    times: number
    extra: number
  }
}
export type SkillNode = (
  | {
      skillType: 'damage'
      value: SkillValues['damage'][]
    }
  | {
      skillType: 'heal'
      value: SkillValues['heal'][]
    }
  | {
      skillType: 'extraMultiflier'
      value: SkillValues['extraMultiflier'][]
    }
) & {
  name: Name
  dmgType?: Movement
}

export type ResonatorSkill = {
  normal: {
    name: Name
    basic: SkillNode[]
    heavy: SkillNode[]
    air: SkillNode[]
    airHeavy: SkillNode[]
    counter: SkillNode[]
  }
  skill: { name: Name; skill: SkillNode[] }
  circuit: {
    name: Name
    circuit: { name: Name; circuitType: 'stack' | 'mode'; max: number }
    skill: SkillNode[]
    enhanced?: {
      name?: Name
      basic?: {
        basic?: ResonatorSkill['normal']['basic']
        heavy?: ResonatorSkill['normal']['heavy']
        air?: ResonatorSkill['normal']['air']
        counter?: ResonatorSkill['normal']['counter']
      }
      skill?: Omit<ResonatorSkill['skill'], 'name'>
    }
  }
  liberation: { name: Name; skill: SkillNode[] }
  intro: { name: Name; skill: SkillNode[] }
  outro: { name: Name; skill: SkillNode[] }
}

export interface Forte {
  normal: { name: Name }
  skill: { name: Name }
  circuit: { name: Name }
  liberation: { name: Name }
  intro: { name: Name }
}

export default class ResonatorData {
  constructor({
    name,
    element,
    weaponCategory,
    base: [hp1, atk1, def1],
    forte = {
      normal: {
        name: '',
        basic: [],
        heavy: [],
        air: [],
        airHeavy: [],
        counter: [],
      },
      skill: { name: '', skill: [] },
      circuit: {
        name: '',
        circuit: { name: '', circuitType: 'stack', max: 0 },
        skill: [],
      },
      liberation: { name: '', skill: [] },
      intro: { name: '', skill: [] },
      outro: { name: '', skill: [] },
    },
    statBonus,
    chain = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
    bossMeterial = 'G01',
    normalMaterial = 'Whisperin',
    plant = 'Coral',
    upgrade = 'Bell',
  }: {
    name: Name
    element: ResonatorElement
    weaponCategory: WeaponCategory
    base: [number, number, number]
    forte?: ResonatorSkill
    statBonus: [MinorForte, MinorForte]
    chain?: { 1: {}; 2: {}; 3: {}; 4: {}; 5: {}; 6: {} }
    bossMeterial?: EchoCode
    normalMaterial?: 'Whisperin' | 'Howler' | 'Ring' | 'Mask'
    plant?: Plant
    upgrade?: 'Bell' | 'Feather'
  }) {
    this.name = name
    this.element = element
    this.weaponCatergory = weaponCategory
    this.hp1 = hp1
    this.atk1 = atk1
    this.def1 = def1
    this.forte = forte
    this.statBonus = statBonus
    if (chain) {
      this.chain = chain
    }
    this.ascPlant = plant
    this.normalMaterial = normalMaterial
    this.bossMeterial = bossMeterial
    this.upgrade = upgrade
  }
  name
  element
  weaponCatergory: WeaponCategory
  hp1: number
  atk1: number
  def1: number
  forte
  statBonus
  chain
  ascPlant
  normalMaterial
  bossMeterial
  upgrade
}

export type MinorForte = Exclude<EchoPrimaryMainStats, 'energy'>
