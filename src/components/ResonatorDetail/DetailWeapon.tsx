import { Fragment } from 'react/jsx-runtime';
import { RadioBtn, SelectNumber, Thumbnail } from '..';
import { useByWeapon } from '../useByWeapon';
import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { MyWeapon, WeaponId } from '../../slice/weaponsSlice';
import { ResonatorName, Stats, getStatsName } from '../../types';
import { getPercent } from '../../lib/formula';
import { Trigger, WeaponData, everyWeaponData } from '../../lib/Weapons';
import styles from './DetailWeapon.module.css';
import { setStack, toggleTrigger } from '../../slice/triggerSlice';

export default function DetailWeapon({ name, id }: { name: ResonatorName; id?: WeaponId }) {
  const myWeapons = Object.fromEntries(
    useSelector((state: State) => state.weaponsSlice['무기']).map((i) => [i['식별'], i])
  );
  const currentTrigger = useSelector((state: State) => state.triggerSlice);
  const currentStack = currentTrigger['stack'];
  const [weaponAtk, byWeapon] = useByWeapon(name);

  if (id) {
    const weapon = myWeapons[id] as MyWeapon;
    const code = weapon.코드;
    const data = everyWeaponData[code] as WeaponData;
    const name = data.getName();
    const rarity = data.rarity;
    const sub = data.subOption;
    const skill = data.skill;
    const s = weapon['공진'];
    return (
      <div className={styles.weapon}>
        <div className={styles.weaponName} style={{ backgroundColor: `var(--${rarity}-star)` }}>
          <span data-level={'Lv. ' + weapon['레벨']} data-syntonize={' S' + weapon['공진']}>
            {name}
          </span>
        </div>
        <div className={styles.body}>
          <div className={styles.imgContainer}>
            <Thumbnail scope='Weapons' code={code} key={name} />
          </div>
          <div className={styles.info}>
            <div>
              <span>공격력</span>
              <span>{weaponAtk}</span>
            </div>
            <div>
              <span>{getStatsName(sub)}</span>
              <span>{getPercent(byWeapon[sub])(2)}</span>
            </div>
          </div>
        </div>
        <div className={styles.ability}>
          <h5 className={styles.abilityName}>{skill.name ? skill.name : '(스킬 이름)'}</h5>
          {skill.passive.length ? (
            <div className={styles.passive}>
              <div>
                {skill.passive.map(({ stat, s1, s5 }) => (
                  <div key={stat} className={styles.statRow}>
                    <span style={{ color: isElement(stat) ? `var(--element-${stat})` : 'white' }}>
                      {getStatsName(stat)}
                    </span>
                    <span>{getPercent(s1 + ((s5 - s1) * (s - 1)) / 4)(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : undefined}
          {skill.passive.length && skill.active?.length ? <hr /> : undefined}
          {skill.active?.length ? (
            <div className={styles.active}>
              {skill.active.map(({ trigger, value, stack, stackName }, i) => {
                return (
                  <Fragment key={i}>
                    <div className={styles.trigger}>
                      {trigger.map((trigger) => (
                        <Fragment key={i}>
                          <div className={styles.name}>
                            <span key={trigger}>{triggerConvert(trigger)}</span>
                          </div>
                          {currentStack[stackName ?? ''] > 0 && stackName ? (
                            <div style={{ alignContent: 'center' }}>「{stackName}」</div>
                          ) : undefined}
                          {stack && currentTrigger[trigger] ? (
                            <div className={styles.stack}>
                              <SelectNumber
                                min={1}
                                max={stack}
                                defaultValue={1}
                                onChange={(i) => {
                                  dispatch(setStack([stackName ?? '스택', Math.min(i, stack)]));
                                }}
                              />
                              <span>스택</span>
                            </div>
                          ) : undefined}
                          <div className={styles.switch}>
                            {[false, true].map((v, i) => (
                              <RadioBtn
                                key={i}
                                name={`${trigger}`}
                                id={`${trigger}-${v}`}
                                defaultChecked={currentTrigger[trigger] === v}
                                onChange={() => {
                                  dispatch(toggleTrigger(trigger));
                                  dispatch(
                                    setStack([stackName as string, currentTrigger[trigger] ? 0 : 1])
                                  );
                                }}
                              >
                                {v ? '발동' : '미발동'}
                              </RadioBtn>
                            ))}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    <div>
                      {value.map(({ stat, s1, s5 }, i) => {
                        const switching = trigger
                          .map((trigger) => currentTrigger[trigger])
                          .filter((i) => i).length
                          ? true
                          : false;
                        return (
                          <div className={styles.statRow} key={i}>
                            <span
                              style={{
                                color: isElement(stat) ? `var(--element-${stat})` : 'white',
                              }}
                            >
                              {getStatsName(stat)}
                            </span>
                            <span>
                              {getPercent(
                                switching
                                  ? (stack ? currentStack[stackName ?? '-'] : 1) *
                                      (s1 + ((s5 - s1) * (s - 1)) / 4)
                                  : 0
                              )(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          ) : undefined}
        </div>
      </div>
    );
  }
  return null;
}

export const isElement = (stat: Stats) => {
  return stat === 'ice' ||
    stat === 'fire' ||
    stat === 'electro' ||
    stat === 'wind' ||
    stat === 'light' ||
    stat === 'dark'
    ? true
    : false;
};

export const triggerConvert = (x: Trigger) => {
  return x === 'basic'
    ? '일반 공격'
    : x === 'heavy'
    ? '강공격'
    : x === 'skill'
    ? '공명 스킬'
    : x === 'burst'
    ? '공명 해방'
    : x === 'intro'
    ? '변주 스킬'
    : x === 'dmg'
    ? '모든 피해'
    : undefined;
};
