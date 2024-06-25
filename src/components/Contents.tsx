import { useSelector } from 'react-redux';
import { State } from '../store';
import { Echoes, ResonatorDetail, Resonators, System, Weapons, genByWeapon } from './';
import { everyResonatorData } from '../lib/Resonators';
import { EveryWeaponAtk1, EveryWeaponCode, ResonatorName } from '../types';
import { WeaponId } from '../slice/weaponsSlice';
import { getATK, getDEF, getHP, getWeaponAtk } from '../lib/formula';
import { everyWeaponData } from '../lib/Weapons';

export default function Contents() {
  const myResonators = useSelector((state: State) => state.resonatorsSlice['공명자']);
  const myWeapons = useSelector((state: State) => state.weaponsSlice['무기']);
  const equipWeapons = useSelector((state: State) => state.weaponsSlice['장착']);
  const resolist = Object.keys(myResonators).map((name) => {
    const resoData = everyResonatorData[name as ResonatorName];
    const resoLevel = myResonators[name as ResonatorName]?.레벨;
    return [
      name,
      Object.assign(
        {},
        { baseHp: getHP(resoData.hp1)(resoLevel as number) },
        {
          baseAtk:
            getATK(resoData.atk1)(resoLevel as number) +
            genByWeapon(myWeapons)(equipWeapons[name as ResonatorName])[0],
        },
        { baseDef: getDEF(resoData.def1)(resoLevel as number) },
        genByWeapon(myWeapons)(equipWeapons[name as ResonatorName])[1],
        everyResonatorData[name as ResonatorName],
        myResonators[name as ResonatorName],
        myWeapons[equipWeapons[name as ResonatorName] as WeaponId]?.레벨,
        getWeaponAtk(
          everyWeaponData[
            myWeapons[equipWeapons[name as ResonatorName] as WeaponId]?.코드 as EveryWeaponCode
          ]?.atk1 as EveryWeaponAtk1
        )(myWeapons[equipWeapons[name as ResonatorName] as WeaponId]?.레벨 as number)
      ),
    ] as const;
  });
  console.log(resolist);

  const page = useSelector((state: State) => state.grobalSlice.page);
  const subPage = useSelector((state: State) => state.grobalSlice.subPage);

  switch (page) {
    case '공명자':
      switch (subPage) {
        case '상세':
          return <ResonatorDetail />;
        default:
          return <Resonators />;
      }
    case '무기':
      return <Weapons />;
    case '에코':
      return <Echoes />;
    default:
      return <System />;
  }
}
