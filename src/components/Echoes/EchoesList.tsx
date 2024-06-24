import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { EchoId, EchoSubStatsId, MyEcho, changeEchoLevel } from '../../slice/echoesSlice';
import {
  EchoCost,
  EchoMainStats,
  EchoSecondaryMainStats,
  EveryResonatorName,
  Harmony,
  getStatsName,
} from '../../types';
import { Thumbnail } from '..';
import EchoesListSubAddModal from './EchoesListSubAddModal';
import { EchoData, getEchoMainValue0, everyEchoData } from '../../lib/Echoes';
import { getPercent } from '../../lib/formula';
import styles from './EchoesList.module.css';
import EquipModal from './EquipModal';

export const getSecondaryMainStats: (cost: EchoCost) => EchoSecondaryMainStats = (
  cost: EchoCost
) => {
  if (cost === 1) {
    return 'flatHp';
  } else {
    return 'flatAtk';
  }
};

export const genByEcho = (info?: MyEcho) => {
  const byEchoMain: Record<EchoMainStats, number> = {
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
    flatHp: 0,
    flatAtk: 0,
  };
  if (info) {
    const lv = info['레벨'];
    const p = info['메인 스텟'];
    const r = info['희귀'];
    const data = everyEchoData[info['코드']];
    if (data) {
      const c = data.cost;
      const [p0, s0] = getEchoMainValue0(r)(c)(p);
      byEchoMain[p] = p0 * (1 + 0.16 * lv);
      byEchoMain[getSecondaryMainStats(c)] = s0 * (1 + 0.16 * lv);
    }
  }
  return byEchoMain;
};

function EchoesListCardHeader({ id, info, cost }: { id: EchoId; info: MyEcho; cost: EchoCost }) {
  const level = info['레벨'];
  return (
    <div className={styles.header}>
      <div className={styles.thumbnail} style={{ backgroundColor: `var(--${info['희귀']}-star)` }}>
        <Thumbnail scope='Echoes' code={info['코드']} key={info['코드']} />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{info['이름']}</span>
        <span className={styles.cost}>COST {cost}</span>
        <div className={styles.level}>
          <span
            onClick={() => {
              dispatch(changeEchoLevel({ id, level: level - 1 }));
            }}
          >
            -
          </span>
          <span>Lv. {level}</span>
          <span
            onClick={() => {
              dispatch(changeEchoLevel({ id, level: level + 1 }));
            }}
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
}

export default function EchoesList({ filterHarmony }: { filterHarmony?: Harmony }) {
  const filterCost = useSelector((state: State) => state.grobalSlice['filter'].cost);
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코']);

  const [subAddMode, setSubAddMode] = useState<boolean>(false);
  const [subStatNumber, setStatNumber] = useState<EchoSubStatsId>('s1');
  const [echoId, setEchoId] = useState<EchoId>('echo_0');

  const [equipMode, setEquipMode] = useState<boolean>(false);

  const changeEquipModal = (x: boolean) => {
    if (x) {
      return (
        <EquipModal
          id={echoId}
          close={() => {
            setEquipMode(false);
          }}
        />
      );
    }
  };
  const subAddModal = (x: boolean) => {
    if (x) {
      const myEcho = myEchoes[echoId];
      if (myEcho) {
        return (
          <EchoesListSubAddModal
            id={echoId}
            subSlotNumber={Number(subStatNumber[1]) as 1 | 2 | 3 | 4 | 5}
            myEcho={myEcho}
            close={() => {
              setSubAddMode(false);
            }}
          />
        );
      }
    }
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
            const harmony = info['화음'];
            const byEcho = genByEcho(info);

            const equipThumbnail = (x: EveryResonatorName | '미장착') => {
              if (x !== '미장착') {
                return <Thumbnail scope='Resonators' code={x} key={'equip-' + x} />;
              }
            };
            if (filterCost[cost]) {
              if (filterHarmony === harmony || filterHarmony === undefined) {
                return (
                  <div key={id} className={styles.card}>
                    <EchoesListCardHeader id={id as EchoId} info={info} cost={cost} />
                    <div className={styles.body}>
                      <div className={styles.main}>
                        <div>
                          <span>{getStatsName(main)}</span>
                          <span>{getPercent(byEcho[main])(2)}</span>
                        </div>
                        <div>
                          <span>{getStatsName(secondary)}</span>
                          <span>{byEcho[secondary].toFixed(1)}</span>
                        </div>
                      </div>
                      <div className={styles.sub}>
                        {([1, 2, 3, 4, 5] as const).map((i) => {
                          let innerDiv = <span>&nbsp;</span>;
                          if (i <= Math.floor(level / 5)) {
                            const subItem = sub[`s${i}`];
                            if (subItem) {
                              const value = subItem.value;
                              let resultV;
                              if (value > 1) {
                                resultV = value;
                              } else {
                                resultV = getPercent(value)(1);
                              }
                              innerDiv = (
                                <>
                                  <span>· {getStatsName(subItem.stat)}</span>
                                  <span>{resultV}</span>
                                </>
                              );
                            } else {
                              innerDiv = (
                                <>
                                  <span
                                    className={styles.addSubBtn}
                                    onClick={() => {
                                      setEchoId(id as EchoId);
                                      setStatNumber(`s${i}` as EchoSubStatsId);
                                      setSubAddMode(true);
                                    }}
                                  >
                                    + 속성 추가
                                  </span>
                                </>
                              );
                            }
                          }
                          return (
                            <div className={styles.subItem} key={i}>
                              {innerDiv}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className={styles.footer}>
                      <div className={styles.equipTag}>장착</div>
                      <div
                        className={styles.equipName}
                        onClick={() => {
                          setEchoId(id as EchoId);
                          setEquipMode(true);
                        }}
                      >
                        {info['장착']['공명자']}
                      </div>
                      <div className={styles.equipThumbnail}>
                        {equipThumbnail(info['장착']['공명자'])}
                      </div>
                    </div>
                  </div>
                );
              }
            }
          }
          return null;
        })}
      </section>
      {subAddModal(subAddMode)}
      {changeEquipModal(equipMode)}
    </>
  );
}
