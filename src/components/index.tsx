import Resonators from './Resonators/Resonators';
import Weapons from './Weapons/Weapons';
import Echoes from './Echoes/Echoes';
import System from './System/System';
import ResonatorDetail from './ResonatorDetail/ResonatorDetail';
import FlexBox from './FlexBox';
import ModalBox from './ModalBox';
import Thumbnail, { echoThumbnailControl, weaponThumbnailControl } from './Thumbnail';
import RadioBtn from './RadioBtn';
import SelectResonator from './SelectResonator';
import { EchoMainStats, EchoSubStats } from '../types';
import { MyEcho } from '../slice/echoesSlice';
import SelectNumber from './SelectNumber';
import { genByEcho } from './genByEcho';

export { Resonators, ResonatorDetail, Weapons, Echoes, System };
export { FlexBox, ModalBox, Thumbnail, RadioBtn, SelectNumber, SelectResonator };
export { weaponThumbnailControl, echoThumbnailControl };

export { genByEcho };

type EchoStatsValueSet = Record<EchoMainStats | EchoSubStats, number>;
export const genByEchoMerge = ([m, s]: ReturnType<typeof genByEcho>): EchoStatsValueSet => {
  const byEcho: EchoStatsValueSet = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    ice: 0,
    fire: 0,
    electro: 0,
    wind: 0,
    light: 0,
    dark: 0,
    heal: 0,
    cRate: 0,
    cDmg: 0,
    basic: 0,
    heavy: 0,
    skill: 0,
    liberation: 0,
    flatHp: 0,
    flatAtk: 0,
    flatDef: 0,
  };
  Object.entries(m).forEach(([stat, value]) => {
    byEcho[stat as EchoMainStats] += value;
  });
  Object.entries(s).forEach(([stat, value]) => {
    byEcho[stat as EchoSubStats] += value;
  });
  return byEcho;
};

export const getMyEchoValues = (x: (MyEcho | undefined)[]) => {
  return genByEcho5(
    x.map((i) => {
      return genByEchoMerge(genByEcho(i));
    })
  );
};

export const genByEcho5: (x: EchoStatsValueSet[]) => EchoStatsValueSet = (
  x: Array<ReturnType<typeof genByEchoMerge>>
) => {
  const byEchoes: EchoStatsValueSet = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    ice: 0,
    fire: 0,
    electro: 0,
    wind: 0,
    light: 0,
    dark: 0,
    heal: 0,
    cRate: 0,
    cDmg: 0,
    basic: 0,
    heavy: 0,
    skill: 0,
    liberation: 0,
    flatHp: 0,
    flatAtk: 0,
    flatDef: 0,
  };
  x.forEach((i) => {
    Object.entries(i).forEach(([stat, value]) => {
      byEchoes[stat as EchoMainStats | EchoSubStats] += value;
    });
  });
  return byEchoes;
};
