import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { Rank, mapStatsName } from '../../types';
import {
  SkillLevel,
  changeSkillLevel,
  everySkillLevel,
  toggleNode,
} from '../../slice/resonatorsSlice';
import { getPercent } from '../../lib/formula';
import { ResonatorCode } from '../../lib/Resonators';
import { useByStatBonus } from '../useByMinorForte';
import styles from './DetailSkill.module.css';
import { everyForteLineName } from '../../types/Movement';

export function DetailSkill({ code }: { code: ResonatorCode }) {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myResonator = Object.fromEntries(myResonators.map((i) => [i['코드'], i]))[code];
  const [minorForte, byMinorForte] = useByStatBonus(code);

  return (
    <div className={styles.skill}>
      <div className={styles.skillNodes}>
        {everyForteLineName.map((line) => {
          return (
            <div className={styles.skillLine} key={line}>
              <div className={styles.skillNode}>
                <select
                  defaultValue={Number(myResonator['스킬'][line]['레벨'])}
                  onChange={({ target: { value } }) => {
                    const level = Number(value) as SkillLevel;
                    dispatch(changeSkillLevel({ code, line, level }));
                  }}
                >
                  {everySkillLevel.map((i) => {
                    const maxLevelByRank: Record<Rank, number> = {
                      0: 1,
                      1: 1,
                      2: 2,
                      3: 4,
                      4: 6,
                      5: 8,
                      6: 10,
                    };
                    return i <= maxLevelByRank[myResonator['돌파']] ? (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ) : undefined;
                  })}
                </select>
              </div>
              <div
                className={styles.skillNode}
                data-selected={myResonator['스킬'][line]['연결점'][0]}
                onClick={() => {
                  dispatch(
                    toggleNode({
                      code,
                      line,
                      order: 1,
                    })
                  );
                }}
              ></div>
              <div
                className={styles.skillNode}
                data-selected={myResonator['스킬'][line]['연결점'][1]}
                onClick={() => {
                  dispatch(
                    toggleNode({
                      code,
                      line,
                      order: 2,
                    })
                  );
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className={styles.skillTags}>
        {everyForteLineName.map((line) => {
          return <span key={line}>{line}</span>;
        })}
      </div>
      <div className={styles.minorForte}>
        <div>
          <span>{mapStatsName[minorForte[0]]}</span>
          <span>+{getPercent(byMinorForte[minorForte[0]])(2)}</span>
        </div>
        <div>
          <span>{mapStatsName[minorForte[1]]}</span>
          <span>+{getPercent(byMinorForte[minorForte[1]])(2)}</span>
        </div>
      </div>
    </div>
  );
}
