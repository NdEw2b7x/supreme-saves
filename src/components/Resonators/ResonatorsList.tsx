import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import {
  EveryResonatorName,
  EveryWeaponAtk1,
  EveryWeaponCode,
  weaponPivot,
  WeaponSubStats,
} from '../../types';
import { changeSubPage, selectDetail } from '../../slice/grobalSlice';
import { everyResonatorData } from '../../lib/Resonators';
import { WeaponData, everyWeaponData } from '../../lib/Weapons';
import {
  getATK,
  getDEF,
  getHP,
  getPercent,
  getWeaponAtk,
  getWeaponSubOptionValue,
} from '../../lib/formula';
import styles from './ResonatorsList.module.css';
import { MyWeapon, MyWeapons, WeaponId } from '../../slice/weaponsSlice';
import { genByMinorForte } from '../ResonatorDetail/ResonatorDetail';
import { getElementMap } from '../../types/everyStatistics';
import { Thumbnail } from '..';

export const genByWeapon = (myWeapons: MyWeapons) => {
  const byWeapon: Record<WeaponSubStats, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    cRate: 0,
    cDmg: 0,
  };
  return (id?: WeaponId) => {
    let weaponAtk = 0;
    if (id) {
      const myWeapon = myWeapons[id];
      if (myWeapon) {
        const data = everyWeaponData[myWeapon['코드']] as WeaponData;
        const level = myWeapon['레벨'];
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
          const minorFortes = genByMinorForte(myResonators)(resonatorName);
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
                      {(
                        getHP(resonatorData.hp1)(resonatorLevel) *
                        (1 + byWeapon.hp + minorFortes[1].hp)
                      ).toFixed(3)}
                    </span>
                  </div>
                  <div>
                    <span>공격력</span>
                    <span>
                      {(
                        (getATK(resonatorData.atk1)(resonatorLevel) + weaponAtk) *
                        (1 + byWeapon.atk + minorFortes[1].atk)
                      ).toFixed(3)}
                    </span>
                  </div>
                  <div>
                    <span>방어력</span>
                    <span>
                      {(
                        getDEF(resonatorData.def1)(resonatorLevel) *
                        (1 + byWeapon.def + minorFortes[1].def)
                      ).toFixed(3)}
                    </span>
                  </div>
                  <div>
                    <span>공명 효율</span>
                    <span>{getPercent(1 + byWeapon.energy)(2)}</span>
                  </div>
                  <div>
                    <span>{element} 피해 보너스</span>
                    <span>{getPercent(minorFortes[1][getElementMap(element)])(2)}</span>
                  </div>
                  <div>
                    <span>크리티컬 확률</span>
                    <span>{getPercent(0.05 + byWeapon.cRate + minorFortes[1].cRate)(2)}</span>
                  </div>
                  <div>
                    <span>크리티컬 피해</span>
                    <span>{getPercent(1.5 + byWeapon.cDmg + minorFortes[1].cDmg)(2)}</span>
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.echoes}>
                  {/* {(['H81', 'H41', 'H48', 'G01', 'G03'] as EchoCode[]).map((c) => {
                    return (
                      <div className={styles.echo}>
                        <div className={styles.echoImgBox}>
                          <Thumbnail scope='Echoes' code={c} />
                        </div>
                        <div className={styles.echoOpt}>
                          <div className={styles.main}>
                            <span>크리확률</span>
                          </div>
                        </div>
                      </div>
                    );
                  })} */}
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <Thumbnail scope='Echoes' code='H81' key='H81' />
                    </div>
                    <div className={styles.echoOpt}>
                      <div className={styles.main}>
                        <span>크리확률</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <Thumbnail scope='Echoes' code='H41' key='H41' />
                    </div>
                    <div className={styles.echoOpt}>
                      <div className={styles.main}>
                        <span>인멸</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <Thumbnail scope='Echoes' code='H48' key='H48' />
                    </div>
                    <div className={styles.echoOpt}>
                      <div className={styles.main}>
                        <span>인멸</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <Thumbnail scope='Echoes' code='G01' key='G01' />
                    </div>
                    <div className={styles.echoOpt}>
                      <div className={styles.main}>
                        <span>공격력%</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.echo}>
                    <div className={styles.echoImgBox}>
                      <Thumbnail scope='Echoes' code='G03' key='G03' />
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
