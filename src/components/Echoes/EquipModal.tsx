import { useState } from 'react';
import { ModalBox, RadioBtn, SelectResonator, Thumbnail } from '..';
import { useSelector } from 'react-redux';
import { State, dispatch } from '../../store';
import { EchoEquipSlot, EchoId, changeEquip } from '../../slice/echoesSlice';
import { ResonatorCode, ResonatorCode_, everyResonatorData, isRover } from '../../lib/Resonators';
import { EchoCode } from '../../lib/Echoes';
import styles from './EquipModal.module.css';

export default function EquipModal({ id, close }: { id: EchoId; close: () => void }) {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myEchoes = Object.fromEntries(
    useSelector((state: State) => state.echoesSlice['에코']).map((i) => [i['식별'], i])
  );
  const equipEchoes = useSelector((state: State) => state.echoesSlice['장착']);
  const roverElement = useSelector((state: State) => state.resonatorsSlice.element);

  const myEcho = myEchoes[id];
  const currentSlot = myEcho['장착']['슬롯'];
  const [selectedEquip, setSelectedEquip] = useState<ResonatorCode_ | ''>(myEcho['장착']['공명자']);
  const [selectedSlot, setSelectedSlot] = useState<EchoEquipSlot>(
    currentSlot !== 0 ? currentSlot : 1
  );

  const equipEchoCode = (x?: ResonatorCode_, y?: EchoEquipSlot): EchoCode | undefined => {
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

  const selectDefault = selectedEquip !== '' ? selectedEquip : undefined;
  return (
    <ModalBox key='EchoEquip'>
      <div className={styles.equipBody}>
        <div className={styles.title}>장착할 공명자</div>
        <SelectResonator
          list={myResonators
            .map((i) => i['코드'] as ResonatorCode)
            .filter((code) => !isRover(code) || everyResonatorData[code].element === roverElement)}
          defaultValue={selectDefault}
          nonEquip={selectedEquip === ''}
          onChange={(name) => {
            setSelectedEquip(name);
          }}
        />
        <div className={styles.title}>장착할 슬롯</div>
        <div className={styles.slotContainer}>
          {([1, 2, 3, 4, 5] as const).map((i) => {
            let defaultChecked = false;
            if (i === currentSlot) {
              defaultChecked = true;
            }
            return (
              <div key={i}>
                <RadioBtn
                  defaultChecked={defaultChecked}
                  name='subSlot'
                  id={'subSlot' + i + selectedEquip}
                  key={'subSlot' + i + selectedEquip}
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
                </RadioBtn>
              </div>
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
              close();
            }
          }}
        />
        <input
          type='button'
          className={styles.cancel}
          value='취소'
          onClick={() => {
            close();
          }}
        />
      </div>
    </ModalBox>
  );
}
