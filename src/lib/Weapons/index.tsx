import { EveryWeaponCode } from '../../types/everyWeaponCode';
import WeaponData, { getWeaponSubOptionValue1 } from './WeaponData';
import w400100003 from './w400100003';
import w400200001 from './w400200001';
import w400200002 from './w400200002';
import w400200003 from './w400200003';
import w400300002 from './w400300002';
import w400500001 from './w400500001';
import w400500002 from './w400500002';
import w400500003 from './w400500003';
import w500100001 from './w500100001';
import w500100002 from './w500100002';
import w500100003 from './w500100003';
import w500200001 from './w500200001';
import w500200002 from './w500200002';
import w500300001 from './w500300001';
import w500400001 from './w500400001';
import w500500001 from './w500500001';
import w500500002 from './w500500002';

export { getWeaponSubOptionValue1 };
export { WeaponData };

export type EveryWeaponSubOption =
  | 'HP'
  | '공격력'
  | '방어력'
  | '공명 효율'
  | '크리티컬 확률'
  | '크리티컬 피해';

export const everyWeaponData: Partial<Record<EveryWeaponCode, WeaponData>> = {
  w500100001,
  w500100002,
  w500100003,
  w500200001,
  w500200002,
  w500300001,
  w500400001,
  w500500001,
  w500500002,

  // w400100001,
  // w400100002,
  w400100003,
  w400200001,
  w400200002,
  w400200003,
  w400300002,
  w400500001,
  w400500002,
  w400500003,
} as const;
