import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { EveryResonatorName, EveryWeaponCode, weaponPivot } from '../../types';
import { everyResonatorData } from '../../lib/Resonators';
import { changeSubPage, selectDetail } from '../../slice/grobalSlice';
import { getATK, getDEF, getHP, refine } from '../../lib/formula';
import styles from './ResonatorsList.module.css';

export default function ResonatorsList() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const filterE = filters.element;
  const filterW = filters.weaponCategory;
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myResonatorsKeys = Object.keys(myResonators);
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  const weaponMap = useSelector((state: State) => state.weaponsSlice['맵핑']);

  return (
    <section id='ResonatorsList' className={styles.container} data-section='list'>
      {myResonatorsKeys.map((i) => {
        const name = i as EveryResonatorName;
        const myLevel = myResonators[name]?.레벨 as number;
        const resonatorData = everyResonatorData[i as EveryResonatorName];
        const element = resonatorData.element;
        const weaponCategory = resonatorData.weaponCatergory;
        const weaponImg = (x?: EveryWeaponCode) => {
          if (x) {
            return (
              <img
                className={styles.img}
                src={process.env.PUBLIC_URL + '/img/Weapons/' + x + '.png'}
                alt={weaponPivot[x]}
              />
            );
          }
        };
        const getWeaponCode = (name: EveryResonatorName) => {
          const weaponId = weaponMap[name];
          if (weaponId) {
            return myWeapons[weaponId]?.코드;
          }
        };
        if (filterE[element] && filterW[weaponCategory]) {
          return (
            <div
              style={{ order: Number(100 - myLevel) }}
              key={i}
              className={styles.card}
              onClick={() => {
                dispatch(selectDetail(name));
                dispatch(changeSubPage('상세'));
              }}
            >
              <div className={styles.top}>
                <div className={styles.intro}>
                  <div className={styles.lvBadge}>Lv.{myResonators[name]?.레벨}</div>
                  <div className={styles.imgBox}>
                    <img
                      className={styles.img}
                      src={process.env.PUBLIC_URL + '/img/Resonators/' + i + '.png'}
                      alt={i + '.png'}
                    />
                  </div>
                  <div
                    className={styles.name}
                    style={{ backgroundColor: 'var(--element-' + element + ')' }}
                  >
                    {i}
                  </div>
                  <div className={styles.imgBox}>{weaponImg(getWeaponCode(name))}</div>
                </div>
                <div className={styles.stats}>
                  <div>
                    <span>HP</span>
                    <span>{refine(getHP(resonatorData.hp, myLevel))}</span>
                  </div>
                  <div>
                    <span>공격력</span>
                    <span>{refine(getATK(resonatorData.atk, myLevel))}</span>
                  </div>
                  <div>
                    <span>방어력</span>
                    <span>{refine(getDEF(resonatorData.def, myLevel))}</span>
                  </div>
                  <div>
                    <span>공명 효율</span>
                    <span>100%</span>
                  </div>
                  <div>
                    <span>{resonatorData.element} 피해 보너스</span>
                    <span>0%</span>
                  </div>
                  <div>
                    <span>크리티컬 확률</span>
                    <span>5%</span>
                  </div>
                  <div>
                    <span>크리티컬 피해</span>
                    <span>150%</span>
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.echoes}>
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <img
                        className={styles.img}
                        src={process.env.PUBLIC_URL + '/img/Echoes/무망자.png'}
                        alt={'무망자.png'}
                      />
                    </div>
                    <div className={styles.echoOpt}>
                      <div className={styles.main}>
                        <span>크리확률</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <img
                        className={styles.img}
                        src={process.env.PUBLIC_URL + '/img/Echoes/무망자.png'}
                        alt={'무망자.png'}
                      />
                    </div>
                    <div className={styles.echoOpt}>
                      <div className={styles.main}>
                        <span>인멸</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <img
                        className={styles.img}
                        src={process.env.PUBLIC_URL + '/img/Echoes/후슈슈.png'}
                        alt={'후슈슈.png'}
                      />
                    </div>
                    <div className={styles.echoOpt}>
                      <div className={styles.main}>
                        <span>인멸</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <img
                        className={styles.img}
                        src={process.env.PUBLIC_URL + '/img/Echoes/아즈즈.png'}
                        alt={'아즈즈.png'}
                      />
                    </div>
                    <div className={styles.echoOpt}>
                      <div className={styles.main}>
                        <span>공격력%</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <img
                        className={styles.img}
                        src={process.env.PUBLIC_URL + '/img/Echoes/칵찰찰.png'}
                        alt={'칵찰찰.png'}
                      />
                    </div>
                    <div className={styles.echoOpt}>
                      <div className={styles.main}>
                        <span>공격력%</span>
                      </div>
                      <div className={styles.sub}>
                        <span>공격력%</span>
                        <span>10%</span>
                      </div>
                      <div className={styles.sub}>
                        <span>크리확률</span>
                        <span>10%</span>
                      </div>
                      <div className={styles.sub}>
                        <span>크리피해</span>
                        <span>10%</span>
                      </div>
                      <div className={styles.sub}>
                        <span>해방피해</span>
                        <span>10%</span>
                      </div>
                      <div className={styles.sub}>
                        <span>스킬피해</span>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return <></>;
      })}
    </section>
  );
}
