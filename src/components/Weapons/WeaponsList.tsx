import { useSelector } from 'react-redux';
import { State } from '../../store';
import { WeaponData, everyWeaponData } from '../../lib/Weapons';
import { getWeaponName } from '../../types';
import styles from './WeaponsList.module.css';

export default function WeaponsList() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const filterR = filters.rarity;
  const filterW = filters.weaponCategory;
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  if (myWeapons) {
    return (
      <section id='WeaponsList' className={styles.container}>
        {Object.values(myWeapons).map((i, j) => {
          if (i) {
            const weaponData = everyWeaponData[i.코드] as WeaponData;
            const name = getWeaponName(i.코드);
            const rarity = weaponData.rarity;
            const category = weaponData.category;
            if (filterR[rarity] && filterW[category]) {
              return (
                <div
                  data-category={category}
                  className={styles.card}
                  style={{ order: 6 - rarity }}
                  key={j}
                >
                  <div
                    className={styles.name}
                    style={{
                      backgroundColor: 'var(--' + rarity + '-star)',
                      color: 'black',
                    }}
                  >
                    {name}
                  </div>
                  <div className={styles.body}>
                    <div className={styles.infoBox}>
                      <div className={styles.level}>
                        <span>레벨</span>
                        <span>{i.레벨}</span>
                      </div>
                      {/* <div className={styles.stack}>{i.중첩}</div> */}
                      <div className={styles.atk}>
                        <span>공격력</span>
                        <span>{weaponData.atk1}</span>
                      </div>
                      <div className={styles.subOption}>
                        <span>추가 속성</span>
                        <span>{weaponData.subOption}</span>
                      </div>
                    </div>
                    <div className={styles.imgBox}>
                      <img
                        src={process.env.PUBLIC_URL + '/img/Weapons/' + i.코드 + '.png'}
                        alt={name}
                      />
                    </div>
                  </div>
                  <div className={styles.equip}>
                    <span>장착</span>
                    <span>{i.장착}</span>
                  </div>
                </div>
              );
            }
            return null;
          }
          return null;
        })}
      </section>
    );
  }
  return null;
}
