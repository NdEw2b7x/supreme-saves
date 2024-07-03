import { useSelector } from 'react-redux';
import { changeEnemyLevel, changeEnemyRes } from '../../slice/enemySlice';
import { State, dispatch } from '../../store';

export default function System() {
  const enemyLevel = useSelector((state: State) => state.enemySlice['레벨']);
  return (
    <main>
      System
      <input
        type='button'
        value='reload'
        style={{ padding: '1rem' }}
        onClick={() => {
          window.location.reload();
        }}
      />
      <input
        type='button'
        value='removeEcho'
        style={{ padding: '1rem' }}
        onClick={() => {
          localStorage.removeItem('에코');
        }}
      />
      <textarea
        name=''
        id=''
        style={{ height: '20rem' }}
        defaultValue={localStorage.getItem('에코') ?? ''}
      ></textarea>
      <div>
        <span>enemy Level</span>
        <select
          defaultValue={enemyLevel}
          onChange={({ target: { value } }) => {
            dispatch(changeEnemyLevel(Number(value)));
          }}
        >
          {[70, 80, 90, 100].map((i) => (
            <option value={i} key={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>적 저항</span>
        <select
          defaultValue={enemyLevel}
          onChange={({ target: { value } }) => {
            dispatch(changeEnemyRes(Number(value)));
          }}
        >
          {[10, 20, 30, 40].map((i) => (
            <option value={i / 100} key={i}>
              {i}%
            </option>
          ))}
        </select>
      </div>
    </main>
  );
}
