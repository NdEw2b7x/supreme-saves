import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { changeSubPage, changefilter } from '../../slice/grobalSlice';
import { everyElement, everyWeaponCategory } from '../../types';
import ResonatorsAdd from './ResonatorsAdd';
import ResonatorsList from './ResonatorsList';

export default function Resonators() {
  const subPage = useSelector((state: State) => state.grobalSlice.subPage);
  const filters = useSelector((state: State) => state.grobalSlice.filter);

  let contents = <ResonatorsList />;
  if (subPage === '추가') {
    contents = <ResonatorsAdd />;
  }
  return (
    <main id='Resonators'>
      <div className='filterContainer'>
        <div className='filter'>
          <div className='radio'>
            {everyElement.map((i) => {
              const filter = filters.element;
              return (
                <span
                  key={i}
                  data-filter={filter[i]}
                  onClick={() => {
                    dispatch(changefilter({ filter: 'element', item: i }));
                  }}
                >
                  {i}
                </span>
              );
            })}
          </div>
          <div className='radio'>
            {everyWeaponCategory.map((i) => {
              const filter = filters.weaponCategory;
              return (
                <span
                  key={i}
                  data-filter={filter[i]}
                  onClick={() => {
                    dispatch(changefilter({ filter: 'weaponCategory', item: i }));
                  }}
                >
                  {i}
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
          <span>공명자 추가</span>
        </div>
      </div>
      <hr />
      {contents}
    </main>
  );
}
