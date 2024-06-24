import EchoesAdd from './EchoesAdd';
import EchoesList from './EchoesList';
import { useSelector } from 'react-redux';
import { EchoCost, Harmony, everyHarmony } from '../../types';
import { State, dispatch } from '../../store';
import { changeSubPage, changefilter } from '../../slice/grobalSlice';
import { useState } from 'react';

export default function Echoes() {
  const filter = useSelector((state: State) => state.grobalSlice['filter'].cost);
  const subPage = useSelector((state: State) => state.grobalSlice['subPage']);

  const [harmony, setHarmony] = useState<Harmony>();

  let contents;
  if (subPage === '추가') {
    contents = <EchoesAdd />;
  } else {
    contents = <EchoesList filterHarmony={harmony} />;
  }
  return (
    <main id='Echoes'>
      <div className='filterContainer'>
        <div className='filter'>
          <select
            name='filterHarmory'
            id='FilterHarmory'
            onChange={({ target: { value } }) => {
              if (value === '전체') {
                setHarmony(undefined);
              } else {
                setHarmony(value as Harmony);
              }
            }}
          >
            <option value='전체'>전체</option>
            {everyHarmony.map((i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
          <div className='radio'>
            {([4, 3, 1] as EchoCost[]).map((item) => {
              return (
                <span
                  key={item}
                  data-filter={filter[item]}
                  onClick={() => {
                    dispatch(changefilter({ filter: 'cost', item }));
                  }}
                >
                  {item} COST
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
