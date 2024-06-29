import { EchoCode, everyEchoData } from '../lib/Echoes';
import { WeaponCode, everyWeaponData } from '../lib/Weapons';
import { ResonatorName, Name } from '../types';

const thumbnailControl = (scope: 'Resonators' | 'Weapons' | 'Echoes') => {
  return (code?: ResonatorName | WeaponCode | EchoCode) => {
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
  code: ResonatorName | WeaponCode | EchoCode;
}) {
  let alt: string = code;
  if (scope === 'Weapons') {
    alt = everyWeaponData[code as unknown as WeaponCode].getName();
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
