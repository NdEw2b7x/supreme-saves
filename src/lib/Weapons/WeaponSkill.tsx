export default interface WeaponSkill {
  name: string;
  default?: string;
  condition?: {
    when: ('일반 공격' | '강공격' | '공명 스킬' | '공명 해방' | '변주 스킬')[];
    stat: 'HP' | '공격력' | '치료 효과 보너스' | '협주 에너지';
    from: number;
    to: number;
  }[];
  stack?: string;
}
