import { EchoCost, Harmony, everyHarmony } from '../../types';
import { EchoCode, everyEchoData, everyEchoInvertHarmony } from '../../lib/Echoes';
import { useState } from 'react';
import styles from './EchoesAdd.module.css';
import { getCost } from '../../types/everyEcho';

console.log(everyEchoInvertHarmony);

export default function EchoesAdd() {
  const [harmony, setHarmony] = useState<Harmony>(everyHarmony[0]);
  const [cost, setCost] = useState<4 | 3 | 1>(4);
  const [rarity, setRarity] = useState<5 | 4>(5);
  const [code, setCode] = useState<EchoCode | undefined>();

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
  const echoDangerous = (echoCode?: EchoCode) => {
    if (echoCode) {
      return everyEchoData[echoCode]?.dangerous + '급';
    }
    return undefined;
  };
  return (
    <form className={styles.container}>
      <div className={styles.dropdown}>
        <div className={styles.harmony}>
          <span>화음</span>
          <select
            className={styles.select}
            name='HarmonySelector'
            id='HarmonySelector'
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
      </div>
      <div className={styles.radio}>
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
                  name='echoCost'
                  id={'cost' + i}
                  value={i}
                  onChange={(e) => {
                    setCost(Number(e.target.value) as EchoCost);
                    setCode(undefined);
                  }}
                />
                <span>{i} COST</span>
              </label>
            );
          })}
        </div>
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
                  name='echoRarity'
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
      </div>
      <div className={styles.echoCard}>
        <div className={styles.echoThumbnail}>{echoImg(code)}</div>
        <div className={styles.echoSelector}>
          <select
            onChange={(e) => {
              setCode(e.target.value as EchoCode);
            }}
          >
            <option value=''>에코 선택</option>
            {Object.values(everyEchoInvertHarmony[harmony][cost])
              .filter((i) => {
                return cost === getCost(i.dangerous);
              })
              .map((data) => {
                const name = data.name;
                return (
                  <option key={name} value={data.code}>
                    {name}
                  </option>
                );
              })}
          </select>
          <div>{echoDangerous(code)}</div>
        </div>
      </div>
      {/* <div>
        <div>echo_{Math.floor((9 * Math.random() + 1) * 100000000)}</div>
      </div> */}
    </form>
  );
}
