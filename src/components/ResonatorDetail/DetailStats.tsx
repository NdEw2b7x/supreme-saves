import { ResonatorName, Stats, getStatsName } from '../../types';
import { getPercent } from '../../lib/formula';
import { useStatsResult } from '../useStatsResult';
import styles from './DetailStats.module.css';

export function DetailStats({ name }: { name: ResonatorName }) {
  const { baseHp, baseAtk, baseDef, hp, atk, def, flatHp, flatAtk, flatDef, ...stats } =
    useStatsResult(name);
  return (
    <div className={styles.stats}>
      <div className={styles.group}>
        <div>
          <span>HP</span>
          <span>
            <span>{(baseHp * (1 + hp) + flatHp).toFixed(3)}</span>
            <span style={{ fontSize: 'smaller' }}>
              &nbsp;({baseHp}&nbsp;+&nbsp;
              {(baseHp * hp + flatHp).toFixed(2)})
            </span>
          </span>
        </div>
        <div>
          <span>공격력</span>
          <span>
            <span>{(baseAtk * (1 + atk) + flatAtk).toFixed(3)}</span>
            <span style={{ fontSize: 'smaller' }}>
              &nbsp;({baseAtk}
              &nbsp;+&nbsp;
              {(baseAtk * atk + flatAtk).toFixed(2)})
            </span>
          </span>
        </div>
        <div>
          <span>방어력</span>
          <span>
            <span>{(baseDef * (1 + def) + flatDef).toFixed(3)}</span>
            <span style={{ fontSize: 'smaller' }}>
              &nbsp;({baseDef}
              &nbsp;+&nbsp;
              {(baseDef * def + flatDef).toFixed(2)})
            </span>
          </span>
        </div>
      </div>
      <div className={styles.group}>
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
          ] as Stats[]
        )
          .filter((i) => {
            if (stats[i as keyof typeof stats] > 0) {
              return true;
            }
            return false;
          })
          .map((i) => {
            let color = 'white';
            switch (i) {
              case 'ice':
              case 'fire':
              case 'electro':
              case 'wind':
              case 'light':
              case 'dark':
                color = `var(--element-${i})`;
                break;
              default:
                break;
            }

            return (
              <div key={i}>
                <span style={{ color }}>{getStatsName(i)}</span>
                <span>{getPercent(stats[i as keyof typeof stats])(3)}</span>
              </div>
            );
          })}
      </div>
      <div className={styles.group}>
        {(['basic', 'heavy', 'skill', 'burst'] as Stats[])
          .filter((i) => {
            if (stats[i as keyof typeof stats] > 0) {
              return true;
            }
            return false;
          })
          .map((i) => {
            return (
              <div key={i}>
                <span>{getStatsName(i)}</span>
                <span>{getPercent(stats[i as keyof typeof stats])(3)}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
