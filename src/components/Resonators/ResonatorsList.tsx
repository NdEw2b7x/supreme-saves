import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import {
  EveryElement,
  EveryResonatorName,
  EveryStatistics,
  EveryWeaponAtk1,
  EveryWeaponCode,
  weaponPivot,
} from '../../types';
import { changeSubPage, selectDetail } from '../../slice/grobalSlice';
import { everyResonatorData } from '../../lib/Resonators';
import { WeaponData, everyWeaponData } from '../../lib/Weapons';
import {
  getATK,
  getDEF,
  getHP,
  getWeaponAtk,
  getWeaponSubOptionValue,
  refine,
} from '../../lib/formula';
import styles from './ResonatorsList.module.css';
import { MyWeapon, MyWeapons, WeaponId } from '../../slice/weaponsSlice';
import { genByMinorForte } from '../ResonatorDetail/ResonatorDetail';

export const genByWeapon = (myWeapons: MyWeapons) => {
  return (id?: WeaponId) => {
    let weaponAtk = 0;
    const byWeapon: Record<
      Exclude<EveryStatistics, `${EveryElement} 피해 보너스` | '치료 효과 보너스'>,
      number
    > = {
      HP: 0,
      공격력: 0,
      방어력: 0,
      '공명 효율': 0,
      '크리티컬 확률': 0,
      '크리티컬 피해': 0,
    };
    if (id) {
      const target = myWeapons[id];
      if (target) {
        const data = everyWeaponData[target.코드] as WeaponData;
        const level = target.레벨;
        const atk1: EveryWeaponAtk1 = data.atk1;
        const sub = data.subOption;
        weaponAtk = getWeaponAtk(atk1)(level);
        byWeapon[sub] = getWeaponSubOptionValue(atk1, sub)(level);
      }
    }
    return [weaponAtk, byWeapon] as const;
  };
};

export default function ResonatorsList() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const filterE = filters.element;
  const filterW = filters.weaponCategory;
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  const weaponMap = useSelector((state: State) => state.weaponsSlice['맵핑']);
  return (
    <section id='ResonatorsList' className={styles.container} data-section='list'>
      {Object.entries(myResonators).map(([key, info]) => {
        // resonator
        const resonatorName = key as EveryResonatorName;
        const resonatorData = everyResonatorData[resonatorName];
        const resonatorLevel = info.레벨;
        const element = resonatorData.element;
        const weaponCategory = resonatorData.weaponCatergory;
        // weapon
        const getMyWeapon = (name: EveryResonatorName) => {
          const weaponId = weaponMap[name];
          if (weaponId) {
            const myWeapon = myWeapons[weaponId] as MyWeapon;
            const data = everyWeaponData[myWeapon.코드] as WeaponData;
            return { ...myWeapon, ...data };
          }
        };
        const weaponImg = (code?: EveryWeaponCode) => {
          if (code) {
            return (
              <img
                src={`${process.env.PUBLIC_URL}/img/Weapons/${code}.png`}
                alt={weaponPivot[code]}
              />
            );
          }
        };
        if (filterE[element] && filterW[weaponCategory]) {
          const myWeapon = getMyWeapon(resonatorName);
          let myWeaponCode = myWeapon?.코드;
          const [weaponAtk, byWeapon] = genByWeapon(myWeapons)(weaponMap[resonatorName]);
          const minorForte = genByMinorForte(myResonators)(resonatorName);
          return (
            <div
              style={{ order: Number(100 - resonatorLevel) }}
              key={resonatorName}
              className={styles.card}
              onClick={() => {
                dispatch(selectDetail(resonatorName));
                dispatch(changeSubPage('상세'));
              }}
            >
              <div className={styles.top}>
                <div className={styles.intro}>
                  <div className={styles.lvBadge}>Lv.{info.레벨}</div>
                  <div className={styles.imgBox}>
                    <img
                      className={styles.img}
                      src={process.env.PUBLIC_URL + '/img/Resonators/' + resonatorName + '.png'}
                      alt={resonatorName}
                    />
                  </div>
                  <div
                    className={styles.name}
                    style={{ backgroundColor: 'var(--element-' + element + ')' }}
                  >
                    {resonatorName}
                  </div>
                  <div className={styles.imgBox}>{weaponImg(myWeaponCode)}</div>
                </div>
                <div className={styles.stats}>
                  <div>
                    <span>HP</span>
                    <span>
                      {refine(
                        getHP(resonatorData.hp1)(resonatorLevel) *
                          (1 + (byWeapon['HP'] + minorForte[1]['HP']) / 100)
                      )}
                    </span>
                  </div>
                  <div>
                    <span>공격력</span>
                    <span>
                      {refine(
                        (getATK(resonatorData.atk1)(resonatorLevel) + weaponAtk) *
                          (1 + (byWeapon['공격력'] + minorForte[1]['공격력']) / 100)
                      )}
                    </span>
                  </div>
                  <div>
                    <span>방어력</span>
                    <span>
                      {refine(
                        getDEF(resonatorData.def1)(resonatorLevel) *
                          (1 + (byWeapon['방어력'] + minorForte[1]['방어력']) / 100)
                      )}
                    </span>
                  </div>
                  <div>
                    <span>공명 효율</span>
                    <span>{(100 + byWeapon['공명 효율']).toFixed(2)}%</span>
                  </div>
                  <div>
                    <span>{element} 피해 보너스</span>
                    <span>{minorForte[1][`${element} 피해 보너스`]}%</span>
                  </div>
                  <div>
                    <span>크리티컬 확률</span>
                    <span>
                      {(5 + byWeapon['크리티컬 확률'] + minorForte[1]['크리티컬 확률']).toFixed(2)}%
                    </span>
                  </div>
                  <div>
                    <span>크리티컬 피해</span>
                    <span>
                      {(150 + byWeapon['크리티컬 피해'] + minorForte[1]['크리티컬 피해']).toFixed(
                        2
                      )}
                      %
                    </span>
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
        } else {
          return null;
        }
      })}
    </section>
  );
}
