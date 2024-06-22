import { EchoData, echoMainStatsValue0, everyEchoData } from '../../lib/Echoes';
import { State, dispatch } from '../../store';
import { useSelector } from 'react-redux';
import { EchoCost, EchoPrimaryMainStats, EchoSecondaryMainStats, Harmony } from '../../types';
import styles from './EchoesList.module.css';
import { EchoId, EchoSubStatsNumber, MyEcho, changeEchoLevel } from '../../slice/echoesSlice';
import { getPercent } from '../../lib/formula';
import { useState } from 'react';
import { ModalBox } from '..';

export const getSecondaryMainStats = (cost: EchoCost) => {
  if (cost === 1) {
    return 'HP';
  } else {
    return '공격력';
  }
};

export const genByEcho = (info?: MyEcho) => {
  const byEchoPrimaryMain: Record<EchoPrimaryMainStats, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    ice: 0,
    fire: 0,
    electro: 0,
    wind: 0,
    light: 0,
    dark: 0,
    cRate: 0,
    cDmg: 0,
    heal: 0,
  };
  const byEchoSecondaryMain: Record<EchoSecondaryMainStats, number> = {
    HP: 0,
    공격력: 0,
  };
  if (info) {
    const secondaryDataTable = { 5: { 4: 30, 3: 20, 1: 456 }, 4: { 4: 22, 3: 15, 1: 228 } };
    let primary0 = 1;
    let secondary0 = 1;
    const level = info['레벨'];
    const primary = info['메인 스텟'];
    const rarity = info['희귀'];
    const data = everyEchoData[info['코드']];
    if (data) {
      const cost = data.cost;
      primary0 = echoMainStatsValue0[rarity][cost][primary] as number;
      secondary0 = secondaryDataTable[rarity][cost];
      byEchoPrimaryMain[primary] = primary0 * (1 + 0.16 * level);
      byEchoSecondaryMain[getSecondaryMainStats(cost)] = secondary0 * (1 + 0.16 * level);
    }
  }
  return [byEchoPrimaryMain, byEchoSecondaryMain] as const;
};

export default function EchoesList({ selected }: { selected: Harmony }) {
  const filterCost = useSelector((state: State) => state.grobalSlice['filter'].cost);
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코']);

  const [subAddMode, setSubAddMode] = useState<boolean>(false);
  const [echoId, setEchoId] = useState<EchoId>();

  const subAdd = (x: boolean) => {
    if (x) {
      return (
        <ModalBox>
          <div className={styles.container}>
            {echoId}
            <input
              className={styles.cancel}
              type='button'
              value='취소'
              onClick={() => {
                setSubAddMode(false);
              }}
            />
            <input
              className={styles.save}
              type='button'
              value='저장'
              onClick={() => {
                setSubAddMode(false);
              }}
            />
          </div>
        </ModalBox>
      );
    }
    return null;
  };
  return (
    <>
      <section className={styles.container}>
        {Object.entries(myEchoes).map(([id, info]) => {
          if (info) {
            const code = info.코드;
            const data = everyEchoData[code] as EchoData;
            const cost = data.cost;
            const level = info['레벨'];
            const main = info['메인 스텟'];
            const sub = info['서브 스텟'];
            const secondary = getSecondaryMainStats(cost);
            const name = info['이름'];
            const harmony = info['화음'];
            const [byEchoPrimaryMain, byEchoSecondaryMain] = genByEcho(info);

            let innerSub = ([1, 2, 3, 4, 5] as EchoSubStatsNumber[]).map((i) => {
              let innerDiv = <span>&nbsp;</span>;
              if (i <= Math.floor(level / 5)) {
                const subItem = sub[i];
                if (subItem) {
                  innerDiv = (
                    <>
                      <span>· {subItem.stat}</span>
                      <span>{subItem.value}%</span>
                    </>
                  );
                } else {
                  innerDiv = (
                    <input
                      type='button'
                      value='+ 속성 추가'
                      onClick={() => {
                        setEchoId(id as EchoId);
                        setSubAddMode(true);
                      }}
                    />
                  );
                }
              }
              return (
                <div className={styles.subItem} key={i}>
                  {innerDiv}
                </div>
              );
            });

            if (harmony === selected && filterCost[cost]) {
              return (
                <div key={id} className={styles.card}>
                  <div className={styles.header}>
                    <div className={styles.thumbnail}>
                      <img
                        width={7 * 16}
                        src={`${process.env.PUBLIC_URL}/img/Echoes/${code}.png`}
                        alt={name}
                        style={{ backgroundColor: `var(--${info['희귀']}-star)` }}
                      />
                    </div>
                    <div className={styles.info}>
                      <span className={styles.name}>{name}</span>
                      <span className={styles.cost}>COST {cost}</span>
                      <div className={styles.level}>
                        <span
                          onClick={() => {
                            dispatch(changeEchoLevel({ id: id as EchoId, level: level - 1 }));
                          }}
                        >
                          -
                        </span>
                        <span>Lv. {level}</span>
                        <span
                          onClick={() => {
                            dispatch(changeEchoLevel({ id: id as EchoId, level: level + 1 }));
                          }}
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.body}>
                    <div className={styles.main}>
                      <div>
                        <span>{main}</span>
                        <span>{getPercent(byEchoPrimaryMain[main])(2)}</span>
                      </div>
                      <div>
                        <span>{secondary}</span>
                        <span>{byEchoSecondaryMain[secondary].toFixed(1)}</span>
                      </div>
                    </div>
                    <div className={styles.sub}>{innerSub}</div>
                  </div>
                  <div className={styles.footer}>
                    <span>장착</span>
                    <select defaultValue={info.장착?.[0]}>
                      <option value=''>미장착</option>
                      {Object.keys(myResonators).map((name) => {
                        return (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                    <select defaultValue={info.장착?.[1]}>
                      {[1, 2, 3, 4, 5].map((slot) => {
                        return (
                          <option key={slot} value={slot}>
                            {slot}번
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              );
            }
          }
          return null;
        })}
      </section>
      {subAdd(subAddMode)}
    </>
  );
}
