import EchoesAdd from './EchoesAdd';
import { useSelector } from 'react-redux';
import { everyHarmony } from '../../types';
import type { EchoCost } from '../../types';
import { State, dispatch } from '../../store';
import { changeSubPage } from '../../slice/grobalSlice';

export default function Echoes() {
  const subPage = useSelector((state: State) => state.grobalSlice['subPage']);
  let contents;
  if (subPage === '추가') {
    contents = <EchoesAdd />;
  } else {
    // contents = <EchosList />;
  }
  return (
    <main id='Echoes'>
      <div className='filterContainer'>
        <div className='filter'>
          <select name='filterHarmory' id='FilterHarmory'>
            {everyHarmony.map((i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
          <div className='radio'>
            {([4, 3, 1] as EchoCost[]).map((i) => {
              return (
                <span key={i} data-filter='true'>
                  {i} COST
                </span>
              );
            })}
          </div>
        </div>
        <div
          className='addBtn'
          onClick={() => {
            dispatch(changeSubPage('추가'));
          }}
        >
          <span>에코 추가</span>
        </div>
      </div>
      <hr />
      {contents}
    </main>
  );
}
