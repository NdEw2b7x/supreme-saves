import { EveryResonatorName } from '../types';
import Thumbnail from './Thumbnail';

export default function SelectResonator({
  list,
  defaultValue,
  onChange,
}: {
  list: EveryResonatorName[];
  defaultValue?: EveryResonatorName;
  onChange: (name: EveryResonatorName) => void;
}) {
  let thumbnail = <img alt='' />;
  if (defaultValue) {
    thumbnail = <Thumbnail scope='Resonators' code={defaultValue} />;
  }
  return (
    <div className='SelectResonatorContainer'>
      <select
        defaultValue={defaultValue}
        onChange={({ target: { value } }) => {
          onChange(value as EveryResonatorName);
        }}
      >
        <option value='미장착'>미장착</option>
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
