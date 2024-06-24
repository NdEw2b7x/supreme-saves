import { useSelector } from 'react-redux';
import { State } from '../../store';
import { getStatsName, weaponPivot } from '../../types';
import { MyWeapon, WeaponId } from '../../slice/weaponsSlice';
import { WeaponData, everyWeaponData } from '../../lib/Weapons';
import styles from './ResonatorDetail.module.css';
import { getPercent } from '../../lib/formula';
import { genByWeapon } from '..';

export default function ResonatorDetailWeapon({ id }: { id?: WeaponId }) {
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);

  if (id) {
    const [weaponAtk, byWeapon] = genByWeapon(myWeapons)(id);
    const weapon = myWeapons[id] as MyWeapon;
    const code = weapon.코드;
    const data = everyWeaponData[code] as WeaponData;
    const name = weaponPivot[code];
    const rarity = data.rarity;
    const sub = data.subOption;
    return (
      <>
        <div className={styles.name} style={{ backgroundColor: `var(--${rarity}-star)` }}>
          {name}
        </div>
        <div className={styles.body}>
          <img
            className={styles.weaponImg}
            src={`${process.env.PUBLIC_URL}/img/Weapons/${code}.png`}
            alt={name}
          />
          <div className={styles.info}>
            <div>
              <span>공격력</span>
              <span>{weaponAtk}</span>
            </div>
            <div>
              <span>{getStatsName(sub)}</span>
              <span>{getPercent(byWeapon[sub])(2)}</span>
            </div>
          </div>
        </div>
        <div className={styles.ability}>{weapon.공진}단계</div>
      </>
    );
  } else {
    return null;
  }
}
