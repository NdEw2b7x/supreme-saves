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
        backgroundColor: 'rgba(0, 0, 0, 0.99)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          borderRadius: '0.25rem',
          overflow: 'hidden',
          backgroundColor: 'var(--theme-color-alpha-200)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          width: '20rem',
        }}
      >
        {children}
      </div>
    </section>
  );
}
