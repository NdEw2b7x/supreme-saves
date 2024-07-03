import { State, dispatch } from '../../store';
import { useSelector } from 'react-redux';
import { changeSubPage } from '../../slice/grobalSlice';
import { changeElement } from '../../slice/resonatorsSlice';
import { Element, mapElement } from '../../types';
import styles from './RoverChangeElement.module.css';

export function RoverChangeElement() {
  const element = useSelector((state: State) => state.resonatorsSlice.element);
  return (
    <section className={styles.changeElement}>
      <div>
        {(['light', 'dark'] as Element[]).map((i) => (
          <div
            key={i}
            data-selected={i === element}
            onClick={() => {
              dispatch(changeElement(i));
              dispatch(changeSubPage(undefined));
            }}
          >
            <span>{mapElement[i]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
