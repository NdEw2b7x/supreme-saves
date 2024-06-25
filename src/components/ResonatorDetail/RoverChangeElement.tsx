import { dispatch } from '../../store';
import styles from './ResonatorDetail.module.css';
import { ResonatorName } from '../../types';
import { changeElement } from '../../slice/resonatorsSlice';

export function RoverChangeElement({ name }: { name: ResonatorName }) {
  if (name === '방랑자') {
    return (
      <section className={styles.changeElement}>
        {['회절', '인멸'].map((i) => {
          switch (i) {
            case '회절':
            case '인멸':
              const current = localStorage.getItem('방랑자_속성');
              let selected = false;
              if (current) {
                if (i === JSON.parse(current)) {
                  selected = true;
                }
              }
              return (
                <div
                  key={i}
                  data-selected={selected}
                  onClick={() => {
                    dispatch(changeElement(i));
                  }}
                >
                  {i}
                </div>
              );
          }
          return null;
        })}
      </section>
    );
  }
  return <></>;
}
