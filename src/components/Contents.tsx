import { useSelector } from 'react-redux';
import { State } from '../store';
import { Echoes, ResonatorDetail, Resonators, System, Weapons } from './';

export default function Contents() {
  const page = useSelector((state: State) => state.grobalSlice.page);
  const subPage = useSelector((state: State) => state.grobalSlice.subPage);
  switch (page) {
    case '공명자':
      switch (subPage) {
        case '상세':
          return <ResonatorDetail />;
        default:
          return <Resonators />;
      }
    case '무기':
      return <Weapons />;
    case '에코':
      return <Echoes />;
    default:
      return <System />;
  }
}
