import { dispatch } from '../../store';
import styles from './ResonatorDetail.module.css';
import { EveryChain, ResonatorName } from '../../types';
import { MyResonator, changeChain } from '../../slice/resonatorsSlice';
import Chain from '../icons/Chain';

export function DetailChain({
  name,
  myResonator,
}: {
  name: ResonatorName;
  myResonator: MyResonator;
}) {
  return (
    <div className={styles.chain}>
      <div className={styles.chainNodes}>
        {([1, 2, 3, 4, 5, 6] as const).map((i) => {
          const chainNumber: EveryChain = myResonator.체인;
          let s = 'chainTrue';
          let c = 'var(--theme-color)';
          if (chainNumber < i) {
            s = 'chainFalse';
            c = 'var(--theme-color-alpha-400)';
          }
          return (
            <div
              className={styles[s]}
              key={i}
              onClick={() => {
                let value: EveryChain = i;
                if (i === chainNumber) {
                  value = (chainNumber - 1) as 0 | 1 | 2 | 3 | 4 | 5;
                }
                dispatch(changeChain({ name, chain: value as EveryChain }));
              }}
            >
              <Chain fill={c} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
