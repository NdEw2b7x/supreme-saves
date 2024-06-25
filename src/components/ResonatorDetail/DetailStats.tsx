import { genByMinorForte, genByWeapon } from '..';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { ResonatorName, getElementMap } from '../../types';
import { getATK, getDEF, getHP, getPercent } from '../../lib/formula';
import { everyResonatorData } from '../../lib/Resonators';
import styles from './ResonatorDetail.module.css';

export function DetailStats({ name, level }: { name: ResonatorName; level: number }) {
  const weaponMapping = useSelector((state: State) => state.weaponsSlice['장착']);
  const weaponId = weaponMapping[name];
  const data = everyResonatorData[name];
  const element = data.element;
  const [, byMinorForte] = genByMinorForte(
    useSelector((state: State) => state.resonatorsSlice['공명자'])
  )(name);
  const [weaponAtk, byWeapon] = genByWeapon(
    useSelector((state: State) => state.weaponsSlice['무기'])
  )(weaponId);
  return (
    <div className={styles.statistics}>
      <div>
        <span>HP</span>
        <span>
          <span>
            {(getHP(data.hp1)(level) * (1 + byWeapon.hp + byMinorForte.hp / 100)).toFixed(3)}
          </span>
          <span style={{ fontSize: 'smaller' }}>
            &nbsp;({Math.floor(getHP(data.hp1)(level))}&nbsp;+&nbsp;
            {Math.floor(getHP(data.hp1)(level) * (byWeapon.hp + byMinorForte.hp))})
          </span>
        </span>
      </div>
      <div>
        <span>공격력</span>
        <span>
          <span>
            {(
              (getATK(data.atk1)(level) + weaponAtk) *
              (1 + byWeapon.atk + byMinorForte.atk)
            ).toFixed(3)}
          </span>
          <span style={{ fontSize: 'smaller' }}>
            &nbsp;({Math.floor(getATK(data.atk1)(level) + weaponAtk)}
            &nbsp;+&nbsp;
            {Math.floor((getATK(data.atk1)(level) + weaponAtk) * (byWeapon.atk + byMinorForte.atk))}
            )
          </span>
        </span>
      </div>
      <div>
        <span>방어력</span>
        <span>
          <span>
            {(getDEF(data.def1)(level) * (1 + byWeapon.def + byMinorForte.def)).toFixed(3)}
          </span>
          <span style={{ fontSize: 'smaller' }}>
            &nbsp;({Math.floor(getDEF(data.def1)(level))}
            &nbsp;+&nbsp;
            {Math.floor(getDEF(data.def1)(level) * (byWeapon.def + byMinorForte.def))})
          </span>
        </span>
      </div>
      <div>
        <span>공명 효율</span>
        <span>{getPercent(1 + byWeapon.energy)(2)}</span>
      </div>
      <div>
        <span>{element} 피해 보너스</span>
        <span>{getPercent(byMinorForte[getElementMap(element)])(2)}</span>
      </div>
      <div>
        <span>크리티컬 확률</span>
        <span>{getPercent(0.05 + byWeapon.cRate + byMinorForte.cRate)(3)}</span>
      </div>
      <div>
        <span>크리티컬 피해</span>
        <span>{getPercent(1.5 + byWeapon.cDmg + byMinorForte.cDmg)(3)}</span>
      </div>
    </div>
  );
}
