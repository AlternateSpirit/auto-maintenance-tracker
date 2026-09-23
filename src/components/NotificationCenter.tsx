import { useState } from 'react'
import type {
  ServiceReminder,
  Vehicle,
} from '../App'
import { getReminderStatus } from '../utils/getReminderStatus'
import { formatServiceDate } from '../utils/formatServiceDate'

type NotificationCenterProps = {
  reminders: ServiceReminder[]
  vehicles: Vehicle[]
  openVehicle: (vehicleId: number) => void
  snoozeReminder: (reminderId: number) => void
}

function NotificationCenter({
  reminders,
  vehicles,
  openVehicle,
  snoozeReminder,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)

  function viewVehicle(vehicleId: number) {
    openVehicle(vehicleId)
    setIsOpen(false)
  }

  return (
    <div className="notification-center">
      <button
        className="notification-bell"
        aria-label={`${reminders.length} maintenance notifications`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {reminders.length > 0 && (
          <span className="notification-badge">
            {reminders.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <h2>Maintenance Alerts</h2>

          {reminders.length === 0 ? (
            <p>You’re all caught up.</p>
          ) : (
            reminders.map((reminder) => {
              const vehicle = vehicles.find(
                (currentVehicle) =>
                  currentVehicle.id === reminder.vehicleId
              )

              if (!vehicle) {
                return null
              }

              const status = getReminderStatus(
                reminder.dueDate,
                reminder.dueMileage,
                vehicle.mileage
              )

              return (
                <div
                  key={reminder.id}
                  className="notification-item"
                >
                  <strong>{reminder.service}</strong>

                  <span>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </span>

                  <span>
                    {formatServiceDate(reminder.dueDate)}
                    {' · '}
                    {status}
                  </span>

                  <div className="notification-actions">
                    <button
                      type="button"
                      onClick={() => viewVehicle(vehicle.id)}
                    >
                      View Vehicle
                    </button>

                    <button
                      type="button"
                      onClick={() => snoozeReminder(reminder.id)}
                    >
                      Snooze 7 Days
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationCenter