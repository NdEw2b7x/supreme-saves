import { WeaponSubStats } from '../../types';
import { WeaponData } from '.';

const code = '400200003';
const atk1 = 33;
const subOption: WeaponSubStats = 'atk';

const result = new WeaponData({
  code,
  name: '상승의 서녘',
  atk1,
  subOption,
  skill: { passive: [], active: [] },
});
export default result;
