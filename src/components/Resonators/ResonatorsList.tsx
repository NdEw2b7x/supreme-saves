import ResonatorCard from './ResonatorCard';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { ResonatorName } from '../../types';
import { everyResonatorData } from '../../lib/Resonators/';

export default function ResonatorsList() {
  const filters = useSelector((state: State) => state.grobalSlice.filter);
  const filterE = filters.element;
  const filterW = filters.weaponCategory;
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  return (
    <section id='ResonatorsList' data-section='list' style={{ display: 'grid', gap: '0.5rem' }}>
      {Object.entries(myResonators).map(([key, info]) => {
        const resonatorName = key as ResonatorName;
        const resonatorData = everyResonatorData[resonatorName];
        const element = resonatorData.element;
        const weaponCategory = resonatorData.weaponCatergory;
        if (filterE[element] && filterW[weaponCategory]) {
          return <ResonatorCard resonatorName={resonatorName} info={info} key={resonatorName} />;
        }
        return null;
      })}
    </section>
  );
}
