import { ResonatorCode_ } from '../lib/Resonators';
import { WeaponCode, everyWeaponData } from '../lib/Weapons';
import { EchoCode, everyEchoData } from '../lib/Echoes';
import { Name } from '../types';

const thumbnailControl = (scope: 'Resonators' | 'Weapons' | 'Echoes') => {
  return (code?: ResonatorCode_ | WeaponCode | EchoCode) => {
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
  code: ResonatorCode_ | WeaponCode | EchoCode;
}) {
  switch (scope) {
    case 'Resonators':
      return (
        <img
          src={`${process.env.PUBLIC_URL}/img/Resonators/${code}.png`}
          alt={code}
          style={{ width: '100%' }}
        />
      );
    case 'Weapons':
      return (
        <img
          src={`${process.env.PUBLIC_URL}/img/Weapons/${code}.png`}
          alt={everyWeaponData[code as unknown as WeaponCode].getName()}
          style={{ width: '100%' }}
        />
      );
    case 'Echoes':
      return (
        <img
          src={`${process.env.PUBLIC_URL}/img/Echoes/${code}.png`}
          alt={everyEchoData[code as EchoCode]?.name as Name}
          style={{ width: '100%' }}
        />
      );
  }
}
