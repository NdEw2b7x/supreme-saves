import { echoThumbnailControl } from '..';
import ResonatorCardUpper, { getMyEchoInfoes } from './CardUpper';
import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { changeSubPage, selectDetail } from '../../slice/grobalSlice';
import { MyResonator } from '../../slice/resonatorsSlice';
import { MyEcho } from '../../slice/echoesSlice';
import { EchoCode, EchoPrimaryMainStats, EveryResonatorName, getStatsAbbr } from '../../types';
import { getPercent } from '../../lib/formula';
import styles from './ResonatorCard.module.css';

export default function ResonatorCard({
  resonatorName,
  info,
}: {
  resonatorName: EveryResonatorName;
  info: MyResonator;
}) {
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코']);
  const equipEchoes = useSelector((state: State) => state.echoesSlice['장착']);
  const myEchoInfoes = getMyEchoInfoes(myEchoes)(equipEchoes)(resonatorName);

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
      <ResonatorCardUpper resonatorName={resonatorName} info={info} />
      <div className={styles.bottom}>
        <div className={styles.echoes}>
          {myEchoInfoes.map((echoInfo, i) => {
            let code: EchoCode | undefined;
            let main: EchoPrimaryMainStats | undefined;
            let sub: MyEcho['서브 스텟'] = {};
            if (echoInfo) {
              code = echoInfo['코드'];
              main = getStatsAbbr(echoInfo['메인 스텟']) as EchoPrimaryMainStats;
              sub = echoInfo['서브 스텟'];
            }
            return (
              <div className={styles.echo} key={`${resonatorName} ${i}`}>
                <div className={styles.echoImgBox}>{echoThumbnailControl(code)}</div>
                <div className={styles.echoOpt}>
                  <div className={styles.main}>
                    <span>{main}</span>
                  </div>
                  {(['s1', 's2', 's3', 's4', 's5'] as const)
                    .filter((i) => {
                      const subOpt = sub[i];
                      if (subOpt) {
                        return true;
                      }
                      return false;
                    })
                    .map((i) => {
                      let optName = '';
                      const subOpt = sub[i];
                      if (subOpt) {
                        let optValue = subOpt.value.toString();
                        if (subOpt.value < 1) {
                          optValue = getPercent(subOpt.value)(2);
                        }
                        optName = getStatsAbbr(subOpt.stat);
                        return (
                          <div className={styles.sub} key={i}>
                            <span>{optName}</span>
                            <span>{optValue}</span>
                          </div>
                        );
                      }
                      return undefined;
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
