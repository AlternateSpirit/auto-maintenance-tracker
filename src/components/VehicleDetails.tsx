import {useState} from 'react'
import type { ServiceEntry, ServiceReminder, Vehicle } from '../App'
import {formatServiceDate} from '../utils/formatServiceDate'

type VehicleDetailsProps = {
  vehicle: Vehicle
  entries: ServiceEntry[]
  reminders: ServiceReminder[]
  closeVehicle: () => void
  updateVehicleMileage: (vehicleId: number, newMileage: number) => void
  addReminder: (
    vehicleId: number,
    service: string,
    dueDate: string,
    dueMileage: number | null
  ) => void
}

function VehicleDetails({ 
  vehicle,
  entries,
  reminders,
  closeVehicle,
  updateVehicleMileage,
  addReminder,
}: VehicleDetailsProps) {
  const [newMileage, setNewMileage] = useState(
    vehicle.mileage.toString()
  )
  const [reminderService, setReminderService] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [dueMileage, setDueMileage] = useState('')

  const totalMaintenanceCost = entries.reduce(
    (total, entry) => {
      const entryCost = Number(entry.cost)

      return total + (
        Number.isFinite(entryCost) ? entryCost : 0
      )
    },
    0
  )

  function handleMileageUpdate(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const mileageNumber = Number(newMileage)

    if (!Number.isFinite(mileageNumber) || mileageNumber < 0) {
      return
    }

    if (mileageNumber < vehicle.mileage) {
      const shouldLowerMileage = window.confirm(
        `This will lower the current mileage from ${vehicle.mileage.toLocaleString()} to ${mileageNumber.toLocaleString()}. Are you sure?`
      )

      if (!shouldLowerMileage) {
        return
      }
    }

    updateVehicleMileage(vehicle.id, mileageNumber)
  }
  function handleReminderSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const mileageNumber =
      dueMileage === '' ? null : Number(dueMileage)

    if (
      !reminderService.trim() ||
      !dueDate ||
      (
        mileageNumber !== null &&
        (
          !Number.isFinite(mileageNumber) ||
          mileageNumber < 0
        )
      )
    ) {
      return
    }

    addReminder(
      vehicle.id,
      reminderService.trim(),
      dueDate,
      mileageNumber
    )

    setReminderService('')
    setDueDate('')
    setDueMileage('')
  }
  return (
    <div className="app">
      <button onClick={closeVehicle}>Back to Garage</button>
      <h1>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h1>

      <p>Your vehicle's maintenance overview</p>

      <section className="card">
        <h2>Vehicle Details</h2>
        <p>Current mileage: {vehicle.mileage} miles</p>
        <form onSubmit={handleMileageUpdate}>
          <input
            type="number"
            min="0"
            placeholder="Current mileage"
            value={newMileage}
            onChange={(event) => setNewMileage(event.target.value)}
          />

          <button type="submit">
            Update Mileage
          </button>
        </form>
        <div>
          <p>Total Spent</p>
          <strong>
            {totalMaintenanceCost.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </strong>
        </div>
      </section>
      <section className="card">
        <h2>Upcoming Maintenance</h2>
        <form onSubmit={handleReminderSubmit}>
          <input
            type="text"
            placeholder="Service needed"
            value={reminderService}
            onChange={(event) =>
              setReminderService(event.target.value)
            }
            required
          />

          <label htmlFor="reminder-date">
            Expected service date
          </label>

          <input
            id="reminder-date"
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            required
          />

          <input
            type="number"
            min="0"
            step="1"
            placeholder="Due mileage (optional)"
            value={dueMileage}
            onChange={(event) =>
              setDueMileage(event.target.value)
            }
          />

          <button type="submit">
            Add Reminder
          </button>
        </form>

        {reminders.length === 0 ? (
          <p>No upcoming maintenance scheduled.</p>
        ) : (
          reminders.map((reminder) => (
            <div key={reminder.id}>
              <h3>{reminder.service}</h3>
              <p>
                Expected by: {formatServiceDate(reminder.dueDate)}
              </p>

              {reminder.dueMileage !== null && (
                <p>
                  Due at: {reminder.dueMileage.toLocaleString()} miles
                </p>
              )}
            </div>
          ))
        )}
      </section>
      <section className="card">
        <h2>Maintenance History</h2>

        {entries.length === 0 ? (
          <p>No maintenance records added yet.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id}>
              <h3>{entry.service}</h3>
              <p>Date: {formatServiceDate(entry.date)}</p>
              <p>Mileage: {entry.mileage}</p>
              <p>Cost: ${entry.cost}</p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default VehicleDetails