import { ReactNode } from 'react';

export default function RadioBtn({
  name,
  id,
  defaultChecked,
  children,
  onChange,
}: {
  name: string;
  id: string;
  defaultChecked: boolean;
  children: ReactNode;
  onChange: () => void;
}) {
  return (
    <label htmlFor={id} className='RadioBtn'>
      {children}
      <input type='radio' name={name} id={id} onChange={onChange} defaultChecked={defaultChecked} />
    </label>
  );
}
