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
          <div className={styles.statName}>HP</div>
          <div>
            <div>{(baseHp * (1 + hp) + flatHp).toFixed(3)}</div>
            <div>
              <span>{baseHp}</span>
              <span>+{(baseHp * hp + flatHp).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.statName}>공격력</div>
          <div>
            <div>{(baseAtk * (1 + atk) + flatAtk).toFixed(3)}</div>
            <div>
              <span>{baseAtk}</span>
              <span>+{(baseAtk * atk + flatAtk).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.statName}>방어력</div>
          <div>
            <div>{(baseDef * (1 + def) + flatDef).toFixed(3)}</div>
            <div>
              <span>{baseDef}</span>
              <span>+{(baseDef * def + flatDef).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.group}>
        {(
          [
            'energy',
            'cRate',
            'cDmg',
            'ice',
            'fire',
            'electro',
            'wind',
            'light',
            'dark',
            'heal',
          ] as Stats[]
        )
          .filter((i) => stats[i as keyof typeof stats] > 0)
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
                <span style={{ color }} className={styles.statName}>
                  {getStatsName(i)}
                </span>
                <span>{getPercent(stats[i as keyof typeof stats])(2)}</span>
              </div>
            );
          })}
      </div>
      {(['basic', 'heavy', 'skill', 'burst'] as Stats[]).some(
        (i) => stats[i as keyof typeof stats] > 0
      ) ? (
        <div className={styles.group}>
          {(['basic', 'heavy', 'skill', 'burst'] as Stats[])
            .filter((i) => stats[i as keyof typeof stats] > 0)
            .map((i) => {
              return (
                <div key={i}>
                  <span className={styles.statName}>{getStatsName(i)}</span>
                  <span>{getPercent(stats[i as keyof typeof stats])(2)}</span>
                </div>
              );
            })}
        </div>
      ) : undefined}
    </div>
  );
}
