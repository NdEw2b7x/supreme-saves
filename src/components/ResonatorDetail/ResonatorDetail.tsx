import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './ResonatorDetail.module.css';
import {
  EveryResonatorName,
  EverySkillType,
  EveryStatistics,
  EveryWeaponAtk1,
  SkillSet,
  everySkillLevel,
  everySkillType,
  weaponPivot,
} from '../../types';
import {
  MyResonator,
  changeElement,
  changeLevel,
  changeSkillLevel,
  toggleNode1,
  toggleNode2,
} from '../../slice/resonatorsSlice';
import { getATK, getDEF, getHP, getWeaponAtk, refine } from '../../lib/formula';
import { MyWeapon } from '../../slice/weaponsSlice';
import { everyWeaponData } from '../../lib/Weapons';

export const getMinorForte = (skill: Record<EverySkillType, SkillSet>) => {
  return (stat: EveryStatistics) => {
    let trueCheckS: number = 0;
    let trueCheckL: number = 0;
    let max: number = 0;
    switch (stat) {
      case 'HP':
      case '공격력':
      case '방어력':
        trueCheckS = [skill['공명 스킬'][1], skill['공명 해방'][1]].filter((i) => i).length;
        trueCheckL = [skill['공명 스킬'][2], skill['공명 해방'][2]].filter((i) => i).length;
        break;
      default:
        trueCheckS = [skill['일반 공격'][1], skill['변주 스킬'][1]].filter((i) => i).length;
        trueCheckL = [skill['일반 공격'][2], skill['변주 스킬'][2]].filter((i) => i).length;
        break;
    }
    switch (stat) {
      case '방어력':
        max = 15.2;
        break;
      case '크리티컬 확률':
        max = 8;
        break;
      case '크리티컬 피해':
        max = 16;
        break;
      default:
        max = 12;
        break;
    }
    return (max * (trueCheckS * 3 + trueCheckL * 7)) / 20;
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

  const getMyMinorForte = getMinorForte(myResonator.스킬);
  const byMinorForte: Record<Exclude<EveryStatistics, '공명 효율'>, number> = {
    HP: 0,
    공격력: 0,
    방어력: 0,
    '크리티컬 확률': 0,
    '크리티컬 피해': 0,
    '응결 피해 보너스': 0,
    '용융 피해 보너스': 0,
    '전도 피해 보너스': 0,
    '기류 피해 보너스': 0,
    '회절 피해 보너스': 0,
    '인멸 피해 보너스': 0,
    '치료 효과 보너스': 0,
  };
  const minorForte = resonatorData.minorForte;
  byMinorForte[minorForte[0]] = getMyMinorForte(minorForte[0]);
  byMinorForte[minorForte[1]] = getMyMinorForte(minorForte[1]);

  const innerLevel = [];
  for (let i = 1; i <= 90; i++) {
    innerLevel.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const equip = weaponMapping[name];
  let myWeaponAtk1: EveryWeaponAtk1 = 24;
  let myWeaponLevel = 0;
  let weaponImg;
  if (equip) {
    const myWeapon = myWeapons[equip] as MyWeapon;
    const myWeaponCode = myWeapon.코드;
    const myWeaponName = weaponPivot[myWeaponCode];
    myWeaponAtk1 = everyWeaponData[myWeapon.코드]?.atk1 as EveryWeaponAtk1;
    myWeaponLevel = myWeapon.레벨;

    weaponImg = (
      <img src={`${process.env.PUBLIC_URL}/img/Weapons/${myWeaponCode}.png`} alt={myWeaponName} />
    );
  }

  let changeElementSwitch;
  if (name === '방랑자') {
    changeElementSwitch = (
      <section className={styles.changeElement}>
        {['회절', '인멸'].map((i) => {
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
                switch (i) {
                  case '회절':
                  case '인멸':
                    dispatch(changeElement(i));
                    break;

                  default:
                    break;
                }
              }}
            >
              {i}
            </div>
          );
        })}
      </section>
    );
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.imgBox}>
          <img
            src={process.env.PUBLIC_URL + '/img/Resonators/' + name + '.png'}
            alt={name + '.png'}
          />
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
      {changeElementSwitch}
      <main id='ResonatorDetail' className={styles.detail}>
        <section className={styles.statistics}>
          <div>
            <span>HP</span>
            <span>
              {refine(getHP(resonatorData.hp1, resonatorLevel) * (1 + byMinorForte['HP'] / 100))}
            </span>
          </div>
          <div>
            <span>공격력</span>
            <span>
              {refine(
                (getATK(resonatorData.atk1, resonatorLevel) +
                  getWeaponAtk(myWeaponAtk1)(myWeaponLevel)) *
                  (1 + byMinorForte['공격력'] / 100)
              )}
            </span>
          </div>
          <div>
            <span>방어력</span>
            <span>
              {refine(
                getDEF(resonatorData.def1, resonatorLevel) * (1 + byMinorForte['방어력'] / 100)
              )}
            </span>
          </div>
          <div>
            <span>공명 효율</span>
            <span>100%</span>
          </div>
          <div>
            <span>{element} 피해 보너스</span>
            <span>{refine(byMinorForte[`${element} 피해 보너스`])}%</span>
          </div>
          <div>
            <span>크리티컬 확률</span>
            <span>{refine(5 + byMinorForte['크리티컬 확률'])}%</span>
          </div>
          <div>
            <span>크리티컬 피해</span>
            <span>{refine(150 + byMinorForte['크리티컬 피해'])}%</span>
          </div>
        </section>
        <section className='weapon'>
          <div className={styles.weaponImgBox}>{weaponImg}</div>
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
              <span>+{getMyMinorForte(minorForte[0])}%</span>
            </div>
            <div>
              <span>{minorForte[1]}</span>
              <span>+{getMyMinorForte(minorForte[1])}%</span>
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
