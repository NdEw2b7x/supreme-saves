import { useState } from 'react';
import { Thumbnail } from '.';
import {
  ResonatorCode,
  ResonatorCode_,
  codeConverter,
  everyResonatorData,
} from '../lib/Resonators';

export default function SelectResonator({
  list,
  defaultValue,
  nonEquip,
  onChange,
}: {
  list: ResonatorCode[];
  defaultValue?: ResonatorCode_;
  nonEquip: boolean;
  onChange: (name: ResonatorCode_) => void;
}) {
  const [thumbnailOwner, setThumbnailOwner] = useState<ResonatorCode_ | undefined>(defaultValue);
  return (
    <div className='SelectResonatorContainer'>
      <select
        defaultValue={defaultValue}
        onChange={({ target: { value } }) => {
          setThumbnailOwner(value as ResonatorCode_);
          onChange(value as ResonatorCode_);
        }}
      >
        {nonEquip ? <option value='미장착'>미장착</option> : undefined}
        {(list as ResonatorCode[]).map((code) => (
          <option value={codeConverter(code)} key={code}>
            {everyResonatorData[code].name}
          </option>
        ))}
      </select>
      <div className='ThumbnailContainer'>
        {thumbnailOwner ? <Thumbnail scope='Resonators' code={thumbnailOwner} /> : <img alt='' />}
      </div>
    </div>
  );
}
