import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { EchoEquipSlot, EchoId, MyEcho, changeEquip } from '../../slice/echoesSlice';
import { EchoCode, EveryResonatorName } from '../../types';
import { ModalBox, RadioBtn, SelectResonator, Thumbnail } from '..';
import styles from './EquipModal.module.css';

export default function EquipModal({ id, close }: { id: EchoId; close: () => void }) {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myEchoes = useSelector((state: State) => state.echoesSlice['에코']);
  const equipEchoes = useSelector((state: State) => state.echoesSlice['장착']);

  const myEcho = myEchoes[id] as MyEcho;
  const [selectedEquip, setSelectedEquip] = useState<EveryResonatorName | '미장착'>(
    myEcho['장착']['공명자']
  );
  const [selectedSlot, setSelectedSlot] = useState<EchoEquipSlot>();

  const equipEchoCode = (x?: EveryResonatorName, y?: EchoEquipSlot) => {
    if (x && y) {
      const id = equipEchoes[x]?.[y];
      if (id) {
        return myEchoes[id]?.코드;
      }
    }
  };

  const thumbnailSwitch = (x?: EchoCode) => {
    if (x) {
      return <Thumbnail scope='Echoes' code={x} />;
    }
  };

  let selectDefault: EveryResonatorName | undefined;
  if (selectedEquip !== '미장착') {
    selectDefault = selectedEquip;
  }
  const currentSlot = myEcho['장착']['슬롯'];
  return (
    <ModalBox key='EchoEquip'>
      <div className={styles.equipHeader}>
        <div className={styles.title}>장착할 공명자</div>
        <SelectResonator
          list={Object.keys(myResonators) as EveryResonatorName[]}
          defaultValue={selectDefault}
          onChange={(name) => {
            setSelectedEquip(name);
            setSelectedSlot(undefined);
          }}
        />
      </div>
      <div className={styles.equipBody}>
        <div className={styles.title}>장착할 슬롯</div>
        <div className={styles.slotContainer}>
          {([1, 2, 3, 4, 5] as const).map((i) => {
            let defaultChecked = false;
            if (i === currentSlot) {
              defaultChecked = true;
            }
            return (
              <RadioBtn
                defaultChecked={defaultChecked}
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
                  {thumbnailSwitch(equipEchoCode(selectDefault, i))}
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
