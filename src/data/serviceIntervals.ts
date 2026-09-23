export type ServiceInterval = {
  service: string
  mileageInterval: number
  monthInterval: number
  keywords: string[]
}

export const serviceIntervals: ServiceInterval[] = [
  {
    service: 'Oil Change',
    mileageInterval: 5000,
    monthInterval: 6,
    keywords: ['oil change', 'engine oil'],
  },
  {
    service: 'Tire Rotation',
    mileageInterval: 5000,
    monthInterval: 6,
    keywords: ['tire rotation', 'rotate tires'],
  },
  {
    service: 'Engine Air Filter',
    mileageInterval: 15000,
    monthInterval: 12,
    keywords: ['engine air filter', 'air filter'],
  },
  {
    service: 'Brake Fluid',
    mileageInterval: 30000,
    monthInterval: 24,
    keywords: ['brake fluid', 'brake flush'],
  },
]