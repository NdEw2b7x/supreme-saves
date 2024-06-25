import { ResonatorName } from '../types';
import { MinorForte } from '../lib/Resonators/ResonatorData';
import { everyResonatorData } from '../lib/Resonators';
import { useSelector } from 'react-redux';
import { State } from '../store';

export const useByMinorForte = (name: ResonatorName) => {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
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
