export type ReminderStatus =
  | 'upcoming'
  | 'due-soon'
  | 'due-now'
  | 'overdue'

export function getReminderStatus(
  dueDate: string,
  dueMileage: number | null,
  currentMileage: number
): ReminderStatus {
  const [year, month, day] = dueDate
    .split('-')
    .map(Number)

  const today = new Date()
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const serviceDate = new Date(
    year,
    month - 1,
    day
  )

  const millisecondsPerDay =
    1000 * 60 * 60 * 24

  const daysUntilDue = Math.ceil(
    (serviceDate.getTime() - currentDate.getTime()) /
      millisecondsPerDay
  )

  const milesUntilDue =
    dueMileage === null
      ? null
      : dueMileage - currentMileage

  if (
    daysUntilDue < 0 ||
    (milesUntilDue !== null && milesUntilDue < 0)
  ) {
    return 'overdue'
  }

  if (
    daysUntilDue === 0 ||
    milesUntilDue === 0
  ) {
    return 'due-now'
  }

  if (
    daysUntilDue <= 21 ||
    (
      milesUntilDue !== null &&
      milesUntilDue <= 500
    )
  ) {
    return 'due-soon'
  }

  return 'upcoming'
}