import { useSelector } from 'react-redux';
import { addResonator } from '../../slice/resonatorsSlice';
import { State, dispatch } from '../../store';
import { everyResonatorNameWithoutRover } from '../../types';
import { changeSubPage } from '../../slice/grobalSlice';

export default function ResonatorsAdd() {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  return (
    <div id='ResonatorsAdd' className='functional grid'>
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
              style={{ display: 'flex' }}
              onClick={() => {
                dispatch(addResonator(name));
                dispatch(changeSubPage(''));
              }}
            >
              <img
                src={process.env.PUBLIC_URL + '/img/Resonators/' + name + '.png'}
                alt={name + '.png'}
              />
              <div className='resonators name'>{name}</div>
            </div>
          );
        })}
    </div>
  );
}
