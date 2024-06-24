import { everyEchoData } from '../lib/Echoes';
import { EchoCode, EveryResonatorName, EveryWeaponCode, Name, weaponPivot } from '../types';

const thumbnailControl = (scope: 'Resonators' | 'Weapons' | 'Echoes') => {
  return (code?: EveryResonatorName | EveryWeaponCode | EchoCode) => {
    if (code) {
      return <Thumbnail scope={scope} code={code} />;
    }
  };
};

export const weaponThumbnailControl = thumbnailControl('Weapons');
export const echoThumbnailControl = thumbnailControl('Echoes');

export default function Thumbnail({
  scope,
  code,
}: {
  scope: 'Resonators' | 'Weapons' | 'Echoes';
  code: EveryResonatorName | EveryWeaponCode | EchoCode;
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
