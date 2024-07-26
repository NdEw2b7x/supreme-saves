import { useState } from 'react'
import { Thumbnail } from '..'
import { genByEcho } from '../genByEcho'
import EchoesListCardHeader from './CardHeader'
import EchoesListSubAddModal from './EchoesListSubAddModal'
import EquipModal from './EquipModal'
import { useSelector } from 'react-redux'
import { State, dispatch } from '../../store'
import {
  EchoEquipSlot,
  EchoId,
  EchoSubStatsId,
  deleteEcho,
} from '../../slice/echoesSlice'
import { Harmony, getEchoSecondaryMainStats, mapStatsName } from '../../types'
import { getPercent } from '../../libs/formula'
import { everyEchoData } from '../../libs/Echoes'
import styles from './EchoesList.module.css'
import { everyResonatorData } from '../../libs/Resonators'

export default function EchoesList({
  filterHarmony,
}: {
  filterHarmony?: Harmony
}) {
  const filterCost = useSelector(
    (state: State) => state.grobalSlice['filter'].cost
  )
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코'])

  const [subAddMode, setSubAddMode] = useState<boolean>(false)
  const [subStatNumber, setStatNumber] = useState<EchoSubStatsId>(1)
  const [echoId, setEchoId] = useState<EchoId>('echo_0')

  const [equipMode, setEquipMode] = useState<boolean>(false)

  const changeEquipModal = (x: boolean) => {
    if (x) {
      return (
        <EquipModal
          id={echoId}
          close={() => {
            setEquipMode(false)
          }}
        />
      )
    }
  }
  const subAddModal = (x: boolean) => {
    if (x) {
      const myEcho = Object.fromEntries(myEchoes.map(i => [i['식별'], i]))[
        echoId
      ]
      if (myEcho) {
        return (
          <EchoesListSubAddModal
            id={echoId}
            subSlotNumber={subStatNumber}
            myEcho={myEcho}
            close={() => {
              setSubAddMode(false)
            }}
          />
        )
      }
    }
  }
  return (
    <>
      <section className={styles.container}>
        {myEchoes.map(info => {
          const {
            식별: id,
            코드: code,
            레벨: level,
            '메인 스텟': main,
            '서브 스텟': sub,
            화음: harmony,
            장착: { 공명자: equippedBy },
          } = info
          const data = everyEchoData[code]
          const cost = data.cost
          const secondary = getEchoSecondaryMainStats(cost)
          const [byEchoMain] = genByEcho(info)

          if (filterCost[cost]) {
            if (filterHarmony === harmony || filterHarmony === undefined) {
              return (
                <div
                  key={id}
                  className={styles.card}
                  style={{
                    order: `${(6 - info['희귀']) * 100 + 25 - info['레벨']}`,
                    position: 'relative',
                  }}
                >
                  <EchoesListCardHeader id={id} info={info} cost={cost} />

                  <div className={styles.body}>
                    <div className={styles.main}>
                      <div>
                        <span>{mapStatsName[main]}</span>
                        <span>{getPercent(byEchoMain[main])(1)}</span>
                      </div>
                      <div>
                        <span>{mapStatsName[secondary]}</span>
                        <span>{byEchoMain[secondary].toFixed(1)}</span>
                      </div>
                    </div>
                    <div className={styles.sub}>
                      {([1, 2, 3, 4, 5] as EchoEquipSlot[]).map(i => {
                        let innerDiv = <span>&nbsp;</span>
                        if (i <= Math.floor(level / 5)) {
                          const subItem = sub[i]
                          if (subItem) {
                            const value = subItem.value
                            let resultV
                            if (value > 1) {
                              resultV = value
                            } else {
                              resultV = getPercent(value)(1)
                            }
                            innerDiv = (
                              <>
                                <span>· {mapStatsName[subItem.stat]}</span>
                                <span>{resultV}</span>
                              </>
                            )
                          } else {
                            innerDiv = (
                              <>
                                <span
                                  className={styles.addSubBtn}
                                  onClick={() => {
                                    setEchoId(id as EchoId)
                                    setStatNumber(i)
                                    setSubAddMode(true)
                                  }}
                                >
                                  + 속성 추가
                                </span>
                              </>
                            )
                          }
                        }
                        return (
                          <div className={styles.subItem} key={i}>
                            {innerDiv}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className={styles.footer}>
                    <div className={styles.equipTag}>장착</div>
                    <div
                      className={styles.equipName}
                      onClick={() => {
                        setEchoId(id)
                        setEquipMode(true)
                      }}
                    >
                      {equippedBy === ''
                        ? '미장착'
                        : equippedBy === 'Rover'
                        ? '방랑자'
                        : everyResonatorData[equippedBy]?.name}
                    </div>
                    {equippedBy !== '' ? (
                      <div className={styles.equipThumbnail}>
                        <Thumbnail
                          scope='Resonators'
                          code={equippedBy}
                          key={'equippedBy' + equippedBy}
                        />
                      </div>
                    ) : (
                      <div
                        className={styles.delete}
                        onClick={() => {
                          if (window.confirm('삭제 후 되돌릴 수 없습니다.')) {
                            dispatch(deleteEcho(id))
                          }
                        }}
                      >
                        <span>삭제</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            }
          }
          return undefined
        })}
      </section>
      {subAddModal(subAddMode)}
      {changeEquipModal(equipMode)}
    </>
  )
}
