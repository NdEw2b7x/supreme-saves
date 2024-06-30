import { useState } from 'react';
import { Thumbnail } from '..';
import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import {
  MyWeapon,
  WeaponId,
  changeEquip,
  changeSyntonize,
  changeWeaponLevel,
  changeWeaponRank,
} from '../../slice/weaponsSlice';
import { Rank, ResonatorName, Syntonize, getStatsName } from '../../types';
import { getPercent, getWeaponAtk, getWeaponSubOptionValue } from '../../lib/formula';
import { everyResonatorData } from '../../lib/Resonators/';
import { everyWeaponData } from '../../lib/Weapons';
import styles from './WeaponsList.module.css';

function ListCard({
  myWeapon: { 식별: id, 코드: code, 레벨: level, 돌파: rank, 공진: syntonize, 장착: equipped },
}: {
  myWeapon: MyWeapon;
}) {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);

  const [mode, setMode] = useState<'level' | 'rank' | 'syntonize' | 'none'>();

  const data = everyWeaponData[code];
  const name = data.getName();
  const rarity = data.rarity;
  const category = data.category;
  const atk1 = data.atk1;
  const subOption = data.subOption;
  const genLv = (min: number, max: number) => {
    let output = [];
    for (let level = min; level <= max; level++) {
      output.push(
        <span
          key={level}
          onClick={() => {
            setMode('none');
            dispatch(
              changeWeaponLevel({
                id,
                level,
              })
            );
          }}
        >
          {level}
        </span>
      );
    }
    return output;
  };
  const genRank = () => {
    let output = [];
    for (let i = 0; i <= 6; i++) {
      output.push(
        <span
          key={i}
          onClick={() => {
            setMode('none');
            dispatch(
              changeWeaponRank({
                id,
                rank: i as Rank,
              })
            );
          }}
        >
          {i}
        </span>
      );
    }
    return output;
  };
  const genSyntonize = () => {
    let output = [];
    for (let i = 1; i <= 5; i++) {
      output.push(
        <span
          key={i}
          onClick={() => {
            setMode('none');
            dispatch(
              changeSyntonize({
                id,
                syntonize: i as Syntonize,
              })
            );
          }}
        >
          공진 {i}단계
        </span>
      );
    }
    return output;
  };
  return (
    <div
      className={styles.card}
      key={id}
      data-category={category}
      style={{ order: (6 - rarity) * 1000 + Number(code[4]) * 100 + 100 - level }}
    >
      <div className={styles.body}>
        <div className={styles.imgBox}>
          <Thumbnail scope='Weapons' code={code} key={everyWeaponData[code].name} />
        </div>
        <div className={styles.infoBox}>
          <div
            className={styles.name}
            style={{
              backgroundColor: 'var(--' + rarity + '-star)',
            }}
          >
            <span>{name}</span>
          </div>
          <div className={styles.stats}>
            <div className={styles.atk}>
              <span>공격력</span>
              <span>{getWeaponAtk({ level, rank, code })}</span>
            </div>
            <div className={styles.subOption}>
              <span>{getStatsName(subOption)}</span>
              <span>{getPercent(getWeaponSubOptionValue(atk1, subOption)(level))(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.control}>
        <div className={styles.level}>
          <span
            onClick={() => {
              setMode('level');
            }}
          >
            Lv. {level}/
            {rank === 6
              ? 90
              : rank === 5
              ? 80
              : rank === 4
              ? 70
              : rank === 3
              ? 60
              : rank === 2
              ? 50
              : rank === 1
              ? 40
              : 20}
          </span>
          {mode === 'level' ? (
            <div>
              {genLv(
                rank === 6
                  ? 80
                  : rank === 5
                  ? 70
                  : rank === 4
                  ? 60
                  : rank === 3
                  ? 50
                  : rank === 2
                  ? 40
                  : rank === 1
                  ? 20
                  : 1,
                rank === 6
                  ? 90
                  : rank === 5
                  ? 80
                  : rank === 4
                  ? 70
                  : rank === 3
                  ? 60
                  : rank === 2
                  ? 50
                  : rank === 1
                  ? 40
                  : 20
              )}
            </div>
          ) : undefined}
        </div>
        <div className={styles.rank}>
          <span
            onClick={() => {
              setMode('rank');
            }}
          >
            Rank. {rank}
          </span>
          {mode === 'rank' ? <div>{genRank()}</div> : undefined}
        </div>
        <div className={styles.syntonize}>
          <span
            onClick={() => {
              setMode('syntonize');
            }}
          >
            공진 {syntonize}단계
          </span>
          {mode === 'syntonize' ? <div>{genSyntonize()}</div> : undefined}
        </div>
      </div>
      <div className={styles.equip}>
        <span>장착</span>
        <select
          name={id}
          defaultValue={equipped}
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
          {equipped === '' ? <option value='미장착'>미장착</option> : undefined}
          {Object.keys(myResonators).map((name) => {
            const resonatorCategory = everyResonatorData[name as ResonatorName].weaponCatergory;
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
          {equipped !== '' ? <Thumbnail scope='Resonators' code={equipped} /> : undefined}
        </div>
      </div>
    </div>
  );
}

export default function WeaponsList() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  return (
    <section id='WeaponsList' className={styles.container}>
      {myWeapons.map((myWeapon) => {
        const data = everyWeaponData[myWeapon['코드']];
        return filters.rarity[data.rarity] && filters.weaponCategory[data.category] ? (
          <ListCard myWeapon={myWeapon} />
        ) : undefined;
      })}
    </section>
  );
}
