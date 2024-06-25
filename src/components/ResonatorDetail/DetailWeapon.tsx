import { Thumbnail, genByWeapon } from '..';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { MyWeapon, WeaponId } from '../../slice/weaponsSlice';
import { getStatsName, getWeaponName, weaponPivot } from '../../types';
import { getPercent } from '../../lib/formula';
import { WeaponData, everyWeaponData } from '../../lib/Weapons';
import styles from './DetailWeapon.module.css';

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
      <div className={styles.weapon}>
        <div className={styles.weaponName} style={{ backgroundColor: `var(--${rarity}-star)` }}>
          {name}
        </div>
        <div className={styles.body}>
          <div className={styles.imgContainer}>
            <Thumbnail scope='Weapons' code={code} key={getWeaponName(code)} />
          </div>
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
      </div>
    );
  } else {
    return null;
  }
}
