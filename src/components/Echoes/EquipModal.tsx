import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { EchoId, changeEquip } from '../../slice/echoesSlice';
import { EveryResonatorName } from '../../types';
import { ModalBox, RadioBtn, SelectResonator, Thumbnail } from '..';
import styles from './EquipModal.module.css';

export default function EquipModal({ id, close }: { id: EchoId; close: () => void }) {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const [selectedEquip, setSelectedEquip] = useState<EveryResonatorName>();
  const [selectedSlot, setSelectedSlot] = useState<1 | 2 | 3 | 4 | 5 | undefined>();

  return (
    <ModalBox key='EchoEquip'>
      <div className={styles.equipHeader}>
        <div className={styles.title}>장착할 공명자</div>
        <SelectResonator
          list={Object.keys(myResonators) as EveryResonatorName[]}
          defaultValue={selectedEquip}
          onChange={(name) => {
            setSelectedEquip(name);
          }}
        />
      </div>
      <div className={styles.equipBody}>
        <div className={styles.title}>장착할 슬롯</div>
        <div className={styles.slotContainer}>
          {([1, 2, 3, 4, 5] as const).map((i) => {
            return (
              <RadioBtn
                name='subSlot'
                id={'subSlot' + i}
                key={'subSlot' + i}
                onChange={() => {
                  setSelectedSlot(i);
                }}
              >
                <div
                  style={{
                    borderRadius: '100%',
                    overflow: 'hidden',
                    width: '2.5rem',
                    height: '2.5rem',
                    alignSelf: 'center',
                    backgroundColor: 'var(--theme-color-alpha-400)',
                  }}
                >
                  <Thumbnail scope='Echoes' code='G01' />
                </div>
                <span>{i}</span>
              </RadioBtn>
            );
          })}
        </div>
      </div>
      <div className={styles.equipFooter}>
        <input
          type='button'
          className={styles.save}
          value='확인'
          onClick={() => {
            if (selectedSlot && selectedEquip) {
              dispatch(changeEquip({ id, equip: { name: selectedEquip, slot: selectedSlot } }));
              setSelectedSlot(undefined);
              close();
            }
          }}
        />
        <input
          type='button'
          className={styles.cancel}
          value='취소'
          onClick={() => {
            setSelectedSlot(undefined);
            close();
          }}
        />
      </div>
    </ModalBox>
  );
}
