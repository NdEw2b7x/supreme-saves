import { EveryWeaponCode } from '../../types/everyWeaponCode';
import WeaponData, { Trigger, getWeaponSubOptionValue1 } from './WeaponData';
import w300100001 from './w300100001';
import w300200001 from './w300200001';
import w300200002 from './w300200002';
import w300200003 from './w300200003';
import w300300001 from './w300300001';
import w300400001 from './w300400001';
import w300500001 from './w300500001';
import w300500002 from './w300500002';
import w300500003 from './w300500003';
import w400100001 from './w400100001';
import w400100002 from './w400100002';
import w400100003 from './w400100003';
import w400100004 from './w400100004';
import w400100005 from './w400100005';
import w400200001 from './w400200001';
import w400200002 from './w400200002';
import w400200003 from './w400200003';
import w400200004 from './w400200004';
import w400200005 from './w400200005';
import w400300001 from './w400300001';
import w400300002 from './w400300002';
import w400300003 from './w400300003';
import w400300004 from './w400300004';
import w400300005 from './w400300005';
import w400400001 from './w400400001';
import w400400002 from './w400400002';
import w400400003 from './w400400003';
import w400400004 from './w400400004';
import w400400005 from './w400400005';
import w400500001 from './w400500001';
import w400500002 from './w400500002';
import w400500003 from './w400500003';
import w400500004 from './w400500004';
import w400500005 from './w400500005';
import w500100001 from './w500100001';
import w500100002 from './w500100002';
import w500200001 from './w500200001';
import w500300001 from './w500300001';
import w500400001 from './w500400001';
import w500500001 from './w500500001';
import w500500002 from './w500500002';

export { getWeaponSubOptionValue1 };
export { WeaponData };
export type { Trigger };

export const everyWeaponData: Partial<Record<EveryWeaponCode, WeaponData>> = {
  w500100001,
  w500100002,
  // w500100003,
  w500200001,
  // w500200002,
  w500300001,
  w500400001,
  w500500001,
  w500500002,

  w400100001,
  w400100002,
  w400100003,
  w400100004,
  w400100005,
  w400200001,
  w400200002,
  w400200003,
  w400200004,
  w400200005,
  w400300001,
  w400300002,
  w400300003,
  w400300004,
  w400300005,
  w400400001,
  w400400002,
  w400400003,
  w400400004,
  w400400005,
  w400500001,
  w400500002,
  w400500003,
  w400500004,
  w400500005,

  w300100001,
  w300200001,
  w300200002,
  w300200003,
  w300300001,
  w300400001,
  w300500001,
  w300500002,
  w300500003,
} as const;
