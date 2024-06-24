import { ReactNode } from 'react';

export default function RadioBtn({
  name,
  id,
  child,
}: {
  name: string;
  id: string;
  child: ReactNode;
}) {
  return (
    <label htmlFor={id}>
      <span>{child}</span>
      <input type='radio' name={name} id={id} />
    </label>
  );
}
