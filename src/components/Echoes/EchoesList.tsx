import { EchoData, getEchoMainValue0, everyEchoData } from '../../lib/Echoes';
import { State, dispatch } from '../../store';
import { useSelector } from 'react-redux';
import {
  EchoCost,
  EchoMainStats,
  EchoSecondaryMainStats,
  EchoSubStats,
  Harmony,
  getStatsName,
} from '../../types';
import {
  EchoId,
  EchoSubStatsNumber,
  MyEcho,
  changeEchoLevel,
  changeSubStat,
} from '../../slice/echoesSlice';
import { getPercent } from '../../lib/formula';
import { useState } from 'react';
import { ModalBox } from '..';
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

export default function EchoesList({ selected }: { selected: Harmony }) {
  const filterCost = useSelector((state: State) => state.grobalSlice['filter'].cost);
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코']);

  const [subAddMode, setSubAddMode] = useState<boolean>(false);
  const [echoId, setEchoId] = useState<EchoId>('echo_0');
  const [subSlot, setSubSlot] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedSubStat, setSelectdSubStat] = useState<EchoSubStats>('hp');
  const [selectedSubValue, setSelectdSubValue] = useState<number>(0);

  const getSubValues = (x: EchoSubStats) => {
    switch (x) {
      case 'flatHp':
        return [320, 360, 390, 430, 470, 510, 540, 580];
      case 'flatAtk':
        return [30, 40, 50];
      case 'flatDef':
        return [40, 50, 60];
      case 'def':
        return [0.081, 0.09, 0.1, 0.109, 0.118, 0.128, 0.138, 0.147];
      case 'energy':
        return [0.068, 0.076, 0.084, 0.092, 0.1, 0.108, 0.116, 0.124];
      case 'cRate':
        return [0.063, 0.069, 0.075, 0.081, 0.087, 0.093, 0.099, 0.105];
      case 'cDmg':
        return [0.126, 0.138, 0.15, 0.162, 0.174, 0.186, 0.198, 0.21];
      default:
        return [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116];
    }
  };

  const subAdd = (x: boolean) => {
    if (x) {
      if (echoId) {
      }
      return (
        <ModalBox>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>{subSlot}번 서브 속성</div>
            <div className={styles.modalBody}>
              <div className={styles.statsBox}>
                {(
                  [
                    ['flatHp', 'flatAtk', 'flatDef'],
                    ['hp', 'atk', 'def'],
                    ['energy', 'cRate', 'cDmg'],
                    ['normal', 'heavy'],
                    ['skill', 'burst'],
                  ] as EchoSubStats[][]
                ).map((r) => {
                  return (
                    <div className={styles.statsBoxRow} key={r[0] + '~' + r[-1]}>
                      {r.map((stat) => {
                        const defaultcheck = (x: EchoSubStats) => {
                          if (selectedSubStat === x) {
                            return true;
                          } else {
                            return false;
                          }
                        };
                        return (
                          <label htmlFor={'new' + stat} key={stat}>
                            <span>{getStatsName(stat)}</span>
                            <input
                              type='radio'
                              name='newSub'
                              id={'new' + stat}
                              defaultChecked={defaultcheck(stat)}
                              value={stat}
                              onChange={(e) => {
                                setSelectdSubStat(e.target.value as EchoSubStats);
                              }}
                            />
                          </label>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className={styles.valueBox}>
                <span>값</span>
                <select
                  onChange={(e) => {
                    setSelectdSubValue(Number(e.target.value));
                  }}
                >
                  <option value=''>-</option>
                  {getSubValues(selectedSubStat).map((i) => {
                    const n = Number(i);
                    if (n > 1) {
                      return (
                        <option value={i} key={i}>
                          {n}
                        </option>
                      );
                    }
                    return (
                      <option value={i} key={i}>
                        {getPercent(i)(1)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
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
                  if (selectedSubValue > 0) {
                    dispatch(
                      changeSubStat({
                        id: echoId,
                        slot: subSlot,
                        stat: selectedSubStat,
                        value: selectedSubValue,
                      })
                    );
                    setSubAddMode(false);
                  } else {
                    alert('값을 선택해주세요.');
                  }
                }}
              />
            </div>
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
            const byEcho = genByEcho(info);

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
                        <span>{getStatsName(main)}</span>
                        <span>{getPercent(byEcho[main])(2)}</span>
                      </div>
                      <div>
                        <span>{getStatsName(secondary)}</span>
                        <span>{byEcho[secondary].toFixed(1)}</span>
                      </div>
                    </div>
                    <div className={styles.sub}>
                      {([1, 2, 3, 4, 5] as EchoSubStatsNumber[]).map((i) => {
                        let innerDiv = <span>&nbsp;</span>;
                        if (i <= Math.floor(level / 5)) {
                          const subItem = sub[i];
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
                                    setSubSlot(i);
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
