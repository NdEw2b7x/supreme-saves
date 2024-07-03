import { Thumbnail, weaponThumbnailControl } from '..';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { MyResonator } from '../../slice/resonatorsSlice';
import { MyWeapon } from '../../slice/weaponsSlice';
import { Harmony, Stats, mapStatsName } from '../../types';
import { getPercent } from '../../lib/formula';
import { codeConverter, everyResonatorData } from '../../lib/Resonators/';
import { MyEcho } from '../../slice/echoesSlice';
import Chain from '../icons/Chain';
import { useStatsResult } from '../useStatsResult';
import styles from './CardUpper.module.css';

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
  return Object.fromEntries(Object.entries(countHarmony).filter(([, c]) => c >= 2));
};

export default function ResonatorCardUpper({ myResonator }: { myResonator: MyResonator }) {
  const myWeapons = Object.fromEntries(
    useSelector((state: State) => state.weaponsSlice['무기']).map((i) => [i['식별'], i])
  );
  const equipWeapons = useSelector((state: State) => state.weaponsSlice['장착']);

  const resonatorLevel = myResonator['레벨'];
  const code = myResonator['코드'];
  const data = everyResonatorData[code];
  const element = data.element;

  let myWeapon: MyWeapon | undefined;
  const myWeaponId = equipWeapons[codeConverter(code)];
  if (myWeaponId) {
    myWeapon = myWeapons[myWeaponId];
  }

  type StatsSummary = Exclude<
    Stats,
    'basic' | 'heavy' | 'skill' | 'burst' | 'flatHp' | 'flatAtk' | 'flatDef'
  >;
  const result = useStatsResult(code);
  return (
    <div className={styles.top}>
      <div className={styles.intro}>
        <div className={styles.lvBadge}>Lv.{resonatorLevel}</div>
        <div className={styles.imgBox}>
          <Thumbnail scope='Resonators' code={codeConverter(code)} />
        </div>
        <div className={styles.name} style={{ backgroundColor: 'var(--element-' + element + ')' }}>
          {data.name}
        </div>
        <div className={styles.imgBox}>{weaponThumbnailControl(myWeapon?.코드)}</div>
      </div>
      <div className={styles.chain}>
        {[1, 2, 3, 4, 5, 6].map((i) => {
          const chain = myResonator['체인'];
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
                  if (i === element) {
                    return true;
                  }
                  return false;
                default:
                  return true;
              }
            }
            return false;
          })
          .map((i) => (
            <div key={i}>
              <span style={{ color: `var(--element-${i})` }}>{mapStatsName[i]}</span>
              <span>{getPercent(result[i])(2)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
