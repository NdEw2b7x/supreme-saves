import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { EchoId, EchoSubStatsId, MyEcho, changeEchoLevel } from '../../slice/echoesSlice';
import {
  EchoCost,
  EchoMainStats,
  EchoSecondaryMainStats,
  Harmony,
  getStatsName,
} from '../../types';
import { ModalBox, Thumbnail } from '..';
import EchoesListSubAddModal from './EchoesListSubAddModal';
import { EchoData, getEchoMainValue0, everyEchoData } from '../../lib/Echoes';
import { getPercent } from '../../lib/formula';
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
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코']);

  const [subAddMode, setSubAddMode] = useState<boolean>(false);
  const [equipMode, setEquipMode] = useState<boolean>(false);
  const [subSlot, setSubSlot] = useState<EchoSubStatsId>('s1');
  const [echoId, setEchoId] = useState<EchoId>('echo_0');

  const changeEquip = (x: boolean) => {
    if (x) {
      return (
        <ModalBox key='EchoEquip'>
          <div className={styles.equipHeader}>
            <div>장착할 공명자</div>
            <select name='' id=''>
              {Object.keys(myResonators).map((name) => {
                return (
                  <option value={name} key={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.equipBody}>
            장착할 슬롯
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
          </div>
          <div className={styles.equipFooter}>
            <input
              type='button'
              className={styles.save}
              value='확인'
              onClick={() => {
                setEquipMode(false);
              }}
            />
            <input
              type='button'
              className={styles.cancel}
              value='취소'
              onClick={() => {
                setEquipMode(false);
              }}
            />
          </div>
        </ModalBox>
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
            subSlotNumber={Number(subSlot[1]) as 1 | 2 | 3 | 4 | 5}
            myEcho={myEcho}
            close={() => {
              setSubAddMode(false);
            }}
          />
        );
      }
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
            const harmony = info['화음'];
            const byEcho = genByEcho(info);
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
                                      setSubSlot(`s${i}` as EchoSubStatsId);
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
                          setEquipMode(true);
                        }}
                      >
                        {info['장착']['공명자']}
                      </div>
                      {/* <select
            className={styles.equipName}
            defaultValue={info['장착']['공명자']}
            onChange={({ target: { value } }) => {
              dispatch(
                changeEquip({ id: id as EchoId, equip: value as EveryResonatorName })
              );
            }}
          >
            {Object.keys(myResonators).map((name) => {
              return (
                <option value={name} key={name}>
                  {name}
                </option>
              );
            })}
          </select> */}
                      <div className={styles.equipThumbnail}>
                        <Thumbnail scope='Resonators' code='음림' key='df' />
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
      {changeEquip(equipMode)}
    </>
  );
}
