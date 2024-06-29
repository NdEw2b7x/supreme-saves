import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { everyResonatorData } from '../../lib/Resonators/';
import { Element, ResonatorName } from '../../types';
import { MyResonator, changeLevel } from '../../slice/resonatorsSlice';
import DetailWeapon from './DetailWeapon';
import { RoverChangeElement } from './RoverChangeElement';
import { DetailStats } from './DetailStats';
import { DetailSkill } from './DetailSkill';
import { DetailChain } from './DetailChain';
import { RadioBtn, Thumbnail } from '..';
import styles from './ResonatorDetail.module.css';
import { useStatsResult } from '../useStatsResult';
import { getSkillMultiply } from '../../lib/formula';
import { useState } from 'react';
import { ResonatorSkill, SkillCategory } from '../../lib/Resonators/ResonatorData';

function DamageSkillName({
  skillData,
  action,
}: {
  skillData: ResonatorSkill;
  action: SkillCategory;
}) {
  const actionMapping = {
    basic: '일반 공격',
    skill: '공명 스킬',
    burst: '공명 해방',
    circuit: '공명 회로',
    intro: '변주 스킬',
    outro: '반주 스킬',
    inherent: '고유 스킬',
  };
  return (
    <h5>
      <span
        data-name={
          action === 'basic'
            ? skillData.basic.name !== ''
              ? skillData.basic.name
              : '(일반 공격 이름)'
            : action === 'skill'
            ? skillData.skill.name !== ''
              ? skillData.skill.name
              : '(공명 스킬 이름)'
            : action === 'circuit'
            ? skillData.circuit.name !== ''
              ? skillData.circuit.name
              : '(공명 회로 이름)'
            : action === 'burst'
            ? skillData.burst.name !== ''
              ? skillData.burst.name
              : '(공명 해방 이름)'
            : action === 'intro'
            ? skillData.intro.name
            : `(${actionMapping[action]} 이름)`
        }
      >
        {actionMapping[action]}
      </span>
    </h5>
  );
}

export default function ResonatorDetail() {
  const name = useSelector((state: State) => state.grobalSlice['detail']) as ResonatorName;
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const weaponMapping = useSelector((state: State) => state.weaponsSlice['장착']);
  const [crit, setCrit] = useState<true | 'avg' | false>('avg');
  const data = everyResonatorData[name];
  const myResonator = myResonators[name] as MyResonator;
  const skillLevel: Record<'basic' | 'skill' | 'circuit' | 'burst' | 'intro', number> = {
    basic: myResonator['스킬']['일반 공격'][0],
    skill: myResonator['스킬']['공명 스킬'][0],
    circuit: myResonator['스킬']['공명 회로'][0],
    burst: myResonator['스킬']['공명 해방'][0],
    intro: myResonator['스킬']['변주 스킬'][0],
  };
  const element = data.element;
  const resonatorSkill = data.skill;
  const innerLevel = [];
  for (let i = 1; i <= 90; i++) {
    innerLevel.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const weaponId = weaponMapping[name];
  const damageTrim = (x: number) => Math.floor(100 * x) / 100;
  const product = ([...x]) => x.reduce((acc, cur) => acc * cur, 1);
  const sum = ([...x]) => x.reduce((acc, cur) => acc + cur, 0);
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
    burst,
    ...statsValue
  } = useStatsResult(name);

  const critCoeff = crit === 'avg' ? 1 + cRate * (cDmg - 1) : crit ? cDmg : 1;
  const baseScale = {
    HP: baseHp * (1 + hp) + statsValue.flatHp,
    ATK: baseAtk * (1 + atk) + statsValue.flatAtk,
    DEF: baseDef * (1 + def) + statsValue.flatDef,
  };
  const elementDmgBonus: Record<Element, number> = { ice, fire, electro, wind, light, dark };
  const _elementDmgBonus = elementDmgBonus[element];
  const actionDmgBonus = { basic, heavy, skill, burst };
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.imgBox}>
            <Thumbnail scope='Resonators' code={name} />
          </div>
          <div className={styles.infoBox}>
            <div className={styles.name} style={{ backgroundColor: `var(--element-${element})` }}>
              <span>{name}</span>
            </div>
            <div className={styles.levelBox}>
              <span>Lv.</span>
              <select
                defaultValue={myResonator?.레벨}
                onChange={(e) => {
                  const level = Number(e.target.value);
                  dispatch(changeLevel({ name, level }));
                }}
              >
                {innerLevel}
              </select>
            </div>
          </div>
        </div>
      </header>
      {name === '방랑자' ? <RoverChangeElement /> : undefined}
      <main id='ResonatorDetail' className={styles.mainConatainer}>
        <section className={styles.info}>
          <div className={styles.top}>
            <div className={styles.left}>
              <DetailStats name={name} />
            </div>
            <div className={styles.right}>
              <DetailWeapon id={weaponId} name={name} />
              <DetailSkill name={name} />
              <DetailChain name={name} myResonator={myResonator} />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.echoes}>echoes</div>
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
                      setCrit(v);
                    }}
                  >
                    {v === 'avg' ? '평균' : v ? '적용' : '미적용'}
                  </RadioBtn>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.skillConatiner}>
            {Object.entries(skillLevel).map(([skillCategory, level], i) => (
              <div key={i}>
                <article className={styles[skillCategory]}>
                  <DamageSkillName
                    skillData={resonatorSkill}
                    action={skillCategory as SkillCategory}
                  />
                  <hr />
                  <div>
                    {skillCategory === 'basic'
                      ? (['basic', 'heavy', 'air', 'airHeavy', 'counter'] as const).map(
                          (subAction) => {
                            return resonatorSkill.basic[subAction]?.map(({ scale, value }, i) => (
                              <div key={i}>
                                <span>
                                  {subAction !== 'airHeavy'
                                    ? `${
                                        subAction === 'basic'
                                          ? ''
                                          : subAction === 'heavy'
                                          ? '강공격'
                                          : subAction === 'air'
                                          ? '공중 공격'
                                          : subAction === 'counter'
                                          ? '회피 반격'
                                          : ''
                                      } ${
                                        resonatorSkill.basic[subAction].length > 1
                                          ? i + 1 + '단 피해'
                                          : '피해'
                                      }`
                                    : '공중 강공격'}
                                </span>
                                <span>
                                  {value.map(({ flat = 0, multiply = 0, times }) => (
                                    <span>
                                      {damageTrim(
                                        product([
                                          sum([
                                            flat,
                                            product([
                                              baseScale[scale],
                                              getSkillMultiply(level)(multiply),
                                            ]),
                                          ]),
                                          sum([
                                            1,
                                            _elementDmgBonus,
                                            actionDmgBonus[
                                              subAction === 'heavy' ? 'heavy' : 'basic'
                                            ],
                                          ]),
                                          critCoeff,
                                        ])
                                      ) + (times ? `x${times}` : '')}
                                    </span>
                                  ))}
                                </span>
                              </div>
                            ));
                          }
                        )
                      : skillCategory === 'skill'
                      ? resonatorSkill.skill.skill.map(({ scale, value, name }, i) => (
                          <div key={i}>
                            <span>{name ? name + ' 피해' : '스킬 피해'}</span>
                            <span>
                              {value.map(({ multiply = 0, times }) => (
                                <>
                                  <span>
                                    {damageTrim(
                                      product([
                                        baseScale[scale],
                                        getSkillMultiply(level)(multiply),
                                        sum([1, _elementDmgBonus, actionDmgBonus['skill']]),
                                        critCoeff,
                                      ])
                                    ) + (times ? '*' + times : '')}
                                  </span>
                                  <br />
                                </>
                              ))}
                            </span>
                          </div>
                        ))
                      : // : skillCategory === 'circuit'
                      // ? (['additional', 'enhanced'] as const).map((i) =>
                      //     resonatorSkill.circuit[i]
                      //       ? (['basic', 'heavy', 'skill'] as const).map((action) =>
                      //           resonatorSkill.circuit[i]?.skill
                      //             ? resonatorSkill.circuit[i]?.skill?.skill.map(
                      //                 ({ scale, value, name }, i) => (
                      //                   <div key={i}>
                      //                     <span>{name ? name : '스킬 피해'}</span>
                      //                     <span>
                      //                       {value.map(({ multiply = 0, times }, i) => (
                      //                         <span key={i}>
                      //                           {damageTrim(
                      //                             product([
                      //                               baseScale[scale],
                      //                               getSkillMultiply(level)(multiply),
                      //                               sum([
                      //                                 1,
                      //                                 _elementDmgBonus,
                      //                                 actionDmgBonus['skill'],
                      //                               ]),
                      //                               critCoeff,
                      //                             ])
                      //                           ) + (times ? '*' + times : '')}
                      //                         </span>
                      //                       ))}
                      //                     </span>
                      //                   </div>
                      //                 )
                      //               )
                      //             : undefined
                      //         )
                      //       : undefined
                      //   )
                      skillCategory === 'burst'
                      ? resonatorSkill.burst.skill.map(({ scale, value, name }, i) => (
                          <div key={i}>
                            <span>{name ? name : '스킬 피해'}</span>
                            <span>
                              {value.map(({ multiply = 0, times }) => (
                                <span>
                                  {damageTrim(
                                    product([
                                      baseScale[scale],
                                      getSkillMultiply(level)(multiply),
                                      sum([1, _elementDmgBonus, actionDmgBonus['burst']]),
                                      critCoeff,
                                    ])
                                  ) + (times ? '*' + times : '')}
                                </span>
                              ))}
                            </span>
                          </div>
                        ))
                      : skillCategory === 'intro'
                      ? resonatorSkill.intro.skill.map(({ scale, value, name }) => (
                          <div>
                            <span>{name ? name : '스킬 피해'}</span>
                            <span>
                              {value.map(
                                ({ flat, multiply = 0, times }) =>
                                  Math.floor(
                                    100 *
                                      baseScale['ATK'] *
                                      getSkillMultiply(level)(multiply) *
                                      (1 + _elementDmgBonus) *
                                      critCoeff
                                  ) /
                                    100 +
                                  (times ? '*' + times : '')
                              )}
                            </span>
                          </div>
                        ))
                      : undefined}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
