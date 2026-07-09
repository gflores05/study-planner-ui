import cx from 'classnames'
import type React from 'react'

interface CardProps {
  hover?: boolean
  selected?: boolean
  disabled?: boolean
  compact?: boolean
  children: React.ReactNode
}
export function Card({
  selected,
  hover,
  disabled,
  compact,
  children
}: CardProps) {
  return (
    <div
      className={cx(
        'rounded-xl border bg-white p-6 shadow-sm',
        !selected && 'border-slate-200',
        hover && 'transition-all hover:shadow-md',
        selected && 'border-2 border-indigo-600 ring-1 ring-indigo-100',
        disabled && 'opacity-70',
        compact && 'sm:p-8'
      )}>
      {children}
    </div>
  )
}
