interface PlanTitleProps {
  title: string
  subtitle?: string
  additionalInfo?: React.ReactNode
}

export function Title({ title, subtitle, additionalInfo }: PlanTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      {additionalInfo}
    </div>
  )
}
