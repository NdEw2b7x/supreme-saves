import { everyEchoData } from '../lib/Echoes';
import { everyWeaponData } from '../lib/Weapons';
import { EchoCode, ResonatorName, EveryWeaponCode, Name } from '../types';

const thumbnailControl = (scope: 'Resonators' | 'Weapons' | 'Echoes') => {
  return (code?: ResonatorName | EveryWeaponCode | EchoCode) => {
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
  code: ResonatorName | EveryWeaponCode | EchoCode;
}) {
  let alt: string = code;
  if (scope === 'Weapons') {
    alt = everyWeaponData[code as unknown as EveryWeaponCode]?.getName() as Name;
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
