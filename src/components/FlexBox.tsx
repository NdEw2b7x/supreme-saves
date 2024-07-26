import { ReactNode } from 'react'

export default function FlexBox({
  children,
  vertical,
  gap,
  alignItems,
  alpha,
}: {
  children: ReactNode
  vertical: boolean
  gap: 0.25 | 0.5 | 0.75 | 1
  alignItems: 'center' | 'space-between'
  alpha: 2 | 4 | 6 | 8
}) {
  let direction: 'row' | 'column' = 'row'
  if (vertical) {
    direction = 'column'
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        borderRadius: gap + 'rem',
        gap,
        alignItems,
        backgroundColor: 'var(--theme-color-alpha-' + alpha + '00)',
      }}
    >
      {children}
    </div>
  )
}
