import { useState } from 'react';
import { dispatch } from '../../store';
import { changeSubPage } from '../../slice/grobalSlice';
import {
  EchoCode,
  EchoCost,
  EchoRarity,
  Statistics,
  Harmony,
  everyEchoMainStatistics1cost,
  everyEchoMainStatistics3cost,
  everyEchoMainStatistics4cost,
  everyHarmony,
  EchoPrimaryMainStats,
} from '../../types';
import { everyEchoData, everyEchoInvertHarmony } from '../../lib/Echoes';
import styles from './EchoesAdd.module.css';
import { addEcho } from '../../slice/echoesSlice';

export default function EchoesAdd() {
  const [rarity, setRarity] = useState<EchoRarity>(5);
  const [cost, setCost] = useState<EchoCost>(3);
  const [harmony, setHarmony] = useState<Harmony>(everyHarmony[0]);
  const [code, setCode] = useState<EchoCode | undefined>();
  const [level, setLevel] = useState<number>(0);
  const [main, setMain] = useState<EchoPrimaryMainStats | undefined>();

  const echoImg = (echoCode?: EchoCode) => {
    if (echoCode) {
      return (
        <img
          src={`${process.env.PUBLIC_URL}/img/Echoes/${echoCode}.png`}
          alt={everyEchoData[echoCode]?.name}
        />
      );
    }
    return undefined;
  };
  const echoLevel = () => {
    let output = [];
    for (let i = 0; i <= 25; i++) {
      output.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return output;
  };
  const mainStats = (x: EchoCost) => {
    switch (x) {
      case 4:
        return everyEchoMainStatistics4cost;
      case 3:
        return everyEchoMainStatistics3cost;
      default:
        return everyEchoMainStatistics1cost;
    }
  };
  const submitBtn = (code?: EchoCode, main?: Statistics) => {
    if (code && main) {
      return (
        <section>
          <input type='submit' value='저장' id={styles.echoAddSubmit} />
        </section>
      );
    }
  };
  return (
    <form
      className={styles.container}
      style={{ maxWidth: '20rem', margin: 'auto' }}
      onSubmit={(e) => {
        e.preventDefault();
        if (code && main) {
          dispatch(addEcho({ code, rarity, level, main, harmony }));
          dispatch(changeSubPage(''));
        }
      }}
    >
      <section className={styles.radio}>
        <div className={styles.rarity}>
          {['★★★★★', '★★★★'].map((i) => {
            const star = i.length;
            let checked = false;
            if (star === rarity) {
              checked = true;
            }
            return (
              <label htmlFor={'rarity' + star} key={i}>
                <span>{i}</span>
                <input
                  checked={checked}
                  type='radio'
                  name='rarity'
                  id={'rarity' + star}
                  value={star}
                  onChange={(e) => {
                    setRarity(Number(e.target.value) as 5 | 4);
                  }}
                />
              </label>
            );
          })}
        </div>
        <div className={styles.cost}>
          {[4, 3, 1].map((i) => {
            let checked = false;
            if (i === cost) {
              checked = true;
            }
            return (
              <label htmlFor={'cost' + i} key={i}>
                <input
                  checked={checked}
                  type='radio'
                  name='cost'
                  id={'cost' + i}
                  value={i}
                  onChange={(e) => {
                    setCost(Number(e.target.value) as EchoCost);
                    setCode(undefined);
                    setMain(undefined);
                  }}
                />
                <span>{i} COST</span>
              </label>
            );
          })}
        </div>
      </section>
      <section className={styles.dropdown}>
        <div className={styles.harmony}>
          <span>화음</span>
          <select
            className={styles.select}
            onChange={(e) => {
              setHarmony(e.target.value as Harmony);
              setCode(undefined);
            }}
          >
            {everyHarmony.map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.name}>
          <span>이름</span>
          <select
            onChange={(e) => {
              setCode(e.target.value as EchoCode);
            }}
          >
            <option value=''>에코 선택</option>
            {Object.values(everyEchoInvertHarmony[harmony][cost]).map((data) => {
              const name = data.name;
              return (
                <option key={name} value={data.code}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <section className={styles.echoCard}>
        <div
          className={styles.echoThumbnail}
          style={{
            backgroundColor: 'color-mix(in srgb, var(--' + rarity + '-star) 80%, transparent)',
          }}
        >
          {echoImg(code)}
        </div>
        <div className={styles.selector}>
          <div className={styles.level}>
            <span>Lv.</span>
            <select
              name='level'
              defaultValue={level}
              onChange={(e) => {
                setLevel(Number(e.target.value));
              }}
            >
              {echoLevel()}
            </select>
          </div>
          <div className={styles.main}>
            <span>메인 스텟</span>
            <select
              name='main'
              defaultValue={main}
              onChange={(e) => {
                setMain(e.target.value as EchoPrimaryMainStats);
              }}
            >
              <option value=''>-</option>
              {mainStats(cost).map((i) => {
                return (
                  <option value={i} key={i}>
                    {i}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </section>
      {submitBtn(code, main)}
      {/* <div>
        <div>echo_{Math.floor((9 * Math.random() + 1) * 100000000)}</div>
      </div> */}
    </form>
  );
}
