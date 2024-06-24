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
import { EveryResonatorName, Stats, getStatsName } from '../../types';
import { getATK, getDEF, getHP, getPercent } from '../../lib/formula';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './CardUpper.module.css';
import { EchoEquipSlot, EchoId, MyEcho } from '../../slice/echoesSlice';

export const getMyEchoInfoes = (myEchoes: Partial<Record<EchoId, MyEcho>>) => {
  return (
    equipEchoes: Partial<Record<EveryResonatorName, Partial<Record<EchoEquipSlot, EchoId>>>>
  ) => {
    return (name: EveryResonatorName) => {
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

export default function ResonatorCardUpper({
  resonatorName,
  info,
}: {
  resonatorName: EveryResonatorName;
  info: MyResonator;
}) {
  const values: Record<Stats, number> = {
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
    values[stat as Stats] += value;
  });

  const result: Record<
    Exclude<Stats, 'basic' | 'heavy' | 'skill' | 'burst' | 'flatHp' | 'flatAtk' | 'flatDef'>,
    number
  > = {
    hp: getHP(resonatorData.hp1)(resonatorLevel) * (1 + values.hp) + values.flatHp,
    atk:
      (getATK(resonatorData.atk1)(resonatorLevel) + weaponAtk) * (1 + values.atk) + values.flatAtk,
    def: getDEF(resonatorData.def1)(resonatorLevel) * (1 + values.def) + values.flatDef,
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
      <div className={styles.stats}>
        {Object.entries(result)
          .filter((i) => {
            if (i[1] > 0) {
              return true;
            }
            return false;
          })
          .map(([stat, value]) => {
            let tag = getStatsName(stat as Stats);
            let result: string = getPercent(value)(2);
            switch (stat) {
              case 'hp':
              case 'atk':
              case 'def':
                result = value.toFixed(3);
                break;
            }
            switch (stat) {
              case 'hp':
                tag = 'HP';
                break;
              case 'atk':
                tag = '공격력';
                break;
              case 'def':
                tag = '방어력';
                break;
            }
            return (
              <div key={stat}>
                <span>{tag}</span>
                <span>{result}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
