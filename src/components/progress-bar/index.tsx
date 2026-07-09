interface ProgressBarProps {
  value: number
}
export function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="w-full bg-slate-200 rounded-full h-2">
      <div
        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}></div>
    </div>
  )
}
