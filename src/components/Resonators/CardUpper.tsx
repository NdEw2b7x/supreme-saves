import {
  Thumbnail,
  genByEcho,
  genByEchoTotal,
  genByEchoes,
  genByMinorForte,
  genByWeapon,
  weaponThumbnailControl,
} from '..';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { MyResonator } from '../../slice/resonatorsSlice';
import { MyWeapon } from '../../slice/weaponsSlice';
import { ResonatorName, Harmony, Stats, getStatsName } from '../../types';
import { getATK, getDEF, getHP, getPercent } from '../../lib/formula';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './CardUpper.module.css';
import { EchoEquipSlot, EchoId, MyEcho } from '../../slice/echoesSlice';
import Chain from '../icons/Chain';

export const getMyEchoInfoes = (myEchoes: Partial<Record<EchoId, MyEcho>>) => {
  return (equipEchoes: Partial<Record<ResonatorName, Partial<Record<EchoEquipSlot, EchoId>>>>) => {
    return (name: ResonatorName) => {
      return ([1, 2, 3, 4, 5] as const).map((i) => {
        const myEcho = equipEchoes[name]?.[i];
        if (myEcho) {
          return myEchoes[myEcho];
        }
        return undefined;
      });
    };
  };
};
export const getMyEchoValues = (x: (MyEcho | undefined)[]) => {
  return genByEchoes(
    x.map((i) => {
      return genByEchoTotal(genByEcho(i));
    })
  );
};
export const getMyHarmony: (x: (MyEcho | undefined)[]) => Partial<Record<Harmony, number>> = (
  x: (MyEcho | undefined)[]
) => {
  const countHarmony: Record<Harmony, 0 | 1 | 2 | 3 | 4 | 5> = {
    '야밤의 서리': 0,
    '솟구치는 용암': 0,
    '울려퍼지는 뇌음': 0,
    '스쳐가는 바람': 0,
    '빛나는 별': 0,
    '빛을 삼키는 해': 0,
    '찬란한 광휘': 0,
    '떠오르는 구름': 0,
    '끊임없는 잔향': 0,
  };
  x.forEach((i) => {
    if (i) {
      countHarmony[i['화음']] += 1;
    }
  });
  return Object.fromEntries(
    Object.entries(countHarmony).filter(([h, c]) => {
      if (c >= 2) {
        return true;
      }
      return false;
    })
  );
};

export default function ResonatorCardUpper({
  resonatorName,
  info,
}: {
  resonatorName: ResonatorName;
  info: MyResonator;
}) {
  const values: Record<Stats, number> = {
    baseHp: 0,
    resonatorAtk: 0,
    weaponAtk: 0,
    baseAtk: 0,
    baseDef: 0,
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
    cRate: 0,
    cDmg: 0,
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
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const resonatorData = everyResonatorData[resonatorName];
  const element = resonatorData.element;
  const byMinorFortes = genByMinorForte(myResonators)(resonatorName);
  Object.entries(byMinorFortes[1]).forEach(([stat, value]) => {
    values[stat as Stats] += value;
  });

  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  const equipWeapons = useSelector((state: State) => state.weaponsSlice['장착']);
  let myWeapon: MyWeapon | undefined;
  const myWeaponId = equipWeapons[resonatorName];
  if (myWeaponId) {
    myWeapon = myWeapons[myWeaponId];
  }
  const myWeaponCode = myWeapon?.코드;
  const [weaponAtk, byWeapon] = genByWeapon(myWeapons)(myWeaponId);
  Object.entries(byWeapon).forEach(([stat, value]) => {
    values[stat as Stats] += value;
  });

  const myEchoInfoes = getMyEchoInfoes(useSelector((state: State) => state.echoesSlice['에코']))(
    useSelector((state: State) => state.echoesSlice['장착'])
  )(resonatorName);
  Object.entries(getMyEchoValues(myEchoInfoes)).forEach(([stat, value]) => {
    values[stat as Stats] = Math.round(values[stat as Stats] * 10000 + value * 10000) / 10000;
  });

  type StatsSummary = Exclude<
    Stats,
    'basic' | 'heavy' | 'skill' | 'burst' | 'flatHp' | 'flatAtk' | 'flatDef'
  >;
  const result: Record<StatsSummary, number> = {
    baseHp: getHP(resonatorData.hp1)(resonatorLevel),
    resonatorAtk: getATK(resonatorData.atk1)(resonatorLevel),
    weaponAtk: weaponAtk,
    baseAtk: getATK(resonatorData.atk1)(resonatorLevel) + weaponAtk,
    baseDef: getDEF(resonatorData.def1)(resonatorLevel),
    hp: values.hp,
    atk: values.atk,
    def: values.def,
    energy: 1 + values.energy,
    ice: values.ice,
    fire: values.fire,
    electro: values.electro,
    wind: values.wind,
    light: values.light,
    dark: values.dark,
    heal: values.heal,
    cRate: 0.05 + values.cRate,
    cDmg: 1.5 + values.cDmg,
  };
  return (
    <div className={styles.top}>
      <div className={styles.intro}>
        <div className={styles.lvBadge}>Lv.{resonatorLevel}</div>
        <div className={styles.imgBox}>
          <Thumbnail scope='Resonators' code={resonatorName} />
        </div>
        <div className={styles.name} style={{ backgroundColor: 'var(--element-' + element + ')' }}>
          {resonatorName}
        </div>
        <div className={styles.imgBox}>{weaponThumbnailControl(myWeaponCode)}</div>
      </div>
      <div className={styles.chain}>
        {[1, 2, 3, 4, 5, 6].map((i) => {
          return (
            <div className={styles.iconBox} key={i}>
              <Chain fill={'var(--theme-color-alpha-400)'} />
            </div>
          );
        })}
      </div>
      <div className={styles.stats}>
        <div>
          <span>HP</span>
          <span>{(result.baseHp * (1 + result.hp) + values.flatHp).toFixed(3)}</span>
        </div>
        <div>
          <span>공격력</span>
          <span>{(result.baseAtk * (1 + result.atk) + values.flatAtk).toFixed(3)}</span>
        </div>
        <div>
          <span>방어력</span>
          <span>{(result.baseDef * (1 + result.def) + values.flatDef).toFixed(3)}</span>
        </div>
        {(
          [
            'energy',
            'ice',
            'fire',
            'electro',
            'wind',
            'light',
            'dark',
            'heal',
            'cRate',
            'cDmg',
          ] as StatsSummary[]
        )
          .filter((i) => {
            if (result[i] > 0) {
              return true;
            }
            return false;
          })
          .map((i) => {
            let output = getPercent(result[i])(2);
            return (
              <div key={i}>
                <span>{getStatsName(i)}</span>
                <span>{output}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
