import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import {
  WeaponId,
  changeEquip,
  changeSyntonize,
  changeWeaponLevel,
} from '../../slice/weaponsSlice';
import { ResonatorName, getStatsName } from '../../types';
import { getPercent, getWeaponAtk, getWeaponSubOptionValue } from '../../lib/formula';
import { everyResonatorData } from '../../lib/Resonators';
import { WeaponData, everyWeaponData } from '../../lib/Weapons';
import styles from './WeaponsList.module.css';

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
            const syntonize = weapon.공진;
            const data = everyWeaponData[code] as WeaponData;
            const name = data.getName();
            const rarity = data.rarity;
            const category = data.category;
            const atk1 = data.atk1;
            const subOption = data.subOption;
            const innerLevel = [];
            for (let i = 1; i <= 90; i++) {
              innerLevel.push(
                <option key={i} value={i}>
                  {i}
                </option>
              );
            }
            const nonEquip = (x: ResonatorName | '미장착') => {
              if (x === '미장착') {
                return <option value='미장착'>미장착</option>;
              }
            };
            const thumbnail = (x: ResonatorName | '미장착') => {
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
                  className={styles.card}
                  key={id}
                  data-category={category}
                  style={{ order: (6 - rarity) * 1000 + Number(code[4]) * 100 + 100 - level }}
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
                      <div className={styles.change}>
                        <div className={styles.level}>
                          <span>레벨</span>
                          <select
                            name={id + '_Level'}
                            id={id + '_Level'}
                            defaultValue={level}
                            onChange={(e) => {
                              dispatch(
                                changeWeaponLevel({
                                  id: id as `weapon_${number}`,
                                  level: Number(e.target.value),
                                })
                              );
                            }}
                          >
                            {innerLevel}
                          </select>
                        </div>
                        <div className={styles.syntonize}>
                          <span>공진</span>
                          <select
                            name={id + '_Syntonize'}
                            id={id + '_Syntonize'}
                            defaultValue={syntonize}
                            onChange={(e) => {
                              dispatch(
                                changeSyntonize({
                                  id: id as `weapon_${number}`,
                                  rank: Number(e.target.value) as 1 | 2 | 3 | 4 | 5,
                                })
                              );
                            }}
                          >
                            {[1, 2, 3, 4, 5].map((i) => (
                              <option value={i} key={i}>
                                {i}단계
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.statistics}>
                    <div className={styles.atk}>
                      <span>공격력</span>
                      <span>{getWeaponAtk(atk1)(level)}</span>
                    </div>
                    <div className={styles.subOption}>
                      <span>{getStatsName(subOption)}</span>
                      <span>{getPercent(getWeaponSubOptionValue(atk1, subOption)(level))(2)}</span>
                    </div>
                  </div>
                  <div className={styles.equip}>
                    <span>장착</span>
                    <select
                      name={id}
                      defaultValue={equip}
                      onChange={({ target: { value } }) => {
                        if (value !== '미장착') {
                          dispatch(
                            changeEquip({
                              id: id as WeaponId,
                              equip: value as ResonatorName,
                            })
                          );
                        }
                      }}
                    >
                      {nonEquip(equip)}
                      {Object.keys(myResonators).map((name) => {
                        const resonatorCategory =
                          everyResonatorData[name as ResonatorName].weaponCatergory;
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
