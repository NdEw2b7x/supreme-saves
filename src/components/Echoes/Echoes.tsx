import { everyHarmory } from '../../types';

export default function Echoes() {
  return (
    <main id='Echoes'>
      <div className='filterContainer'>
        <div className='filter'>
          <select name='filterHarmory' id='FilterHarmory'>
            {everyHarmory.map((i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
          <div className='radio'>
            {[4, 3, 1].map((i) => {
              return (
                <span key={i} data-filter='true'>
                  {i} COST
                </span>
              );
            })}
          </div>
        </div>
        <div className='addBtn'>
          <span>에코 추가</span>
        </div>
      </div>
      <hr />
      <div>
        <div>echo_{Math.floor((9 * Math.random() + 1) * 100000000)}</div>
        <div>list</div>
      </div>
    </main>
  );
}
