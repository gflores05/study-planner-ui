import type { MouseEventHandler } from 'react'
import cx from 'classnames'

interface ButtonProps {
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  variant?: 'default' | 'primary' | 'inverted' | 'success'
  size?: 'normal' | 'medium' | 'small' | 'icon'
  title?: string
  disabled?: boolean
  type?: 'submit' | 'reset' | 'button'
  form?: string
}

export function Button({
  onClick,
  children,
  title,
  variant = 'default',
  size = 'normal',
  disabled,
  type,
  form
}: ButtonProps) {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      form={form}
      className={cx(
        'inline-flex items-center rounded-xl transition-colors',
        variant === 'default' &&
          !disabled &&
          'bg-white text-slate-600 shadow-sm hover:bg-slate-50 border border-slate-200',
        variant === 'primary' &&
          'bg-indigo-600 text-white shadow-md shadow-indigo-100 hover:bg-indigo-700',
        variant === 'inverted' &&
          'bg-white text-indigo-600 shadow-sm hover:bg-indigo-50',
        variant === 'success' &&
          'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10',
        size === 'normal' && 'gap-2 px-6 py-3 text-sm font-semibold ',
        size === 'medium' && 'gap-2 px-4 py-2.5 text-sm font-semibold',
        size === 'small' && 'shrink-0 px-4 py-2 text-xs font-bold',
        size === 'icon' && 'p-2',
        disabled && 'bg-slate-100 text-slate-400 cursor-not-allowed'
      )}>
      {children}
    </button>
  )
}
