import { Thumbnail, genByMinorForte, genByWeapon, weaponThumbnailControl } from '..';
import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { changeSubPage, selectDetail } from '../../slice/grobalSlice';
import { MyResonator } from '../../slice/resonatorsSlice';
import { MyWeapon } from '../../slice/weaponsSlice';
import { EveryResonatorName, getElementMap } from '../../types';
import { getATK, getDEF, getHP, getPercent } from '../../lib/formula';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './ResonatorCard.module.css';

export default function ResonatorCard({
  resonatorName,
  info,
}: {
  resonatorName: EveryResonatorName;
  info: MyResonator;
}) {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  const equipWeapons = useSelector((state: State) => state.weaponsSlice['장착']);

  let myWeapon: MyWeapon | undefined;
  const myWeaponId = equipWeapons[resonatorName];
  if (myWeaponId) {
    myWeapon = myWeapons[myWeaponId];
  }

  const resonatorLevel = info['레벨'];
  const resonatorData = everyResonatorData[resonatorName];
  const element = resonatorData.element;

  const myWeaponCode = myWeapon?.코드;

  const [weaponAtk, byWeapon] = genByWeapon(myWeapons)(myWeaponId);
  const byMinorFortes = genByMinorForte(myResonators)(resonatorName);

  return (
    <div
      className={styles.card}
      style={{ order: Number(100 - resonatorLevel) }}
      key={resonatorName}
      onClick={() => {
        dispatch(selectDetail(resonatorName));
        dispatch(changeSubPage('상세'));
      }}
    >
      <div className={styles.top}>
        <div className={styles.intro}>
          <div className={styles.lvBadge}>Lv.{resonatorLevel}</div>
          <div className={styles.imgBox}>
            <Thumbnail scope='Resonators' code={resonatorName} key={resonatorName} />
          </div>
          <div
            className={styles.name}
            style={{ backgroundColor: 'var(--element-' + element + ')' }}
          >
            {resonatorName}
          </div>
          <div className={styles.imgBox}>{weaponThumbnailControl(myWeaponCode)}</div>
        </div>
        <div className={styles.stats}>
          <div>
            <span>HP</span>
            <span>
              {(
                getHP(resonatorData.hp1)(resonatorLevel) *
                (1 + byWeapon.hp + byMinorFortes[1].hp)
              ).toFixed(3)}
            </span>
          </div>
          <div>
            <span>공격력</span>
            <span>
              {(
                (getATK(resonatorData.atk1)(resonatorLevel) + weaponAtk) *
                (1 + byWeapon.atk + byMinorFortes[1].atk)
              ).toFixed(3)}
            </span>
          </div>
          <div>
            <span>방어력</span>
            <span>
              {(
                getDEF(resonatorData.def1)(resonatorLevel) *
                (1 + byWeapon.def + byMinorFortes[1].def)
              ).toFixed(3)}
            </span>
          </div>
          <div>
            <span>공명 효율</span>
            <span>{getPercent(1 + byWeapon.energy)(2)}</span>
          </div>
          <div>
            <span>{element} 피해 보너스</span>
            <span>{getPercent(byMinorFortes[1][getElementMap(element)])(2)}</span>
          </div>
          <div>
            <span>크리티컬 확률</span>
            <span>{getPercent(0.05 + byWeapon.cRate + byMinorFortes[1].cRate)(2)}</span>
          </div>
          <div>
            <span>크리티컬 피해</span>
            <span>{getPercent(1.5 + byWeapon.cDmg + byMinorFortes[1].cDmg)(2)}</span>
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
}
