export default function SelectNumber({
  min,
  max,
  defaultValue,
  onChange,
}: {
  min: number;
  max: number;
  defaultValue: number;
  onChange: (x: number) => void;
}) {
  let innerOption = [];
  for (let i = min; i <= max; i++) {
    innerOption.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => {
        onChange(Number(e.target.value));
      }}
    >
      {innerOption}
    </select>
  );
}
