import { Thumbnail } from '..';
import { dispatch } from '../../store';
import { EchoId, MyEcho, changeEchoLevel } from '../../slice/echoesSlice';
import { EchoCost } from '../../types';
import { useState } from 'react';
import styles from './CardHeader.module.css';

export default function EchoesListCardHeader({
  id,
  info,
  cost,
}: {
  id: EchoId;
  info: MyEcho;
  cost: EchoCost;
}) {
  const [quick, setQuick] = useState(<></>);
  const level = info['레벨'];
  const rarity = info['희귀'];
  return (
    <>
      <div className={styles.header}>
        <div className={styles.thumbnail} style={{ backgroundColor: `var(--${rarity}-star)` }}>
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
            <span
              onClick={() => {
                setQuick(
                  <div className={styles.quickChangeLevel}>
                    {([0, 5, 10, 15, 20, 25] as const).map((level) => {
                      return (
                        <div
                          key={level}
                          onClick={() => {
                            dispatch(changeEchoLevel({ id, level }));
                            setQuick(<></>);
                          }}
                        >
                          <span>{level}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            >
              Lv. {level}
            </span>
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
      {quick}
    </>
  );
}
