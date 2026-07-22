interface ErrorMessageProps {
  children: React.ReactNode
}
export function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className="text-red-600 text-sm font-medium mt-4">{children}</p>
}
