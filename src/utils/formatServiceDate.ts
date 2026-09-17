export function formatServiceDate(date?: string) {
  if (!date) {
    return 'Date not recorded'
  }

  const [year, month, day] = date.split('-').map(Number)

  if (!year || !month || !day) {
    return 'Invalid date'
  }

  return new Date(year, month - 1, day).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  )
}