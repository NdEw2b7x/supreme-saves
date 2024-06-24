import { useSelector } from 'react-redux';
import { everyWeaponData, getWeaponSubOptionValue1 } from '../../lib/Weapons';
import {
  EveryWeaponAtk1,
  EveryWeaponCategory,
  WeaponSubStats,
  getStatsName,
  weaponPivot,
} from '../../types';
import { EveryWeaponCode } from '../../types/everyWeaponCode';
import { State, dispatch } from '../../store';
import { addWeapon } from '../../slice/weaponsSlice';
import { changeSubPage } from '../../slice/grobalSlice';
import styles from './WeaponsAdd.module.css';
import { getPercent } from '../../lib/formula';

export default function WeaponsAdd() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const filterR = filters.rarity;
  const filterW = filters.weaponCategory;
  return (
    <section id='WeaponAdd' className={styles.container}>
      {Object.entries(weaponPivot).map(([code, name]) => {
        const rarity = Number(code[1]) as 5 | 4 | 3;
        const type = Number(code[4]);
        const weaponData = everyWeaponData[code as EveryWeaponCode];
        if (weaponData) {
          const category: EveryWeaponCategory = weaponData.category;
          const atk1: EveryWeaponAtk1 = weaponData.atk1;
          const subOption: WeaponSubStats = weaponData.subOption;
          const subOption1 = getWeaponSubOptionValue1(atk1, subOption);
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
                <div className={styles.name} style={{ backgroundColor: `var(--${rarity}-star)` }}>
                  {name}
                </div>
                <div className={styles.body}>
                  <div className={styles.imgBox}>
                    <img src={`${process.env.PUBLIC_URL}/img/Weapons/${code}.png`} alt={name} />
                  </div>
                  <div className={styles.infoBox}>
                    <div>
                      <span>공격력</span>
                      <span>
                        {atk1} ~ {atk1 * 12.5}
                      </span>
                    </div>
                    <div>
                      <span>{getStatsName(subOption)}</span>
                      <span>
                        {getPercent(subOption1)(1)} ~ {getPercent(subOption1 * 4.5)(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }
        return null;
      })}
    </section>
  );
}
