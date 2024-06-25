import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './ResonatorDetail.module.css';
import { EveryChain, ResonatorName } from '../../types';
import { MyResonator, changeChain, changeLevel } from '../../slice/resonatorsSlice';
import DetailWeapon from './DetailWeapon';
import { RoverChangeElement } from './RoverChangeElement';
import { DetailStats } from './DetailStats';
import { DetailSkill } from './DetailSkill';
import Chain from '../icons/Chain';

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
              <DetailStats name={name} />
            </div>
            <div className={styles.right}>
              <DetailWeapon id={weaponId} name={name} />
              <DetailSkill name={name} />
              <div className={styles.chain}>
                <div className={styles.chainNodes}>
                  {([1, 2, 3, 4, 5, 6] as const).map((i) => {
                    const chainNumber: EveryChain = myResonator.체인;
                    let s = 'chainTrue';
                    let c = 'var(--theme-color)';
                    if (chainNumber < i) {
                      s = 'chainFalse';
                      c = 'var(--theme-color-alpha-400)';
                    }
                    return (
                      <div
                        className={styles[s]}
                        key={i}
                        onClick={() => {
                          let value: EveryChain = i;
                          if (i === chainNumber) {
                            value = (chainNumber - 1) as 0 | 1 | 2 | 3 | 4 | 5;
                          }
                          dispatch(changeChain({ name, chain: value as EveryChain }));
                        }}
                      >
                        <Chain fill={c} />
                      </div>
                    );
                  })}
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
