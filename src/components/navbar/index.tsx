import cx from 'classnames'

interface NavbarProps {
  children: React.ReactNode
  compact?: boolean
}
export function Navbar({ children, compact }: NavbarProps) {
  return (
    <nav
      className={cx(
        'sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm',
        !compact && 'px-4 py-4'
      )}>
      {children}
    </nav>
  )
}
