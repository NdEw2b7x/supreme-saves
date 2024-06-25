import { useSelector } from 'react-redux';
import { State } from '../store';
import { ResonatorName } from '../types';

export const useMyEchoInfoSet = (name: ResonatorName) => {
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코']);
  const equipEchoes = useSelector((state: State) => state.echoesSlice['장착']);
  return ([1, 2, 3, 4, 5] as const).map((i) => {
    const myEcho = equipEchoes[name]?.[i];
    if (myEcho) {
      return myEchoes[myEcho];
    }
    return undefined;
  });
};
