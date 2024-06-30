import { EchoPrimaryMainStats, Element, WeaponCategory, Movement, Name } from '../../types';

type Scale = 'HP' | 'ATK' | 'DEF';
export const genSkill =
  (x: Scale) =>
  (skillType: SkillType) =>
  (values: [x: number, y?: number][], name?: Name, dmgType?: Movement) => ({
    name,
    scale: x,
    value: values.map(([multiply, times]) => ({ multiply, times })),
    dmgType,
    skillType,
  });
export const genHPSkillNode = genSkill('HP');
export const genATKSkillNode = genSkill('ATK');
export const genDEFSkillNode = genSkill('DEF');

export type SkillType = 'atack' | 'heal' | 'replace' | 'buffSelf' | 'buffAll' | 'buffTeam';
export type SkillNode = {
  name?: Name;
  skillType: SkillType;
  scale: Scale;
  value: { flat?: number; multiply?: number; times?: number }[];
  dmgType?: Movement;
};
export type BuffNode = {
  name?: Name;
  value: { flat?: number; multiply?: number; times?: number }[];
};
export type HealNode = {};
export type SkillCategory = keyof ResonatorSkill;
export type SkillLine = keyof ResonatorSkill;
export type ResonatorSkill = {
  basic: {
    name: Name;
    basic: SkillNode[];
    heavy: SkillNode[];
    air: SkillNode[];
    airHeavy: SkillNode[];
    counter: SkillNode[];
  };
  skill: { name: Name; skill: SkillNode[] };
  circuit: {
    name: Name;
    gaugeName: Name;
    skill: SkillNode[];
    buff?: BuffNode[];
    coAtack?: {};
    enhanced?: {
      name?: Name;
      basic?: {
        basic?: ResonatorSkill['basic']['basic'];
        heavy?: ResonatorSkill['basic']['heavy'];
        air?: ResonatorSkill['basic']['air'];
        counter?: ResonatorSkill['basic']['counter'];
      };
      skill?: Omit<ResonatorSkill['skill'], 'name'>;
    };
  };
  burst: { name: Name; skill: SkillNode[] };
  intro: { name: Name; skill: SkillNode[] };
  outro: { name: Name; skill: SkillNode[] };
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
    element: Element;
    weaponCategory: WeaponCategory;
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
  element;
  weaponCatergory: WeaponCategory;
  hp1: number;
  atk1: number;
  def1: number;
  skill: ResonatorSkill;
  minorFortes: [MinorForte, MinorForte];
}

export type MinorForte = Exclude<EchoPrimaryMainStats, 'energy'>;
