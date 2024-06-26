import { Thumbnail, weaponThumbnailControl } from '..';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { MyResonator } from '../../slice/resonatorsSlice';
import { MyWeapon } from '../../slice/weaponsSlice';
import { ResonatorName, Harmony, Stats, getStatsName } from '../../types';
import { getPercent } from '../../lib/formula';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './CardUpper.module.css';
import { MyEcho } from '../../slice/echoesSlice';
import Chain from '../icons/Chain';
import { useStatsResult } from '../useStatsResult';
import { elementMap } from '../../types/everyStatistics';

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
    Object.entries(countHarmony).filter(([, c]) => {
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
  const resonatorLevel = info['레벨'];
  const resonatorData = everyResonatorData[resonatorName];
  const element = resonatorData.element;

  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  const equipWeapons = useSelector((state: State) => state.weaponsSlice['장착']);
  let myWeapon: MyWeapon | undefined;
  const myWeaponId = equipWeapons[resonatorName];
  if (myWeaponId) {
    myWeapon = myWeapons[myWeaponId];
  }

  type StatsSummary = Exclude<
    Stats,
    'basic' | 'heavy' | 'skill' | 'burst' | 'flatHp' | 'flatAtk' | 'flatDef'
  >;
  const result = useStatsResult(resonatorName);
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
        <div className={styles.imgBox}>{weaponThumbnailControl(myWeapon?.코드)}</div>
      </div>
      <div className={styles.chain}>
        {[1, 2, 3, 4, 5, 6].map((i) => {
          const chain = info['체인'];
          if (i > chain) {
            return (
              <div className={styles.chainFalse} key={i}>
                <Chain fill={'var(--theme-color-alpha-400)'} />
              </div>
            );
          }
          return (
            <div className={styles.chainTrue} key={i}>
              <Chain fill={'var(--theme-color)'} />
            </div>
          );
        })}
      </div>
      <div className={styles.stats}>
        <div>
          <span>HP</span>
          {/* <span>{Math.floor((result.baseHp * (1 + result.hp)) / 10) * 10 + result.flatHp}</span> */}
          <span>{(result.baseHp * (1 + result.hp) + result.flatHp).toFixed(3)}</span>
        </div>
        <div>
          <span>공격력</span>
          <span>{(result.baseAtk * (1 + result.atk) + result.flatAtk).toFixed(3)}</span>
        </div>
        <div>
          <span>방어력</span>
          <span>{(result.baseDef * (1 + result.def) + result.flatDef).toFixed(3)}</span>
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
              switch (i) {
                case 'ice':
                case 'fire':
                case 'electro':
                case 'wind':
                case 'light':
                case 'dark':
                  if (elementMap[i] === element) {
                    return true;
                  }
                  return false;
                default:
                  return true;
              }
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
