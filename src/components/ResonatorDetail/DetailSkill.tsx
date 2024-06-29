import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import {
  ResonatorName,
  SkillLevel,
  everySkillLevel,
  everySkillType,
  getStatsName,
} from '../../types';
import {
  MyResonator,
  changeSkillLevel,
  toggleNode1,
  toggleNode2,
} from '../../slice/resonatorsSlice';
import { getPercent } from '../../lib/formula';
import { useByMinorForte } from '../useByMinorForte';
import styles from './DetailSkill.module.css';

export function DetailSkill({ name }: { name: ResonatorName }) {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myResonator = myResonators[name] as MyResonator;
  const [minorForte, byMinorForte] = useByMinorForte(name);
  return (
    <div className={styles.skill}>
      <div className={styles.skillNodes}>
        {everySkillType.map((type) => {
          return (
            <div className={styles.skillLine} key={type}>
              <div className={styles.skillNode}>
                <select
                  defaultValue={Number(myResonator?.스킬[type][0])}
                  onChange={(e) => {
                    const level = Number(e.target.value) as SkillLevel;
                    dispatch(changeSkillLevel({ name, type, level }));
                  }}
                >
                  {everySkillLevel.map((i) => {
                    let levelCap = 1;
                    const myLevel = myResonator?.레벨;
                    if (myLevel) {
                      if (myLevel > 80) {
                        levelCap = 10;
                      } else if (myLevel > 70) {
                        levelCap = 8;
                      } else if (myLevel > 60) {
                        levelCap = 6;
                      } else if (myLevel > 50) {
                        levelCap = 4;
                      } else if (myLevel > 40) {
                        levelCap = 2;
                      }
                    }
                    if (i <= levelCap) {
                      return (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      );
                    } else {
                      return (
                        <option key={i} value={i} disabled>
                          {i}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <div
                className={styles.skillNode}
                data-selected={myResonator?.스킬[type][1]}
                onClick={() => {
                  dispatch(toggleNode1({ name, type }));
                }}
              ></div>
              <div
                className={styles.skillNode}
                data-selected={myResonator?.스킬[type][2]}
                onClick={() => {
                  dispatch(toggleNode2({ name, type }));
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className={styles.skillTags}>
        {everySkillType.map((i) => {
          return <span key={i}>{i}</span>;
        })}
      </div>
      <div className={styles.minorForte}>
        <div>
          <span>{getStatsName(minorForte[0])}</span>
          <span>+{getPercent(byMinorForte[minorForte[0]])(2)}</span>
        </div>
        <div>
          <span>{getStatsName(minorForte[1])}</span>
          <span>+{getPercent(byMinorForte[minorForte[1]])(2)}</span>
        </div>
      </div>
    </div>
  );
}
