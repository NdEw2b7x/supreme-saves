import ResonatorCard from './ResonatorCard';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { ResonatorCode, everyResonatorData } from '../../lib/Resonators/';

export default function ResonatorsList() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const filterE = filters.element;
  const filterW = filters.weaponCategory;
  const myResonators = Object.fromEntries(
    useSelector((state: State) => state.resonatorsSlice['공명자']).map((i) => [i['코드'], i])
  );

  return (
    <section id='ResonatorsList' data-section='list' style={{ display: 'grid', gap: '0.5rem' }}>
      {(Object.keys(everyResonatorData) as ResonatorCode[])
        .filter((code) => Object.keys(myResonators).includes(code))
        .map((code) => {
          const data = everyResonatorData[code];
          return filterE[data.element] && filterW[data.weaponCatergory] ? (
            <ResonatorCard myResonator={myResonators[code]} key={code} />
          ) : undefined;
        })}
    </section>
  );
}
