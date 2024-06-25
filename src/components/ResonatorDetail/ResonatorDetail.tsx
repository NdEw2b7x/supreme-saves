import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './ResonatorDetail.module.css';
import {
  ResonatorName,
  SkillLevel,
  everySkillLevel,
  everySkillType,
  getStatsName,
} from '../../types';
import {
  MyResonator,
  changeLevel,
  changeSkillLevel,
  toggleNode1,
  toggleNode2,
} from '../../slice/resonatorsSlice';
import { getPercent } from '../../lib/formula';
import ResonatorDetailWeapon from './DetailWeapon';
import { genByMinorForte } from '..';
import { RoverChangeElement } from './RoverChangeElement';
import { DetailStats } from './DetailStats';

export default function ResonatorDetail() {
  const name = useSelector((state: State) => state.grobalSlice['detail']) as ResonatorName;
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const weaponMapping = useSelector((state: State) => state.weaponsSlice['장착']);

  const resonatorData = everyResonatorData[name];
  const myResonator = myResonators[name] as MyResonator;

  const element = resonatorData.element;

  const innerLevel = [];
  for (let i = 1; i <= 90; i++) {
    innerLevel.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const weaponId = weaponMapping[name];
  const [minorForte, byMinorForte] = genByMinorForte(myResonators)(name);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.imgBox}>
          <img src={`${process.env.PUBLIC_URL}/img/Resonators/${name}.png`} alt={name} />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.name} style={{ backgroundColor: `var(--element-${element})` }}>
            {name}
          </div>
          <div className={styles.levelBox}>
            <span>Lv.</span>
            <select
              defaultValue={myResonator?.레벨}
              onChange={(e) => {
                const level = Number(e.target.value);
                dispatch(changeLevel({ name, level }));
              }}
            >
              {innerLevel}
            </select>
          </div>
        </div>
      </header>
      <RoverChangeElement name={name} />
      <main id='ResonatorDetail' className={styles.mainConatainer}>
        <section className={styles.info}>
          <div className={styles.top}>
            <div className={styles.left}>
              <DetailStats name={name} level={myResonator['레벨']} />
            </div>
            <div className={styles.right}>
              <ResonatorDetailWeapon id={weaponId} />
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
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.echoes}>echoes</div>
          </div>
        </section>
        <section className='damage'>damage</section>
      </main>
    </>
  );
}
