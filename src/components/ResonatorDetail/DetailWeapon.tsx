import { Thumbnail } from '..';
import { useByWeapon } from '../useByWeapon';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { MyWeapon, WeaponId } from '../../slice/weaponsSlice';
import { ResonatorName, Stats, getStatsName } from '../../types';
import { getPercent } from '../../lib/formula';
import { WeaponData, everyWeaponData } from '../../lib/Weapons';
import styles from './DetailWeapon.module.css';

export default function DetailWeapon({ name, id }: { name: ResonatorName; id?: WeaponId }) {
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  const [weaponAtk, byWeapon] = useByWeapon(name);

  if (id) {
    const weapon = myWeapons[id] as MyWeapon;
    const code = weapon.코드;
    const data = everyWeaponData[code] as WeaponData;
    const name = data.getName();
    const rarity = data.rarity;
    const sub = data.subOption;
    const skill = data.skill;
    const s = weapon['공진'];
    return (
      <div className={styles.weapon}>
        <div className={styles.weaponName} style={{ backgroundColor: `var(--${rarity}-star)` }}>
          <span data-level={'Lv. ' + weapon['레벨']} data-syntonize={' S' + weapon['공진']}>
            {name}
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.imgContainer}>
            <Thumbnail scope='Weapons' code={code} key={name} />
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
        <div className={styles.ability}>
          <h5 className={styles.abilityName}>{skill.name ? skill.name : '(스킬 이름)'}</h5>
          <div className={styles.passive}>
            {skill.passive.map(({ stat, s1, s5 }) => {
              return (
                <div>
                  <span style={{ color: isElement(stat) ? `var(--element-${stat})` : 'white' }}>
                    {getStatsName(stat)}
                  </span>
                  <span>{getPercent(s1 + ((s5 - s1) * (s - 1)) / 4)(2)}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.active}>
            <div>
              {/* <span>전체 피해 보너스</span>
              <span>12%</span> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export const isElement = (stat: Stats) => {
  return stat === 'ice' ||
    stat === 'fire' ||
    stat === 'electro' ||
    stat === 'wind' ||
    stat === 'light' ||
    stat === 'dark'
    ? true
    : false;
};
