import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './ResonatorDetail.module.css';
import { EveryResonatorName, everySkillLevel, everySkillType } from '../../types';
import {
  MyResonator,
  MyResonators,
  changeElement,
  changeLevel,
  changeSkillLevel,
  toggleNode1,
  toggleNode2,
} from '../../slice/resonatorsSlice';
import { getATK, getDEF, getHP, refine } from '../../lib/formula';
import { genByWeapon } from '../Resonators/ResonatorsList';
import ResonatorDetailWeapon from './ResonatorDetailWeapon';
import { getElementMap } from '../../types/everyStatistics';
import { MinorForte } from '../../lib/Resonators/ResonatorData';

export const genByMinorForte = (myResonators: MyResonators) => {
  const byMinorFortes: Record<MinorForte, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    ice: 0,
    fire: 0,
    electro: 0,
    wind: 0,
    light: 0,
    dark: 0,
    cRate: 0,
    cDmg: 0,
    heal: 0,
  };
  return (name: EveryResonatorName) => {
    const info = myResonators[name];
    const minorFortes = everyResonatorData[name].minorFortes;
    if (info) {
      const skill = info.스킬;
      minorFortes.forEach((i) => {
        let trueCheck3 = [skill['일반 공격'][1], skill['변주 스킬'][1]].filter((i) => i).length;
        let trueCheck7 = [skill['일반 공격'][2], skill['변주 스킬'][2]].filter((i) => i).length;
        let max = 12;
        switch (i) {
          case 'hp':
          case 'atk':
          case 'def':
            trueCheck3 = [skill['공명 스킬'][1], skill['공명 해방'][1]].filter((i) => i).length;
            trueCheck7 = [skill['공명 스킬'][2], skill['공명 해방'][2]].filter((i) => i).length;
            break;
        }
        switch (i) {
          case 'def':
            max = 15.2;
            break;
          case 'cRate':
            max = 8;
            break;
          case 'cDmg':
            max = 16;
            break;
        }
        byMinorFortes[i] = (max * (trueCheck3 * 3 + trueCheck7 * 7)) / 20;
      });
    }
    return [minorFortes, byMinorFortes] as const;
  };
};

export default function ResonatorDetail() {
  const name = useSelector((state: State) => state.grobalSlice['detail']) as EveryResonatorName;
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  const weaponMapping = useSelector((state: State) => state.weaponsSlice['맵핑']);

  const resonatorData = everyResonatorData[name];
  const myResonator = myResonators[name] as MyResonator;

  const element = resonatorData.element;
  const resonatorLevel = myResonator.레벨;

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
  const [weaponAtk, byWeapon] = genByWeapon(myWeapons)(weaponId);

  const changeElementSwitch = (name: EveryResonatorName) => {
    if (name === '방랑자') {
      return (
        <section className={styles.changeElement}>
          {['회절', '인멸'].map((i) => {
            switch (i) {
              case '회절':
              case '인멸':
                const current = localStorage.getItem('방랑자_속성');
                let selected = false;
                if (current) {
                  if (i === JSON.parse(current)) {
                    selected = true;
                  }
                }
                return (
                  <div
                    data-selected={selected}
                    onClick={() => {
                      dispatch(changeElement(i));
                    }}
                  >
                    {i}
                  </div>
                );
            }
            return null;
          })}
        </section>
      );
    }
  };
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
      {changeElementSwitch(name)}
      <main id='ResonatorDetail' className={styles.detail}>
        <section className={styles.statistics}>
          <div>
            <span>HP</span>
            <span>
              {refine(
                getHP(resonatorData.hp1)(resonatorLevel) *
                  (1 + (byWeapon.hp + byMinorForte.hp) / 100)
              )}
              <span style={{ fontSize: 'smaller' }}>
                &nbsp;({Math.floor(getHP(resonatorData.hp1)(resonatorLevel))}&nbsp;+&nbsp;
                {Math.floor(
                  getHP(resonatorData.hp1)(resonatorLevel) * ((byWeapon.hp + byMinorForte.hp) / 100)
                )}
                )
              </span>
            </span>
          </div>
          <div>
            <span>공격력</span>
            <span>
              {refine(
                (getATK(resonatorData.atk1)(resonatorLevel) + weaponAtk) *
                  (1 + (byWeapon.atk + byMinorForte.atk) / 100)
              )}
              <span style={{ fontSize: 'smaller' }}>
                &nbsp;({Math.floor(getATK(resonatorData.atk1)(resonatorLevel) + weaponAtk)}
                &nbsp;+&nbsp;
                {Math.floor(
                  (getATK(resonatorData.atk1)(resonatorLevel) + weaponAtk) *
                    ((byWeapon.atk + byMinorForte.atk) / 100)
                )}
                )
              </span>
            </span>
          </div>
          <div>
            <span>방어력</span>
            <span>
              {refine(
                getDEF(resonatorData.def1)(resonatorLevel) *
                  (1 + (byWeapon.def + byMinorForte.def) / 100)
              )}
              <span style={{ fontSize: 'smaller' }}>
                &nbsp;({Math.floor(getDEF(resonatorData.def1)(resonatorLevel))}
                &nbsp;+&nbsp;
                {Math.floor(
                  getDEF(resonatorData.def1)(resonatorLevel) *
                    ((byWeapon.def + byMinorForte.def) / 100)
                )}
                )
              </span>
            </span>
          </div>
          <div>
            <span>공명 효율</span>
            <span>{refine(100 + byWeapon.energy)}%</span>
          </div>
          <div>
            <span>{element} 피해 보너스</span>
            <span>{refine(byMinorForte[getElementMap(element)])}%</span>
          </div>
          <div>
            <span>크리티컬 확률</span>
            <span>{refine(5 + (byWeapon.cRate + byMinorForte.cRate))}%</span>
          </div>
          <div>
            <span>크리티컬 피해</span>
            <span>{refine(150 + (byWeapon.cDmg + byMinorForte.cDmg))}%</span>
          </div>
        </section>
        <section className={styles.weapon}>
          <ResonatorDetailWeapon id={weaponId} />
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
          <div className={styles.minorForte}>
            <div>
              <span>{minorForte[0]}</span>
              <span>+{byMinorForte[minorForte[0]]}%</span>
            </div>
            <div>
              <span>{minorForte[1]}</span>
              <span>+{byMinorForte[minorForte[1]]}%</span>
            </div>
          </div>
        </section>
        <section className='chain'>chain</section>
        <section className='damage'>damage</section>
        {/* {changeElement} */}
      </main>
    </>
  );
}
