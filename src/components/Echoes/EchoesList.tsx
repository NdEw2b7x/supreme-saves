import { EchoData, everyEchoData } from '../../lib/Echoes';
import { State, dispatch } from '../../store';
import { useSelector } from 'react-redux';
import { EchoCost, EchoPrimaryMainStats, EchoSecondaryMainStats, Harmony } from '../../types';
import styles from './EchoesList.module.css';
import { EchoId, MyEcho, changeEchoLevel } from '../../slice/echoesSlice';

export const getSecondaryMain = (cost: EchoCost) => {
  if (cost === 1) {
    return 'HP';
  } else {
    return '공격력';
  }
};

export const genByEcho = (info?: MyEcho) => {
  const byEchoPrimaryMain: Record<EchoPrimaryMainStats, number> = {
    'HP%': 0,
    '공격력%': 0,
    '방어력%': 0,
    '공명 효율': 0,
    '응결 피해 보너스': 0,
    '용융 피해 보너스': 0,
    '전도 피해 보너스': 0,
    '기류 피해 보너스': 0,
    '회절 피해 보너스': 0,
    '인멸 피해 보너스': 0,
    '크리티컬 확률': 0,
    '크리티컬 피해': 0,
    '치료 효과 보너스': 0,
  };
  const byEchoSecondaryMain: Record<EchoSecondaryMainStats, number> = {
    HP: 0,
    공격력: 0,
  };
  if (info) {
    const level = info['레벨'];
    const main = info['메인 스텟'];
    switch (info['희귀']) {
      case 4:
        break;

      default:
        byEchoPrimaryMain[main] = level * 10;
        break;
    }
  }
  return [byEchoPrimaryMain, byEchoSecondaryMain];
};

export default function EchoesList({ selected }: { selected: Harmony }) {
  const filterCost = useSelector((state: State) => state.grobalSlice['filter'].cost);
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코']);
  return (
    <section className={styles.container}>
      {Object.entries(myEchoes).map(([id, info]) => {
        if (info) {
          const code = info.코드;
          const data = everyEchoData[code] as EchoData;
          const cost = data.cost;
          const level = info['레벨'];
          const name = info['이름'];
          const harmony = info['화음'];

          if (harmony === selected && filterCost[cost]) {
            return (
              <div key={id} className={styles.card}>
                <div className={styles.header}>
                  <div className={styles.thumbnail}>
                    <img
                      width={8 * 16}
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
                      <span>{info['메인 스텟']}</span>
                      <span>40%</span>
                    </div>
                    <div>
                      <span>{getSecondaryMain(cost)}</span>
                      <span>345</span>
                    </div>
                  </div>
                  <div className={styles.sub}>
                    <div>fsf{info['서브 스텟'][1]?.stat}</div>
                    <div>{Math.floor(info.레벨 / 5)}</div>
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
  );
}
