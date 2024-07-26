import { useSelector } from 'react-redux'
import { State } from '../store'
import { ResonatorCode, codeConverter } from '../libs/Resonators'

export const useMyEchoInfoSet = (code: ResonatorCode) => {
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코'])
  const equipEchoes = useSelector((state: State) => state.echoesSlice['장착'])
  return ([1, 2, 3, 4, 5] as const).map(i => {
    const echoId = equipEchoes[codeConverter(code)]?.[i]
    return echoId
      ? Object.fromEntries(myEchoes.map(i => [i['식별'], i]))[echoId]
      : undefined
  })
}
