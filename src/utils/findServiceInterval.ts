import {
  serviceIntervals,
  type ServiceInterval,
} from '../data/serviceIntervals'

export function findServiceInterval(
  serviceName: string
): ServiceInterval | undefined {
  const normalizedServiceName = serviceName
    .trim()
    .toLowerCase()

  return serviceIntervals.find((interval) =>
    interval.keywords.some((keyword) =>
      normalizedServiceName.includes(keyword)
    )
  )
}