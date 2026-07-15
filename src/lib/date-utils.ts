export function diffDays(d1: Date, d2: Date) {
  const millDiff = Math.abs(d2.getDate() - d1.getDate())

  return millDiff / (1000 * 60 * 60 * 24)
}
