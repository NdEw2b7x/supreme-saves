import { useState } from 'react';
import { ModalBox } from '..';
import { dispatch } from '../../store';
import { EchoEquipSlot, EchoId, MyEcho, changeSubStat } from '../../slice/echoesSlice';
import { EchoSubStats, mapStatsName } from '../../types';
import { echoSubStatValues } from '../../lib/formula';
import styles from './EchoesListSubAddModal.module.css';

export default function EchoesListSubAddModal({
  id,
  subSlotNumber,
  myEcho,
  close,
}: {
  id: EchoId;
  subSlotNumber: EchoEquipSlot;
  myEcho: MyEcho;
  close: () => void;
}) {
  const [selectedSubStat, setSelectdSubStat] = useState<EchoSubStats>();
  const [selectedSubValue, setSelectdSubValue] = useState<number>(0);

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
              'liberation',
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
                  <span>{mapStatsName[stat]}</span>
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
          {selectedSubStat
            ? echoSubStatValues[selectedSubStat].map((v) => {
                const n = Number(v);
                let output = n.toString();
                if (n < 1) {
                  output = Math.ceil(n * 1000) / 10 + '%';
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
              })
            : undefined}
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
                    order: subSlotNumber,
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
