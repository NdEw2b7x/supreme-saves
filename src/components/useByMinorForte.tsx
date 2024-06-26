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
      const trueCheck3 =
        i === 'hp' || i === 'atk' || i === 'def'
          ? [skill['공명 스킬'][1], skill['공명 해방'][1]].filter((i) => i).length
          : [skill['일반 공격'][1], skill['변주 스킬'][1]].filter((i) => i).length;
      const trueCheck7 =
        i === 'hp' || i === 'atk' || i === 'def'
          ? [skill['공명 스킬'][2], skill['공명 해방'][2]].filter((i) => i).length
          : [skill['일반 공격'][2], skill['변주 스킬'][2]].filter((i) => i).length;
      const max = i === 'def' ? 0.152 : i === 'cRate' ? 0.08 : i === 'cDmg' ? 0.16 : 0.12;
      byMinorFortes[i] = Math.round((1000 * ((trueCheck3 * 3 + trueCheck7 * 7) * max)) / 20) / 1000;
    });
  }
  return [minorFortes, byMinorFortes] as const;
};
