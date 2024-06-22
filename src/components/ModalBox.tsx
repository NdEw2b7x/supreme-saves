import { ReactNode } from 'react';

export default function ModalBox({ children }: { children: ReactNode }) {
  return (
    <section
      data-section='ModalBox'
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </section>
  );
}
