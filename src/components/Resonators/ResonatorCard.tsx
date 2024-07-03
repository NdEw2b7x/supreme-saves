import { echoThumbnailControl } from '..';
import ResonatorCardUpper, { getMyHarmony } from './CardUpper';
import { useMyEchoInfoSet } from '../useMyEchoInfoSet';
import { State, dispatch } from '../../store';
import { changeSubPage, selectDetail } from '../../slice/grobalSlice';
import { MyResonator } from '../../slice/resonatorsSlice';
import { EchoEquipSlot, MyEcho } from '../../slice/echoesSlice';
import { mapStatsNameAbbr } from '../../types';
import { getPercent } from '../../lib/formula';
import { EchoCode } from '../../lib/Echoes';
import styles from './ResonatorCard.module.css';
import { everyResonatorData, isRover } from '../../lib/Resonators';
import { useSelector } from 'react-redux';

export default function ResonatorCard({ myResonator }: { myResonator: MyResonator }) {
  const roverElement = useSelector((state: State) => state.resonatorsSlice['element']);
  const code = myResonator['코드'];
  const level = myResonator['레벨'];
  const data = everyResonatorData[code];
  const element = data.element;
  const myEchoInfoes = useMyEchoInfoSet(code);
  const myHarmony = getMyHarmony(myEchoInfoes);

  return !isRover(code) || (isRover(code) && element === roverElement) ? (
    <div
      className={styles.card}
      style={{ order: Number(100 - level) }}
      key={code}
      onClick={() => {
        dispatch(selectDetail(code));
        dispatch(changeSubPage('상세'));
      }}
    >
      <ResonatorCardUpper myResonator={myResonator} />
      <div className={styles.bottom}>
        <div className={styles.echoes}>
          {myEchoInfoes.map((echoInfo, i) => {
            let c: EchoCode | undefined;
            let m: string = '';
            let s: MyEcho['서브 스텟'] = {};
            if (echoInfo) {
              c = echoInfo['코드'];
              m = mapStatsNameAbbr[echoInfo['메인 스텟']];
              s = echoInfo['서브 스텟'];
            }
            return (
              <div className={styles.echo} key={i}>
                <div className={styles.echoImgBox}>{echoThumbnailControl(c)}</div>
                <div className={styles.echoOpt}>
                  <div className={styles.main}>
                    <span>{m}</span>
                  </div>
                  {([1, 2, 3, 4, 5] as EchoEquipSlot[])
                    .filter((i) => s[i])
                    .map((i) => {
                      const subOpt = s[i];
                      return (
                        <div className={styles.sub} key={i}>
                          <span>{subOpt ? mapStatsNameAbbr[subOpt.stat] : ''}</span>
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
  ) : null;
}
