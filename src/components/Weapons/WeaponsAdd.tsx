import { useSelector } from 'react-redux';
import { everyWeaponData } from '../../lib/Weapons';
import { EveryWeaponCategory, weaponPivot } from '../../types';
import { EveryWeaponCode } from '../../types/everyWeaponCode';
import { State, dispatch } from '../../store';
import { addWeapon } from '../../slice/weaponsSlice';
import { changeSubPage } from '../../slice/grobalSlice';
import styles from './WeaponsAdd.module.css';

export default function WeaponsAdd() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const filterR = filters.rarity;
  const filterW = filters.weaponCategory;
  return (
    <section id='WeaponAdd' className={styles.container}>
      {Object.entries(weaponPivot).map(([code, name]) => {
        const weaponData = everyWeaponData[code as EveryWeaponCode];
        const rarity = Number(code[1]) as 5 | 4 | 3;
        const type = Number(code[4]);
        const category = weaponData?.category as EveryWeaponCategory;
        const atk1 = weaponData?.atk1;
        const subOption = weaponData?.subOption;
        if (filterR[rarity] && filterW[category]) {
          return (
            <div
              className={styles.card}
              style={{ order: (6 - rarity) * 10 + type }}
              key={code}
              onClick={() => {
                dispatch(addWeapon(code as EveryWeaponCode));
                dispatch(changeSubPage(''));
              }}
            >
              <div className={styles.imgBox}>
                <img src={process.env.PUBLIC_URL + '/img/Weapons/' + code + '.png'} alt={name} />
              </div>
              <div className={styles.infoBox}>
                <div className={styles.name} style={{ backgroundColor: `var(--${rarity}-star)` }}>
                  {name}
                </div>
                <div className={styles.data}>
                  <div>{category}</div>
                  <div>공격력 {atk1}</div>
                  <div>{subOption}</div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </section>
  );
}
