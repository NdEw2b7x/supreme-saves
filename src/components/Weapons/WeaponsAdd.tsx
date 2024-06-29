import { useSelector } from 'react-redux';
import { WeaponCode, everyWeaponData, getWeaponSubOptionValue1 } from '../../lib/Weapons';
import { EveryWeaponAtk1, EveryWeaponCategory, WeaponSubStats, getStatsName } from '../../types';
import { State, dispatch } from '../../store';
import { addWeapon } from '../../slice/weaponsSlice';
import { changeSubPage } from '../../slice/grobalSlice';
import styles from './WeaponsAdd.module.css';
import { getPercent } from '../../lib/formula';

export default function WeaponsAdd() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  return (
    <section id='WeaponAdd' className={styles.container}>
      {Object.entries(everyWeaponData).map(([code, data]) => {
        const rarity = data.rarity;
        const categoryId = Number(code[4]);
        const name = data.getName();
        const category: EveryWeaponCategory = data.category;
        const atk1: EveryWeaponAtk1 = data.atk1;
        const subOption: WeaponSubStats = data.subOption;
        const subOption1 = getWeaponSubOptionValue1(atk1, subOption);
        return filters.rarity[rarity] && filters.weaponCategory[category] ? (
          <div
            className={styles.card}
            style={{ order: (6 - rarity) * 10 + categoryId }}
            key={code}
            onClick={() => {
              dispatch(addWeapon(code as WeaponCode));
              dispatch(changeSubPage(undefined));
            }}
          >
            <div className={styles.name} style={{ backgroundColor: `var(--${rarity}-star)` }}>
              <span>{name}</span>
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
        ) : undefined;
      })}
    </section>
  );
}
