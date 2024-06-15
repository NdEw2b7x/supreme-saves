import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './ResonatorDetail.module.css';
import { EveryResonatorName, everySkillLevel, everySkillType } from '../../types';
import {
  changeLevel,
  changeSkillLevel,
  toggleNode1,
  toggleNode2,
} from '../../slice/resonatorsSlice';

export default function ResonatorDetail() {
  const name = useSelector((state: State) => state.grobalSlice.detail) as EveryResonatorName;
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);

  const ResonatorData = everyResonatorData[name as EveryResonatorName];
  const myResonator = myResonators[name as EveryResonatorName];

  const innerLevel = [];
  for (let i = 1; i <= 90; i++) {
    innerLevel.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  // let changeElement
  // if (name === '방랑자') {
  //   changeElement = <ChangeElement />;
  // }
  return (
    <>
      <header className={styles.header} data-element={ResonatorData.element}>
        <div className={styles.imgBox}>
          <img
            src={process.env.PUBLIC_URL + '/img/Resonators/' + name + '.png'}
            alt={name + '.png'}
          />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.name}>{name}</div>
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
      <main id='ResonatorDetail' className={styles.detail}>
        <section className='weapon'>
          <div className={styles.weaponImgBox}>
            <img
              src={process.env.PUBLIC_URL + '/img/Weapons/금주의 수호.png'}
              alt={name + '.png'}
            />
          </div>
        </section>
        <section className='echoes'>echoes</section>
        <section className={styles.skill}>
          <div className={styles.skillNodes}>
            {everySkillType.map((type) => {
              return (
                <div className={styles.skillLine} key={type}>
                  <div className={styles.skillNode}>
                    <select
                      defaultValue={Number(myResonator?.스킬[type][0])}
                      onChange={(e) => {
                        const level = Number(e.target.value);
                        switch (level) {
                          case 1:
                          case 2:
                          case 3:
                          case 4:
                          case 5:
                          case 6:
                          case 7:
                          case 8:
                          case 9:
                          case 10:
                            dispatch(changeSkillLevel({ name, type, level }));
                            break;
                        }
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
        </section>
        <section className='chain'>chain</section>
        <section className='stat'>stat</section>
        <section className='damage'>damage</section>
        {/* {changeElement} */}
      </main>
    </>
  );
}
