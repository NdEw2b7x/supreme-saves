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
import { everyResonatorData } from '../../lib/Resonators/';
import { everyWeaponData } from '../../lib/Weapons';
import styles from './WeaponsList.module.css';
import Thumbnail from '../Thumbnail';
import { SelectNumber } from '..';

export default function WeaponsList() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const filterR = filters.rarity;
  const filterW = filters.weaponCategory;

  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);

  return (
    <section id='WeaponsList' className={styles.container}>
      {myWeapons.map(({ 식별: id, 코드: code, 레벨: level, 공진, 장착 }) => {
        const data = everyWeaponData[code];
        const name = data.getName();
        const rarity = data.rarity;
        const category = data.category;
        const atk1 = data.atk1;
        const subOption = data.subOption;
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
                <span>{name}</span>
              </div>
              <div className={styles.body}>
                <div className={styles.imgBox}>
                  <img src={process.env.PUBLIC_URL + '/img/Weapons/' + code + '.png'} alt={name} />
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.change}>
                    <div className={styles.level}>
                      <span>레벨</span>
                      <SelectNumber
                        min={1}
                        max={90}
                        defaultValue={level}
                        onChange={(level) => {
                          dispatch(changeWeaponLevel({ id, level }));
                        }}
                      />
                    </div>
                    <div className={styles.syntonize}>
                      <span>공진</span>
                      <select
                        name={id + '_Syntonize'}
                        id={id + '_Syntonize'}
                        defaultValue={공진}
                        onChange={(e) => {
                          dispatch(
                            changeSyntonize({
                              id: id as `weapon_${number}`,
                              syntonize: Number(e.target.value) as 1 | 2 | 3 | 4 | 5,
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
                  defaultValue={장착}
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
                  {장착 === '' ? <option value='미장착'>미장착</option> : undefined}
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
                <div className={styles.thumbnail}>
                  {장착 !== '' ? <Thumbnail scope='Resonators' code={장착} /> : undefined}
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
