import { dispatch } from '../../store';
import { changeElement } from '../../slice/resonatorsSlice';
import styles from './RoverChangeElement.module.css';

export function RoverChangeElement() {
  return (
    <section className={styles.changeElement}>
      <div>
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
                  <span>{i}</span>
                </div>
              );
          }
          return null;
        })}
      </div>
    </section>
  );
}
