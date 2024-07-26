import { Thumbnail } from '..'
import { useSelector } from 'react-redux'
import { State, dispatch } from '../../store'
import { changeSubPage } from '../../slice/grobalSlice'
import { addResonator } from '../../slice/resonatorsSlice'
import {
  ResonatorCode,
  codeConverter,
  everyResonatorData,
} from '../../libs/Resonators'
import styles from './ResonatorsAdd.module.css'
import { mapElement } from '../../types'

export default function ResonatorsAdd() {
  const myResonators = useSelector(
    (state: State) => state.resonatorsSlice['공명자']
  )
  return (
    <section id='ResonatorsAdd' className={styles.container}>
      {Object.keys(everyResonatorData)
        .map(code => code as ResonatorCode)
        .filter(code => !myResonators.map(i => i['코드']).includes(code))
        .map(code => {
          const name = everyResonatorData[code].name
          const element = everyResonatorData[code]['element']
          return (
            <div
              key={code}
              className={styles.card}
              onClick={() => {
                dispatch(addResonator(code))
                dispatch(changeSubPage(undefined))
              }}
            >
              <Thumbnail scope='Resonators' code={codeConverter(code)} />
              <div className={styles.name}>
                {/Rover\w+/.test(code)
                  ? name + '·' + mapElement[element]
                  : name}
              </div>
            </div>
          )
        })}
    </section>
  )
}
