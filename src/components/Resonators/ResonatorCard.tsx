import { echoThumbnailControl } from '..';
import ResonatorCardUpper, { getMyHarmony } from './CardUpper';
import { useMyEchoInfoSet } from '../useMyEchoInfoSet';
import { dispatch } from '../../store';
import { changeSubPage, selectDetail } from '../../slice/grobalSlice';
import { MyResonator } from '../../slice/resonatorsSlice';
import { MyEcho } from '../../slice/echoesSlice';
import { EchoPrimaryMainStats, ResonatorName, getStatsAbbr } from '../../types';
import { getPercent } from '../../lib/formula';
import { EchoCode } from '../../lib/Echoes';
import styles from './ResonatorCard.module.css';

export default function ResonatorCard({
  resonatorName,
  info,
}: {
  resonatorName: ResonatorName;
  info: MyResonator;
}) {
  const myEchoInfoes = useMyEchoInfoSet(resonatorName);
  const myHarmony = getMyHarmony(myEchoInfoes);
  const resonatorLevel = info['레벨'];
  return (
    <div
      className={styles.card}
      style={{ order: Number(100 - resonatorLevel) }}
      key={resonatorName}
      onClick={() => {
        dispatch(selectDetail(resonatorName));
        dispatch(changeSubPage('상세'));
      }}
    >
      <ResonatorCardUpper name={resonatorName} info={info} />
      <div className={styles.bottom}>
        <div className={styles.echoes}>
          {myEchoInfoes.map((echoInfo, i) => {
            let c: EchoCode | undefined;
            let m: EchoPrimaryMainStats | undefined;
            let s: MyEcho['서브 스텟'] = {};
            if (echoInfo) {
              c = echoInfo['코드'];
              m = getStatsAbbr(echoInfo['메인 스텟']) as EchoPrimaryMainStats;
              s = echoInfo['서브 스텟'];
            }
            return (
              <div className={styles.echo} key={i}>
                <div className={styles.echoImgBox}>{echoThumbnailControl(c)}</div>
                <div className={styles.echoOpt}>
                  <div className={styles.main}>
                    <span>{m}</span>
                  </div>
                  {(['s1', 's2', 's3', 's4', 's5'] as const)
                    .filter((i) => s[i])
                    .map((i) => {
                      const subOpt = s[i];
                      return (
                        <div className={styles.sub} key={i}>
                          <span>{subOpt ? getStatsAbbr(subOpt.stat) : ''}</span>
                          <span>
                            {subOpt
                              ? subOpt.value < 1
                                ? getPercent(subOpt.value)(2)
                                : subOpt.value.toString()
                              : ''}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.harmonyContainer}>
          {Object.entries(myHarmony).map(([h, c]) => {
            return (
              <div className={styles.harmony} key={h + 'x' + c} data-set={c}>
                <span>{h}</span>
                <span>{c === 5 ? 5 : 2}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
