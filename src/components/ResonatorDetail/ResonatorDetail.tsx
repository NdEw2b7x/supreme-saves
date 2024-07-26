import { Fragment, ReactNode, useState } from 'react'
import DetailWeapon from './DetailWeapon'
import { useSelector } from 'react-redux'
import { State, dispatch } from '../../store'
import { changeLevel, changeRank } from '../../slice/resonatorsSlice'
import {
  ResonatorCode,
  codeConverter,
  everyResonatorData,
  isRover,
} from '../../libs/Resonators'
import { ResonatorElement, Rank, minmaxLevel } from '../../types'
import { RoverChangeElement } from './RoverChangeElement'
import { DetailStats } from './DetailStats'
import { DetailSkill } from './DetailSkill'
import { DetailChain } from './DetailChain'
import { RadioBtn, Thumbnail } from '..'
import { useStatsResult } from '../useStatsResult'
import {
  getHealExtra,
  getHealMultiplier,
  getSkillMultiply,
  product,
  sum,
} from '../../libs/formula'
import {
  Forte,
  ResonatorSkill,
  Scale,
} from '../../libs/Resonators/ResonatorData'
import styles from './ResonatorDetail.module.css'
import { mapNormalMeterial, mapPlant } from '../../slice/backpackSlice'
import {
  ForteLine,
  NormalAttack,
  mapForteLine,
  nameNormalAttack,
} from '../../types/Movement'
import { everyEchoData } from '../../libs/Echoes'

// const ascMaterialNumber: Record<
//   Rank,
//   { plant: number; boss: number; normal: [number, number, number, number] }
// > = {
//   0: { boss: 0, plant: 0, normal: [0, 0, 0, 4] },
//   1: { boss: 3, plant: 4, normal: [0, 0, 4, 0] },
//   2: { boss: 6, plant: 8, normal: [0, 0, 8, 0] },
//   3: { boss: 9, plant: 12, normal: [0, 4, 0, 0] },
//   4: { boss: 12, plant: 16, normal: [0, 8, 0, 0] },
//   5: { boss: 16, plant: 20, normal: [4, 0, 0, 0] },
//   6: { boss: 0, plant: 0, normal: [0, 0, 0, 0] },
// };

function DamageSkillName({
  skillData,
  forteLine: action,
}: {
  skillData: ResonatorSkill
  forteLine: keyof Forte
}) {
  return (
    <h5>
      <span
        data-name={
          action === 'normal'
            ? skillData.normal.name !== ''
              ? skillData.normal.name
              : '(일반 공격 이름)'
            : action === 'skill'
            ? skillData.skill.name !== ''
              ? skillData.skill.name
              : '(공명 스킬 이름)'
            : action === 'circuit'
            ? skillData.circuit.name !== ''
              ? skillData.circuit.name
              : '(공명 회로 이름)'
            : action === 'liberation'
            ? skillData.liberation.name !== ''
              ? skillData.liberation.name
              : '(공명 해방 이름)'
            : action === 'intro'
            ? skillData.intro.name !== ''
              ? skillData.intro.name
              : '(변주 스킬 이름)'
            : `(${mapForteLine[action]} 이름)`
        }
      >
        {mapForteLine[action]}
      </span>
    </h5>
  )
}
const damageTrim = (x: number) => Math.floor(100 * x) / 100

function SkillNodeBox({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  )
}

export default function ResonatorDetail() {
  const code = useSelector(
    (state: State) => state.grobalSlice['detail']
  ) as ResonatorCode
  const myResonators = useSelector(
    (state: State) => state.resonatorsSlice['공명자']
  )
  const weaponMapping = useSelector(
    (state: State) => state.weaponsSlice['장착']
  )
  const [crit, setCrit] = useState<boolean | 'avg'>('avg')
  const [circuitConsume, setCircuitConsume] = useState<number>(0)
  const data = everyResonatorData[code]
  const name = data.name
  const myResonator = Object.fromEntries(myResonators.map(i => [i['코드'], i]))[
    code
  ]
  const level = myResonator['레벨']
  const skillLevel: Record<ForteLine, number> = {
    normal: myResonator['스킬']['일반 공격']['레벨'],
    skill: myResonator['스킬']['공명 스킬']['레벨'],
    circuit: myResonator['스킬']['공명 회로']['레벨'],
    liberation: myResonator['스킬']['공명 해방']['레벨'],
    intro: myResonator['스킬']['변주 스킬']['레벨'],
  }
  const element = data.element
  const resonatorSkill = data['forte']
  const innerLevel = []
  for (let i = 1; i <= 90; i++) {
    innerLevel.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
  }
  const genLevel = (min: number, max: number) => {
    let out = []
    for (let i = min; i <= max; i++) {
      out.push(
        <option key={i} value={i}>
          {i}/{max}
        </option>
      )
    }
    return out
  }
  const weaponId = weaponMapping[codeConverter(code)]
  const {
    baseHp,
    baseAtk,
    baseDef,
    hp,
    atk,
    def,
    cRate,
    cDmg,
    ice,
    fire,
    electro,
    wind,
    light,
    dark,
    basic,
    heavy,
    skill,
    liberation,
    ...statsValue
  } = useStatsResult(code)

  const innerCircuit: ReactNode[] = []
  for (let i = 0; i <= resonatorSkill.circuit.circuit['max']; i++) {
    innerCircuit.push(
      <option key={i} value={i}>
        {i}pt
      </option>
    )
  }

  const critCoeff = crit === 'avg' ? 1 + cRate * (cDmg - 1) : crit ? cDmg : 1
  const baseScale = {
    HP: baseHp * (1 + hp) + statsValue.flatHp,
    ATK: baseAtk * (1 + atk) + statsValue.flatAtk,
    DEF: baseDef * (1 + def) + statsValue.flatDef,
  }
  const elementDmgBonus: Record<ResonatorElement, number> = {
    ice,
    fire,
    electro,
    wind,
    light,
    dark,
  }
  const _elementDmgBonus = elementDmgBonus[element]
  const actionDmgBonus = { basic, heavy, skill, liberation }
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.imgBox}>
            <Thumbnail scope='Resonators' code={codeConverter(code)} />
          </div>
          <div className={styles.infoBox}>
            <div className={styles.topBox}>
              <div
                className={styles.name}
                style={{ backgroundColor: `var(--element-${element})` }}
              >
                <span>{name}</span>
              </div>
            </div>
            <div className={styles.bottomBox}>
              <div className={styles.rankBox}>
                <span>Rank.</span>
                <select
                  defaultValue={myResonator['돌파']}
                  onChange={e => {
                    const rank = Number(e.target.value) as Rank
                    dispatch(changeRank({ code, rank }))
                    if (level > minmaxLevel[rank]['max']) {
                      dispatch(
                        changeLevel({ code, level: minmaxLevel[rank]['max'] })
                      )
                    }
                    if (level < minmaxLevel[rank]['min']) {
                      dispatch(
                        changeLevel({ code, level: minmaxLevel[rank]['min'] })
                      )
                    }
                  }}
                >
                  {([0, 1, 2, 3, 4, 5, 6] as Rank[]).map(rank => (
                    <option value={rank} key={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.levelBox}>
                <span>Lv.</span>
                <select
                  defaultValue={myResonator['레벨']}
                  onChange={e => {
                    const level = Number(e.target.value)
                    dispatch(changeLevel({ code, level }))
                  }}
                >
                  {genLevel(
                    minmaxLevel[myResonator['돌파']]['min'],
                    minmaxLevel[myResonator['돌파']]['max']
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isRover(code) ? <RoverChangeElement /> : undefined}
      <main id='ResonatorDetail' className={styles.mainConatainer}>
        <section className={styles.info}>
          <div className={styles.top}>
            <div className={styles.left}>
              <DetailStats code={code} />
            </div>
            <div className={styles.right}>
              {weaponId ? (
                <DetailWeapon id={weaponId} resonatorCode={code} />
              ) : undefined}
              <DetailSkill code={code} />
              <DetailChain myResonator={myResonator} />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.echoes}>echoes</div>
            <div className={styles.material}>
              <div>{everyEchoData[data.bossMeterial].name}</div>
              <div>{mapPlant[data.ascPlant]}</div>
              <div>{mapNormalMeterial[`${data.normalMaterial}5`]}</div>
            </div>
          </div>
        </section>
        <section className={styles.damage}>
          <div className={styles.crit}>
            <div>
              <div>
                <span>크리티컬 설정</span>
              </div>
              {([false, 'avg', true] as const).map((v, i) => (
                <div key={i}>
                  <RadioBtn
                    name={'radioCrit'}
                    id={'radio' + i}
                    defaultChecked={crit === v}
                    onChange={() => {
                      setCrit(v)
                    }}
                  >
                    {v === 'avg' ? '평균' : v ? '적용' : '미적용'}
                  </RadioBtn>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.skillConatiner}>
            {(Object.entries(skillLevel) as [ForteLine, number][]).map(
              ([forteLine, level], i) => (
                <div key={i}>
                  <article className={styles[forteLine]}>
                    <DamageSkillName
                      skillData={resonatorSkill}
                      forteLine={forteLine}
                    />
                    <hr />
                    {forteLine === 'normal' ? (
                      <div>
                        {(
                          Object.entries(nameNormalAttack) as [
                            NormalAttack,
                            string
                          ][]
                        ).map(([normalAttack, normalAttackName]) =>
                          resonatorSkill.normal[normalAttack].map(
                            ({ skillType, name, value }, i) => (
                              <SkillNodeBox
                                title={
                                  resonatorSkill.normal[normalAttack].length ===
                                  1
                                    ? normalAttackName + ' 피해'
                                    : name === ''
                                    ? `${normalAttackName} ${i + 1}단 피해`
                                    : `${name} 피해`
                                }
                              >
                                {value.map(
                                  ({ scale, multiply, times, extra }, i) => (
                                    <span key={i}>
                                      {damageTrim(
                                        product([
                                          sum([
                                            extra,
                                            skillType === 'extraMultiflier'
                                              ? 0
                                              : product([
                                                  baseScale[scale as Scale],
                                                  getSkillMultiply(level)(
                                                    multiply
                                                  ),
                                                ]),
                                          ]),
                                          sum([
                                            1,
                                            _elementDmgBonus,
                                            actionDmgBonus[
                                              normalAttack === 'heavy'
                                                ? 'heavy'
                                                : 'basic'
                                            ],
                                          ]),
                                          critCoeff,
                                        ])
                                      ) + (times > 1 ? `x${times}` : '')}
                                    </span>
                                  )
                                )}
                              </SkillNodeBox>
                            )
                          )
                        )}
                      </div>
                    ) : forteLine === 'skill' ? (
                      <div>
                        {resonatorSkill.skill.skill.map(
                          ({ skillType, value, name }, i) => (
                            <SkillNodeBox
                              title={name ? name + ' 피해' : '스킬 피해'}
                            >
                              {value.map(({ scale, multiply, times }, i) => (
                                <Fragment key={i}>
                                  <span>
                                    {damageTrim(
                                      product([
                                        baseScale[scale as Scale],
                                        getSkillMultiply(level)(multiply),
                                        sum([
                                          1,
                                          _elementDmgBonus,
                                          actionDmgBonus['skill'],
                                        ]),
                                        critCoeff,
                                      ])
                                    ) + (times > 1 ? `x${times}` : '')}
                                  </span>
                                </Fragment>
                              ))}
                            </SkillNodeBox>
                          )
                        )}
                      </div>
                    ) : forteLine === 'circuit' ? (
                      <div>
                        {resonatorSkill.circuit.skill.map(
                          ({ name, value, dmgType, skillType }) => (
                            <>
                              <SkillNodeBox
                                title={`${
                                  name !== ''
                                    ? name
                                    : resonatorSkill.circuit.name
                                } ${
                                  skillType === 'damage' ? '피해' : '치료량'
                                }`}
                              >
                                {value.map(i => (
                                  <span>{i.multiply}</span>
                                ))}
                              </SkillNodeBox>
                            </>
                          )
                        )}
                        <div
                          style={{
                            backgroundColor: 'var(--theme-color-alpha-400)',
                          }}
                        >
                          「{resonatorSkill.circuit.circuit['name']}」 소모량
                          {resonatorSkill.circuit.circuit['circuitType'] ===
                          'stack' ? (
                            <select
                              style={{
                                padding: '0.25rem 0.5rem',
                                margin: '-0.25rem',
                                borderRadius: '0.25rem',
                              }}
                              defaultValue={circuitConsume}
                              onChange={({ target: { value } }) => {
                                setCircuitConsume(Number(value))
                              }}
                            >
                              {innerCircuit}
                            </select>
                          ) : (
                            [0, 1].map(i => (
                              <div>
                                <RadioBtn
                                  name={'ddddd'}
                                  id={`${i}ddd`}
                                  defaultChecked={false}
                                  onChange={() => {}}
                                >
                                  <div>dfsf</div>
                                </RadioBtn>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ) : forteLine === 'liberation' ? (
                      <div>
                        {resonatorSkill.liberation.skill.map(
                          ({ skillType, value, name, dmgType }, i) => (
                            <SkillNodeBox
                              title={`${
                                name !== '' ? name : resonatorSkill.circuit.name
                              } ${skillType === 'damage' ? '피해' : '치료량'}`}
                            >
                              {skillType === 'damage'
                                ? value.map(
                                    (
                                      { scale, multiply = 0, times, extra },
                                      i
                                    ) => (
                                      <span key={i}>
                                        {damageTrim(
                                          product([
                                            sum([
                                              extra,
                                              product([
                                                baseScale[scale as Scale],
                                                getSkillMultiply(level)(
                                                  multiply
                                                ),
                                              ]),
                                            ]),
                                            sum([
                                              1,
                                              _elementDmgBonus,
                                              actionDmgBonus[
                                                dmgType ?? 'liberation'
                                              ],
                                            ]),
                                            critCoeff,
                                          ])
                                        ) + (times > 1 ? `x${times}` : '')}
                                      </span>
                                    )
                                  )
                                : skillType === 'heal'
                                ? value.map(
                                    ({ extra, multiply, scale, times }) => (
                                      <span>
                                        {product([
                                          sum([
                                            getHealExtra(level)(extra),
                                            product([
                                              baseScale[scale],
                                              getHealMultiplier(level)(
                                                multiply
                                              ),
                                            ]),
                                          ]),
                                          1 + statsValue.heal,
                                        ]).toFixed(2)}
                                      </span>
                                    )
                                  )
                                : undefined}
                            </SkillNodeBox>
                          )
                        )}
                      </div>
                    ) : forteLine === 'intro' ? (
                      <div>
                        {resonatorSkill.intro.skill.map(
                          ({ value, name }, i) => (
                            <SkillNodeBox title={name ? name : '스킬 피해'}>
                              {value.map(
                                ({ extra, multiply = 0, times }) =>
                                  Math.floor(
                                    100 *
                                      baseScale['ATK'] *
                                      getSkillMultiply(level)(multiply) *
                                      (1 + _elementDmgBonus) *
                                      critCoeff
                                  ) /
                                    100 +
                                  (times > 1 ? `x${times}` : '')
                              )}
                            </SkillNodeBox>
                          )
                        )}
                      </div>
                    ) : undefined}
                  </article>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </>
  )
}
