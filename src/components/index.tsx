import Resonators from './Resonators/Resonators';
import Weapons from './Weapons/Weapons';
import Echoes from './Echoes/Echoes';
import System from './System/System';
import ResonatorDetail from './ResonatorDetail/ResonatorDetail';
import FlexBox from './FlexBox';
import ModalBox from './ModalBox';
import Thumbnail, { weaponThumbnailControl } from './Thumbnail';
import RadioBtn from './RadioBtn';
import SelectResonator from './SelectResonator';
import { MyWeapons, WeaponId } from '../slice/weaponsSlice';
import { EveryResonatorName, EveryWeaponAtk1, WeaponSubStats } from '../types';
import { WeaponData, everyWeaponData } from '../lib/Weapons';
import { getWeaponAtk, getWeaponSubOptionValue } from '../lib/formula';
import { MyResonators } from '../slice/resonatorsSlice';
import { MinorForte } from '../lib/Resonators/ResonatorData';
import { everyResonatorData } from '../lib/Resonators';

export { Resonators, ResonatorDetail, Weapons, Echoes, System };
export { FlexBox, ModalBox, Thumbnail, RadioBtn, SelectResonator };
export { weaponThumbnailControl };

export const genByMinorForte = (myResonators: MyResonators) => {
  const byMinorFortes: Record<MinorForte, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    ice: 0,
    fire: 0,
    electro: 0,
    wind: 0,
    light: 0,
    dark: 0,
    cRate: 0,
    cDmg: 0,
    heal: 0,
  };
  return (name: EveryResonatorName) => {
    const info = myResonators[name];
    const minorFortes = everyResonatorData[name].minorFortes;
    if (info) {
      const skill = info.스킬;
      minorFortes.forEach((i) => {
        let trueCheck3 = [skill['일반 공격'][1], skill['변주 스킬'][1]].filter((i) => i).length;
        let trueCheck7 = [skill['일반 공격'][2], skill['변주 스킬'][2]].filter((i) => i).length;
        let max = 0.12;
        switch (i) {
          case 'hp':
          case 'atk':
          case 'def':
            trueCheck3 = [skill['공명 스킬'][1], skill['공명 해방'][1]].filter((i) => i).length;
            trueCheck7 = [skill['공명 스킬'][2], skill['공명 해방'][2]].filter((i) => i).length;
            break;
        }
        switch (i) {
          case 'def':
            max = 0.152;
            break;
          case 'cRate':
            max = 0.08;
            break;
          case 'cDmg':
            max = 0.16;
            break;
        }
        byMinorFortes[i] = (max * (trueCheck3 * 3 + trueCheck7 * 7)) / 20;
      });
    }
    return [minorFortes, byMinorFortes] as const;
  };
};

export const genByWeapon = (myWeapons: MyWeapons) => {
  const byWeapon: Record<WeaponSubStats, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    cRate: 0,
    cDmg: 0,
  };
  return (id?: WeaponId) => {
    let weaponAtk = 0;
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
};
