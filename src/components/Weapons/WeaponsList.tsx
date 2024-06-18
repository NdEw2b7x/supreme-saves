import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { WeaponData, everyWeaponData } from '../../lib/Weapons';
import { EveryResonatorName, getWeaponName } from '../../types';
import styles from './WeaponsList.module.css';
import { everyResonatorData } from '../../lib/Resonators';
import { changeEquip } from '../../slice/weaponsSlice';

export default function WeaponsList() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const filterR = filters.rarity;
  const filterW = filters.weaponCategory;
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  if (myWeapons) {
    return (
      <section id='WeaponsList' className={styles.container}>
        {Object.entries(myWeapons).map(([id, weapon]) => {
          if (weapon) {
            const code = weapon.코드;
            const level = weapon.레벨;
            const equip = weapon.장착;
            const weaponData = everyWeaponData[code] as WeaponData;
            const name = getWeaponName(code);
            const rarity = weaponData.rarity;
            const category = weaponData.category;
            const thumbnail = (x: EveryResonatorName | '미장착') => {
              if (equip !== '미장착') {
                return (
                  <img
                    src={process.env.PUBLIC_URL + '/img/Resonators/' + equip + '.png'}
                    alt={equip}
                  />
                );
              }
              return null;
            };
            if (filterR[rarity] && filterW[category]) {
              return (
                <div
                  data-category={category}
                  className={styles.card}
                  style={{ order: (6 - rarity) * 10 + Number(code[4]) }}
                  key={id}
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
                    <div className={styles.imgBox}>
                      <img
                        src={process.env.PUBLIC_URL + '/img/Weapons/' + code + '.png'}
                        alt={name}
                      />
                    </div>
                    <div className={styles.infoBox}>
                      <div className={styles.level}>
                        <span>레벨</span>
                        <span>{level}</span>
                      </div>
                      <div className={styles.atk}>
                        <span>공격력</span>
                        <span>{weaponData.atk1}</span>
                      </div>
                      <div className={styles.subOption}>
                        <span>{weaponData.subOption}</span>
                        <span>xx%</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.equip}>
                    <span>장착</span>
                    <select
                      name={id}
                      defaultValue={equip}
                      onChange={(e) => {
                        dispatch(
                          changeEquip({
                            id: id as `weapon_${number}`,
                            equip: e.target.value as EveryResonatorName,
                          })
                        );
                      }}
                    >
                      <option value='미장착'>미장착</option>
                      {Object.keys(myResonators).map((name) => {
                        const resonatorCategory =
                          everyResonatorData[name as EveryResonatorName].weaponCatergory;
                        if (resonatorCategory === category) {
                          return (
                            <option value={name} key={name}>
                              {name}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </select>
                    <div className={styles.thumbnail}>{thumbnail(equip)}</div>
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
