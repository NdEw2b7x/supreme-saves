import { EveryElement } from './everyElement';

export type Statistics = WeaponSubStats | EchoPrimaryMainStats | EchoSubStats;

export type WeaponSubStats =
  | 'HP%'
  | '공격력%'
  | '방어력%'
  | '공명 효율'
  | '크리티컬 확률'
  | '크리티컬 피해';

export type EchoPrimaryMainStats =
  | WeaponSubStats
  | `${EveryElement} 피해 보너스`
  | '치료 효과 보너스';
export type EchoSecondaryMainStats = 'HP' | '공격력';

export type EchoSubStats =
  | WeaponSubStats
  | 'HP'
  | '공격력'
  | '방어력'
  | '일반 공격 피해 보너스'
  | '강공격 피해 보너스'
  | '공명 스킬 피해 보너스'
  | '공명 해방 피해 보너스';
