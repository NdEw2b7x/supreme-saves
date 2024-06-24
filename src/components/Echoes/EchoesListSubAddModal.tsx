import { useState } from 'react';
import { ModalBox } from '..';
import { dispatch } from '../../store';
import { EchoSubStats, getStatsName } from '../../types';
import { getPercent } from '../../lib/formula';
import { EchoId, MyEcho, changeSubStat } from '../../slice/echoesSlice';
import styles from './EchoesListSubAddModal.module.css';

export default function EchoesListSubAddModal({
  id,
  subSlotNumber,
  myEcho,
  close,
}: {
  id: EchoId;
  subSlotNumber: 1 | 2 | 3 | 4 | 5;
  myEcho: MyEcho;
  close: () => void;
}) {
  const [selectedSubStat, setSelectdSubStat] = useState<EchoSubStats>();
  const [selectedSubValue, setSelectdSubValue] = useState<number>(0);

  const getSubValues = (x?: EchoSubStats) => {
    switch (x) {
      case 'flatHp':
        return [320, 360, 390, 430, 470, 510, 540, 580];
      case 'flatAtk':
        return [30, 40, 50];
      case 'flatDef':
        return [40, 50, 60];
      case 'def':
        return [0.081, 0.09, 0.1, 0.109, 0.118, 0.128, 0.138, 0.147];
      case 'energy':
        return [0.068, 0.076, 0.084, 0.092, 0.1, 0.108, 0.116, 0.124];
      case 'cRate':
        return [0.063, 0.069, 0.075, 0.081, 0.087, 0.093, 0.099, 0.105];
      case 'cDmg':
        return [0.126, 0.138, 0.15, 0.162, 0.174, 0.186, 0.198, 0.21];
      default:
        return [0.064, 0.071, 0.079, 0.086, 0.094, 0.101, 0.109, 0.116];
    }
  };
  return (
    <ModalBox>
      <div className={styles.modalHeader}>{subSlotNumber}번 서브 속성</div>
      <div className={styles.modalBody}>
        <div className={styles.statsBox}>
          {(
            [
              'flatHp',
              'flatAtk',
              'flatDef',
              'hp',
              'atk',
              'def',
              'energy',
              'cRate',
              'cDmg',
              'basic',
              'heavy',
              'skill',
              'burst',
            ] as EchoSubStats[]
          ).map((stat) => {
            const defaultcheck = (x: EchoSubStats) => {
              if (selectedSubStat === x) {
                return true;
              } else {
                return false;
              }
            };
            let show = true;
            const exclude: EchoSubStats[] = Object.values(myEcho['서브 스텟'])
              .filter((i) => {
                if (i) {
                  return true;
                }
                return false;
              })
              .map((i) => {
                return i.stat;
              });
            exclude.forEach((i) => {
              if (i === stat) {
                show = false;
              }
            });
            if (show) {
              return (
                <label htmlFor={'new' + stat} key={stat}>
                  <span>{getStatsName(stat)}</span>
                  <input
                    type='radio'
                    name='newSub'
                    id={'new' + stat}
                    defaultChecked={defaultcheck(stat)}
                    value={stat}
                    onChange={(e) => {
                      setSelectdSubStat(e.target.value as EchoSubStats);
                    }}
                  />
                </label>
              );
            }
            return null;
          })}
        </div>
        <div className={styles.valueBox}>
          {getSubValues(selectedSubStat).map((v) => {
            const n = Number(v);
            let output = n.toString();
            if (n < 1) {
              output = getPercent(n)(1);
            }
            return (
              <label htmlFor={'new' + v} key={v}>
                <span>{output}</span>
                <input
                  type='radio'
                  name={'newSubValue'}
                  id={'new' + v}
                  value={v}
                  onChange={(e) => {
                    setSelectdSubValue(Number(e.target.value));
                  }}
                />
              </label>
            );
          })}
        </div>
      </div>
      <div className={styles.modalFooter}>
        <input
          className={styles.save}
          type='button'
          value='저장'
          onClick={() => {
            if (selectedSubValue > 0) {
              if (selectedSubStat) {
                dispatch(
                  changeSubStat({
                    id,
                    order: `s${subSlotNumber}`,
                    stat: selectedSubStat,
                    value: selectedSubValue,
                  })
                );
              }
              setSelectdSubStat(undefined);
              close();
            } else {
              alert('값을 선택해주세요.');
            }
          }}
        />
        <input
          className={styles.cancel}
          type='button'
          value='취소'
          onClick={() => {
            close();
          }}
        />
      </div>
    </ModalBox>
  );
}
