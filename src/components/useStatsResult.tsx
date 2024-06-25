import { getMyEchoValues } from '.';
import { useByMinorForte } from './useByMinorForte';
import { useByWeapon } from './useByWeapon';
import { useSelector } from 'react-redux';
import { State } from '../store';
import { MyResonator } from '../slice/resonatorsSlice';
import { ResonatorName, Stats } from '../types';
import { getATK, getDEF, getHP } from '../lib/formula';
import { everyResonatorData } from '../lib/Resonators';
import { useMyEchoInfoSet } from './useMyEchoInfoSet';

export const useStatsResult: (resonatorName: ResonatorName) => Record<Stats, number> = (
  resonatorName: ResonatorName
) => {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const info = myResonators[resonatorName] as MyResonator;
  const values: Record<Stats, number> = {
    baseHp: 0,
    resonatorAtk: 0,
    weaponAtk: 0,
    baseAtk: 0,
    baseDef: 0,
    hp: 0,
    atk: 0,
    def: 0,
    energy: 1,
    ice: 0,
    fire: 0,
    electro: 0,
    wind: 0,
    light: 0,
    dark: 0,
    cRate: 0.05,
    cDmg: 1.5,
    heal: 0,
    basic: 0,
    heavy: 0,
    skill: 0,
    burst: 0,
    flatHp: 0,
    flatAtk: 0,
    flatDef: 0,
  };
  const resonatorLevel = info['레벨'];
  const resonatorData = everyResonatorData[resonatorName];
  const [, byMinorFortes] = useByMinorForte(resonatorName);
  Object.entries(byMinorFortes).forEach(([stat, value]) => {
    values[stat as Stats] += value;
  });
  const [weaponAtk, byWeapon] = useByWeapon(resonatorName);
  Object.entries(byWeapon).forEach(([stat, value]) => {
    values[stat as Stats] += value;
  });
  const myEchoInfoes = useMyEchoInfoSet(resonatorName);
  Object.entries(getMyEchoValues(myEchoInfoes)).forEach(([stat, value]) => {
    values[stat as Stats] = Math.round((values[stat as Stats] + value) * 100000) / 100000;
  });

  values['baseHp'] = getHP(resonatorData.hp1)(resonatorLevel);
  values['resonatorAtk'] = getATK(resonatorData.atk1)(resonatorLevel);
  values['weaponAtk'] = weaponAtk;
  values['baseAtk'] = values['resonatorAtk'] + values['weaponAtk'];
  values['baseDef'] = getDEF(resonatorData.def1)(resonatorLevel);

  return values;
};
