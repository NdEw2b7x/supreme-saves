import { ReactNode } from 'react';

export default function RadioBtn({
  name,
  id,
  children,
  onChange,
}: {
  name: string;
  id: string;
  children: ReactNode;
  onChange: () => void;
}) {
  return (
    <label htmlFor={id} className='RadioBtn'>
      {children}
      <input type='radio' name={name} id={id} onChange={onChange} />
    </label>
  );
}
