import { useSelector } from 'react-redux';
import { addResonator } from '../../slice/resonatorsSlice';
import { State, dispatch } from '../../store';
import { everyResonatorNameWithoutRover } from '../../types';
import { changeSubPage } from '../../slice/grobalSlice';
import styles from './ResonatorsAdd.module.css';

export default function ResonatorsAdd() {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  return (
    <section id='ResonatorsAdd' className={styles.container}>
      {everyResonatorNameWithoutRover
        .filter((name) => {
          if (!Object.keys(myResonators).includes(name)) {
            return true;
          }
          return false;
        })
        .map((name) => {
          return (
            <div
              key={name}
              className={styles.card}
              onClick={() => {
                dispatch(addResonator(name));
                dispatch(changeSubPage(''));
              }}
            >
              <img
                className={styles.img}
                src={process.env.PUBLIC_URL + '/img/Resonators/' + name + '.png'}
                alt={name}
              />
              <div className={styles.name}>{name}</div>
            </div>
          );
        })}
    </section>
  );
}
