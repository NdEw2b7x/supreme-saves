import { useState } from 'react';
import { Harmony, everyHarmony } from '../../types';

export default function EchoesAdd() {
  const [harmony, setHarmony] = useState<Harmony>(everyHarmony[0]);
  const afterHarmony = (harmony: Harmony) => {
    return <div>setharmony as {harmony}</div>;
  };
  return (
    <form>
      <select
        name='setHarmony'
        id='setHarmony'
        onChange={(e) => {
          setHarmony(e.target.value as Harmony);
        }}
      >
        {everyHarmony.map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      {afterHarmony(harmony)}
      {/* <div>
        <div>echo_{Math.floor((9 * Math.random() + 1) * 100000000)}</div>
      </div> */}
    </form>
  );
}
