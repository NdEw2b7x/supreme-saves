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
import { everyEchoData, getEchoMainValue0 } from '../lib/Echoes';
import { getSecondaryMainStats } from './Echoes/EchoesList';

export { Resonators, ResonatorDetail, Weapons, Echoes, System };
export { FlexBox, ModalBox, Thumbnail, RadioBtn, SelectResonator };
export { weaponThumbnailControl, echoThumbnailControl };

export const genByEcho = (info?: MyEcho) => {
  const byEchoMain: Record<EchoMainStats, number> = {
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
    flatHp: 0,
    flatAtk: 0,
  };
  const byEchoSub: Record<EchoSubStats, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    cRate: 0,
    cDmg: 0,
    basic: 0,
    heavy: 0,
    skill: 0,
    burst: 0,
    flatHp: 0,
    flatAtk: 0,
    flatDef: 0,
  };
  if (info) {
    const lv = info['레벨'];
    const p = info['메인 스텟'];
    const r = info['희귀'];
    const data = everyEchoData[info['코드']];
    Object.values(info['서브 스텟']).forEach(({ stat, value }) => {
      if (stat) {
        byEchoSub[stat] = (byEchoSub[stat] * 1000 + value * 1000) / 1000;
      }
    });
    if (data) {
      const c = data.cost;
      const [p0, s0] = getEchoMainValue0(r)(c)(p);
      byEchoMain[p] = p0 * (1 + 0.16 * lv);
      byEchoMain[getSecondaryMainStats(c)] = Math.floor(s0 * (1 + 0.16 * lv));
    }
  }
  return [byEchoMain, byEchoSub] as const;
};

type EchoStatsValueSet = Record<EchoMainStats | EchoSubStats, number>;
export const genByEchoMerge: (x: ReturnType<typeof genByEcho>) => EchoStatsValueSet = ([
  main,
  sub,
]: ReturnType<typeof genByEcho>) => {
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
    burst: 0,
    flatHp: 0,
    flatAtk: 0,
    flatDef: 0,
  };
  Object.entries(main).forEach(([stat, value]) => {
    byEcho[stat as EchoMainStats] += value;
  });
  Object.entries(sub).forEach(([stat, value]) => {
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
    burst: 0,
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
