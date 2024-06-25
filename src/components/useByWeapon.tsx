import { ResonatorName, EveryWeaponAtk1, WeaponSubStats } from '../types';
import { WeaponData, everyWeaponData } from '../lib/Weapons';
import { getWeaponAtk, getWeaponSubOptionValue } from '../lib/formula';
import { useSelector } from 'react-redux';
import { State } from '../store';

export const useByWeapon = (name: ResonatorName) => {
  const equipWeapons = useSelector((state: State) => state.weaponsSlice['장착']);
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  let weaponAtk = 0;
  const byWeapon: Record<WeaponSubStats, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    cRate: 0,
    cDmg: 0,
  };
  const id = equipWeapons[name];
  if (id) {
    const myWeapon = myWeapons[id];
    if (myWeapon) {
      const data = everyWeaponData[myWeapon['코드']] as WeaponData;
      const level = myWeapon['레벨'];
      const atk1: EveryWeaponAtk1 = data.atk1;
      const sub = data.subOption;
      weaponAtk = getWeaponAtk(atk1)(level);
      byWeapon[sub] = getWeaponSubOptionValue(atk1, sub)(level);
    }
  }
  return [weaponAtk, byWeapon] as const;
};
