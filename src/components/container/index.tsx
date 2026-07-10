import cx from 'classnames'

export interface ContainerProps {
  children: React.ReactNode | React.ReactNode[]
  variant?: 'default' | 'primary'
}
export function Container({
  children,
  variant: type = 'default'
}: ContainerProps) {
  return (
    <div
      className={cx(
        'mb-8 rounded-2xl bg-linear-to-r shadow-xl sm:p-8',
        type === 'default' && 'bg-white',
        type === 'primary' &&
          'from-indigo-600 to-violet-600 p-6 text-white shadow-indigo-100'
      )}>
      <div className="max-w-2xl">{children}</div>
    </div>
  )
}
