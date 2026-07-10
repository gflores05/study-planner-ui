interface MainContainerProps {
  children: React.ReactNode
}
export function MainContainer({ children }: MainContainerProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full">
      {children}
    </main>
  )
}
