import { useState } from 'react'
import { ModalBox, Thumbnail } from '..'
import { useSelector } from 'react-redux'
import { State, dispatch } from '../../store'
import {
  MyWeapon,
  changeEquip,
  changeSyntonize,
  changeWeaponLevel,
  changeWeaponRank,
  deleteWeapon,
} from '../../slice/weaponsSlice'

import {
  getPercent,
  getWeaponAtk,
  getWeaponSubOptionValue,
} from '../../libs/formula'
import {
  ResonatorCode_,
  everyResonatorData,
  isRover,
} from '../../libs/Resonators'
import { everyWeaponData } from '../../libs/Weapons'
import styles from './WeaponsList.module.css'
import { mapStatsName, minmaxLevel, Rank, Syntonize } from 'types'

function ListCard({
  myWeapon: {
    식별: id,
    코드: code,
    레벨: level,
    돌파: rank,
    공진: syntonize,
    장착: equipped,
  },
}: {
  myWeapon: MyWeapon
}) {
  const myResonators = useSelector(
    (state: State) => state.resonatorsSlice['공명자']
  )
  const roverElement = useSelector(
    (state: State) => state.resonatorsSlice['element']
  )

  const [mode, setMode] = useState<'level' | 'rank' | 'syntonize' | 'none'>()
  const [equipMode, setEquipMode] = useState<boolean>(false)

  const data = everyWeaponData[code]
  const name = data.getName()
  const rarity = data.rarity
  const category = data.category
  const atk1 = data.atk1
  const subOption = data.subOption
  const genLv = (min: number, max: number) => {
    let output = []
    for (let level = min; level <= max; level++) {
      output.push(
        <span
          key={level}
          onClick={() => {
            setMode('none')
            dispatch(
              changeWeaponLevel({
                id,
                level,
              })
            )
          }}
        >
          {level}
        </span>
      )
    }
    return output
  }
  const genRank = () => {
    let output = []
    for (let i = 0; i <= 6; i++) {
      output.push(
        <span
          key={i}
          onClick={() => {
            setMode('none')
            dispatch(
              changeWeaponRank({
                id,
                rank: i as Rank,
              })
            )
          }}
        >
          {i}
        </span>
      )
    }
    return output
  }
  const genSyntonize = () => {
    let output = []
    for (let i = 1; i <= 5; i++) {
      output.push(
        <span
          key={i}
          onClick={() => {
            setMode('none')
            dispatch(
              changeSyntonize({
                id,
                syntonize: i as Syntonize,
              })
            )
          }}
        >
          {i}단계
        </span>
      )
    }
    return output
  }
  return (
    <div
      className={styles.card}
      key={id}
      data-category={category}
      style={{
        order:
          (6 - rarity) * 10000 +
          (100 - level) * 100 +
          (5 - Number(code[4])) * 10 +
          Number(code[code.length - 1]),
      }}
    >
      <div className={styles.body}>
        <div className={styles.imgBox}>
          <Thumbnail
            scope='Weapons'
            code={code}
            key={everyWeaponData[code].name}
          />
        </div>
        <div className={styles.infoBox}>
          <div
            className={styles.name}
            style={{
              backgroundColor: 'var(--' + rarity + '-star)',
            }}
          >
            <span>{name}</span>
          </div>
          <div className={styles.stats}>
            <div className={styles.atk}>
              <span>공격력</span>
              <span>{getWeaponAtk({ level, rank, code })}</span>
            </div>
            <div className={styles.subOption}>
              <span>{mapStatsName[subOption]}</span>
              <span>
                {getPercent(getWeaponSubOptionValue(atk1, subOption)(level))(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.control}>
        <div className={styles.level}>
          <div
            onClick={() => {
              setMode('level')
            }}
          >
            <span>
              Lv. {level}/{minmaxLevel[rank]['max']}
            </span>
          </div>
          <div>
            {mode === 'level' ? (
              <div>
                {genLv(minmaxLevel[rank]['min'], minmaxLevel[rank]['max'])}
              </div>
            ) : undefined}
          </div>
        </div>
        <div className={styles.rank}>
          <div
            onClick={() => {
              setMode('rank')
            }}
          >
            <span>Rank. {rank}</span>
          </div>
          <div>{mode === 'rank' ? <div>{genRank()}</div> : undefined}</div>
        </div>
        <div className={styles.syntonize}>
          <div
            onClick={() => {
              setMode('syntonize')
            }}
          >
            <span>공진 {syntonize}단계</span>
          </div>
          <div>
            {mode === 'syntonize' ? <div>{genSyntonize()}</div> : undefined}
          </div>
        </div>
      </div>
      <div className={styles.equip}>
        <div className={styles.equipTag}>
          <span>장착</span>
        </div>
        <div
          className={styles.equipName}
          onClick={() => {
            setEquipMode(true)
          }}
        >
          <span>
            {equipped !== ''
              ? equipped === 'Rover'
                ? '방랑자'
                : everyResonatorData[equipped]?.['name']
              : '미장착'}
          </span>
        </div>
        {equipped !== '' ? (
          <div className={styles.thumbnail}>
            <Thumbnail scope='Resonators' code={equipped} />
          </div>
        ) : (
          <div
            className={styles.delete}
            onClick={() => {
              if (window.confirm('삭제 후 되돌릴 수 없습니다.')) {
                dispatch(deleteWeapon({ id }))
              }
            }}
          >
            <span>삭제</span>
          </div>
        )}
        {equipMode ? (
          <ModalBox>
            <div className={styles.equipModal}>
              <div>
                {myResonators.map(i => {
                  const resonatorCode = i['코드']
                  return everyResonatorData[resonatorCode].weaponCatergory ===
                    category ? (
                    !isRover(resonatorCode) ||
                    (isRover(resonatorCode) &&
                      everyResonatorData[resonatorCode].element ===
                        roverElement) ? (
                      <div
                        key={resonatorCode}
                        onClick={() => {
                          dispatch(
                            changeEquip({
                              id,
                              equip: isRover(resonatorCode)
                                ? 'Rover'
                                : (resonatorCode as ResonatorCode_),
                            })
                          )
                          setEquipMode(false)
                        }}
                      >
                        <div>
                          <Thumbnail
                            scope='Resonators'
                            code={
                              isRover(resonatorCode)
                                ? 'Rover'
                                : (resonatorCode as ResonatorCode_)
                            }
                          />
                        </div>
                        <div>
                          <span>{everyResonatorData[resonatorCode].name}</span>
                        </div>
                      </div>
                    ) : undefined
                  ) : undefined
                })}
              </div>
              <div>
                <input
                  type='button'
                  value='취소'
                  onClick={() => {
                    setEquipMode(false)
                  }}
                />
              </div>
            </div>
          </ModalBox>
        ) : undefined}
      </div>
    </div>
  )
}

export default function WeaponsList() {
  const filters = useSelector((state: State) => state.grobalSlice.filter)
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기'])
  return (
    <section id='WeaponsList' className={styles.container}>
      {myWeapons.map(myWeapon => {
        const data = everyWeaponData[myWeapon['코드']]
        return filters.rarity[data.rarity] &&
          filters.weaponCategory[data.category] ? (
          <ListCard
            myWeapon={myWeapon}
            key={myWeapon['식별'] + '-' + myWeapon['이름']}
          />
        ) : undefined
      })}
    </section>
  )
}
