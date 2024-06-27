import { EchoPrimaryMainStats, EveryElement, EveryWeaponCategory, Name, Stats } from '../../types';
import { Trigger } from '../Weapons';

type Scale = 'HP' | 'ATK' | 'DEF';
export const genSkill = (x: Scale) => (values: [x: number, y?: number][]) => ({
  scale: x,
  value: values.map(([multiply, times]) => ({ multiply, times })),
});
export const genNamedSkill = (x: Scale) => (values: [x: number, y?: number][], name: Name) => ({
  scale: x,
  value: values.map(([multiply, times]) => ({ multiply, times })),
  name,
});

export type ResonatorSkill = {
  basic: {
    name: Name;
    basic: { scale: Scale; value: { multiply: number; times?: number }[] }[];
    heavy: { scale: Scale; value: { multiply: number; times?: number }[]; name?: Name }[];
    air: { scale: Scale; multiply: number; times?: number };
    counter: { scale: Scale; multiply: number; times?: number };
  };
  skill: { name: Name; value: { multiply: number; times?: number }[]; enhanced?: boolean }[];
  circuit: {
    name: Name;
    replace?: 'basic' | 'heavy' | 'skill' | 'burst';
    scale: Scale;
    multiply: number;
    times?: number;
    enhanced?: {
      name?: Name;
      basic?: {
        basic?: ResonatorSkill['basic']['basic'];
        heavy?: ResonatorSkill['basic']['heavy'];
        air?: ResonatorSkill['basic']['air'];
        counter?: ResonatorSkill['basic']['counter'];
      };
      skill?: ResonatorSkill['skill'];
    };
  };
  burst: { name: Name; multiply: number; times?: number }[];
  intro: { name: Name; multiply: number; times?: number }[];
  outro: ({ name: Name } & (
    | { deepen: 'ice' | 'electro' | 'burst'; multiply: number }
    | { scale: Scale; multiply: number }
  ))[];
  inherent: { trigger: Trigger; stat: Stats; value: number }[];
};

export default class ResonatorData {
  constructor({
    name,
    element,
    weaponCategory,
    base: [hp1, atk1, def1],
    skill,
    minorFortes,
  }: {
    name: Name;
    element: EveryElement;
    weaponCategory: EveryWeaponCategory;
    base: [number, number, number];
    skill: ResonatorSkill;
    minorFortes: [MinorForte, MinorForte];
  }) {
    this.name = name;
    this.element = element;
    this.weaponCatergory = weaponCategory;
    this.hp1 = hp1;
    this.atk1 = atk1;
    this.def1 = def1;
    this.skill = skill;
    this.minorFortes = minorFortes;
  }
  name: Name;
  element: EveryElement;
  weaponCatergory: EveryWeaponCategory;
  hp1: number;
  atk1: number;
  def1: number;
  skill: ResonatorSkill;
  minorFortes: [MinorForte, MinorForte];
}

export type MinorForte = Exclude<EchoPrimaryMainStats, 'energy'>;
