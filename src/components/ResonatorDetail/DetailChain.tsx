import { dispatch } from '../../store';
import { MyResonator, changeChain } from '../../slice/resonatorsSlice';
import { EveryChain } from '../../types';
import Chain from '../icons/Chain';
import styles from './ResonatorDetail.module.css';

export function DetailChain({ myResonator }: { myResonator: MyResonator }) {
  return (
    <div className={styles.chain}>
      <div className={styles.chainNodes}>
        {([1, 2, 3, 4, 5, 6] as const).map((i) => {
          const chainNumber: EveryChain = myResonator['체인'];
          return (
            <div
              className={styles[chainNumber < i ? 'chainFalse' : 'chainTrue']}
              key={i}
              onClick={() => {
                let chain: EveryChain = i;
                if (i === chainNumber) {
                  chain = (chainNumber - 1) as 0 | 1 | 2 | 3 | 4 | 5;
                }
                dispatch(changeChain({ code: myResonator['코드'], chain }));
              }}
            >
              <Chain
                fill={chainNumber < i ? 'var(--theme-color-alpha-400)' : 'var(--theme-color)'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
