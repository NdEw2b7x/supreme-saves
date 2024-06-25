import { useState } from 'react';
import { Thumbnail, genByEcho } from '..';
import EchoesListCardHeader from './CardHeader';
import EchoesListSubAddModal from './EchoesListSubAddModal';
import EquipModal from './EquipModal';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { EchoId, EchoSubStatsId } from '../../slice/echoesSlice';
import {
  EchoCost,
  EchoSecondaryMainStats,
  ResonatorName,
  Harmony,
  getStatsName,
} from '../../types';
import { getPercent } from '../../lib/formula';
import { EchoData, everyEchoData } from '../../lib/Echoes';
import styles from './EchoesList.module.css';

export const getSecondaryMainStats: (cost: EchoCost) => EchoSecondaryMainStats = (
  cost: EchoCost
) => {
  if (cost === 1) {
    return 'flatHp';
  } else {
    return 'flatAtk';
  }
};

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
            const [byEchoMain] = genByEcho(info);

            const equipThumbnail = (x: ResonatorName | '미장착') => {
              if (x !== '미장착') {
                return <Thumbnail scope='Resonators' code={x} key={'equip-' + x} />;
              }
            };
            if (filterCost[cost]) {
              if (filterHarmony === harmony || filterHarmony === undefined) {
                return (
                  <div
                    key={id}
                    className={styles.card}
                    style={{
                      order: `${(6 - info['희귀']) * 100 + 25 - info['레벨']}`,
                      position: 'relative',
                    }}
                  >
                    <EchoesListCardHeader id={id as EchoId} info={info} cost={cost} />

                    <div className={styles.body}>
                      <div className={styles.main}>
                        <div>
                          <span>{getStatsName(main)}</span>
                          <span>{getPercent(byEchoMain[main])(2)}</span>
                        </div>
                        <div>
                          <span>{getStatsName(secondary)}</span>
                          <span>{byEchoMain[secondary].toFixed(1)}</span>
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
