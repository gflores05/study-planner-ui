import cx from 'classnames'
import { Title } from '../title'

export interface ContainerProps {
  children: React.ReactNode | React.ReactNode[]
  variant?: 'default' | 'primary'
  alignContent?: 'center' | 'end' | 'start'
  title?: string
  subtitle?: string
}
export function Content({
  children,
  alignContent,
  title,
  subtitle,
  variant = 'default'
}: ContainerProps) {
  if (title) {
    return (
      <div className="lg:col-span-2 space-y-6">
        <Title title={title} subtitle={subtitle} />
        <div
          className={cx(
            'mb-8 rounded-2xl bg-linear-to-r shadow-xl sm:p-8 w-full',
            variant === 'default' && 'bg-white',
            variant === 'primary' &&
              'from-indigo-600 to-violet-600 p-6 text-white shadow-indigo-100',
            alignContent === 'center' && 'flex justify-center'
          )}>
          <div
            className={cx(
              'max-w-2xl w-full',
              alignContent === 'center' && 'flex justify-center'
            )}>
            {children}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      className={cx(
        'mb-8 rounded-2xl bg-linear-to-r shadow-xl sm:p-8 w-full',
        variant === 'default' && 'bg-white',
        variant === 'primary' &&
          'from-indigo-600 to-violet-600 p-6 text-white shadow-indigo-100',
        alignContent === 'center' && 'flex justify-center'
      )}>
      <div
        className={cx(
          'max-w-2xl w-full',
          alignContent === 'center' && 'flex justify-center'
        )}>
        {children}
      </div>
    </div>
  )
}
