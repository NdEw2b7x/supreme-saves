import { useState } from 'react';
import { ResonatorName } from '../types';
import Thumbnail from './Thumbnail';

export default function SelectResonator({
  list,
  defaultValue,
  nonEquip,
  onChange,
}: {
  list: ResonatorName[];
  defaultValue?: ResonatorName;
  nonEquip: boolean;
  onChange: (name: ResonatorName) => void;
}) {
  const [thumbnailOwner, setThumbnailOwner] = useState<ResonatorName | undefined>(defaultValue);
  let thumbnail = <img alt='' />;
  if (thumbnailOwner) {
    thumbnail = <Thumbnail scope='Resonators' code={thumbnailOwner} />;
  }
  let nonEquipOption = <></>;
  if (nonEquip) {
    nonEquipOption = <option value='미장착'>미장착</option>;
  }
  return (
    <div className='SelectResonatorContainer'>
      <select
        defaultValue={defaultValue}
        onChange={({ target: { value } }) => {
          setThumbnailOwner(value as ResonatorName);
          onChange(value as ResonatorName);
        }}
      >
        {nonEquipOption}
        {list.map((name) => {
          return (
            <option value={name} key={name}>
              {name}
            </option>
          );
        })}
      </select>
      <div className='ThumbnailContainer'>{thumbnail}</div>
    </div>
  );
}
