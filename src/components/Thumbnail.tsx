import { everyEchoData } from '../lib/Echoes';
import { EchoCode, EveryResonatorName, EveryWeaponCode, Name, weaponPivot } from '../types';

export default function Thumbnail<T extends EveryResonatorName | EveryWeaponCode | EchoCode>({
  scope,
  code,
}: {
  scope: 'Resonators' | 'Weapons' | 'Echoes';
  code: T;
}) {
  let alt: string = code;
  if (scope === 'Weapons') {
    alt = weaponPivot[code as EveryWeaponCode] as Name;
  } else if (scope === 'Echoes') {
    alt = everyEchoData[code as EchoCode]?.name as Name;
  }
  return (
    <img
      src={`${process.env.PUBLIC_URL}/img/${scope}/${code}.png`}
      alt={alt}
      style={{ width: '100%' }}
    />
  );
}
