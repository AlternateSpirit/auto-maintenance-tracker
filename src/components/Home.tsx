import type {
  ServiceEntry,
  ServiceReminder,
  Vehicle,
} from '../App'
import { formatServiceDate } from '../utils/formatServiceDate'
import { getReminderStatus } from '../utils/getReminderStatus'

type HomeProps = {
  title: string
  vehicle: string
  mileage: string
  service: string
  cost: string
  serviceDate: string
  vehicles: Vehicle[]
  entries: ServiceEntry[]
  reminders: ServiceReminder[]
  setVehicle: (value: string) => void
  setMileage: (value: string) => void
  setService: (value: string) => void
  setCost: (value: string) => void
  setServiceDate: (value: string) => void
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
  openGarage: () => void
  openVehicle: (vehicleId: number) => void
}

function Home({
  title,
  vehicle,
  vehicles,
  entries,
  reminders,
  mileage,
  service,
  cost,
  serviceDate,
  setServiceDate,
  setVehicle,
  setMileage,
  setService,
  setCost,
  handleSubmit,
  openGarage,
  openVehicle,
}: HomeProps) {
  const activeReminders = reminders
    .filter((reminder) => !reminder.completed)
    .sort((firstReminder, secondReminder) =>
      firstReminder.dueDate.localeCompare(secondReminder.dueDate)
    )

  const upcomingReminders = activeReminders.slice(0, 3)
  const totalSpent = entries.reduce((total, entry) => {
    const entryCost = Number(entry.cost)

    return Number.isFinite(entryCost)
      ? total + entryCost
      : total
  }, 0)

  return (
    <div className="app home-page">
      <header className="home-hero">
        <span className="eyebrow">Your cars, handled. Welcome to the</span>
        <h1 className="brand-title">{title}</h1>
        <p>
          Maintenance records, reminders, and what comes next - all in one place.
        </p>
      </header>

      {vehicles.length === 0 ? (
        <section className="card home-onboarding">
          <div className="onboarding-icon" aria-hidden="true">+</div>
          <span className="eyebrow">Start your garage</span>
          <h2>Add your first vehicle</h2>
          <p>
            Create a vehicle profile to begin tracking services, mileage,
            costs, and upcoming maintenance.
          </p>
          <button type="button" onClick={openGarage}>Go to Garage</button>
        </section>
      ) : (
        <>
          <section className="home-overview" aria-label="Garage overview">
            <div className="overview-card">
              <span>Vehicles</span>
              <strong>{vehicles.length}</strong>
              <small>In your garage</small>
            </div>
            <div className="overview-card">
              <span>Service records</span>
              <strong>{entries.length}</strong>
              <small>Maintenance history</small>
            </div>
            <div className="overview-card">
              <span>Total Spent</span>
              <strong>
                {totalSpent.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </strong>
              <small>Across all vehicles</small>
            </div>
          </section>

          <div className="home-dashboard">
            <section className="card service-entry-card">
              <span className="eyebrow">Quick entry</span>
              <h2>Log completed service</h2>
              <p className="section-description">
                Add work to a vehicle’s maintenance history.
              </p>

              <form onSubmit={handleSubmit}>
                <label htmlFor="service-vehicle">Vehicle</label>
                <select
                  id="service-vehicle"
                  value={vehicle}
                  onChange={(event) => setVehicle(event.target.value)}
                  required
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map((vehicleOption) => (
                    <option key={vehicleOption.id} value={vehicleOption.id}>
                      {vehicleOption.year} {vehicleOption.make}{' '}
                      {vehicleOption.model}
                    </option>
                  ))}
                </select>

                <div className="form-row">
                  <div>
                    <label htmlFor="service-date">Service date</label>
                    <input
                      id="service-date"
                      type="date"
                      value={serviceDate}
                      onChange={(event) => setServiceDate(event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="service-mileage">Mileage</label>
                    <input
                      id="service-mileage"
                      placeholder="76,240"
                      type="number"
                      min="0"
                      step="1"
                      inputMode="numeric"
                      value={mileage}
                      onChange={(event) => setMileage(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <label htmlFor="service-performed">Service performed</label>
                <input
                  id="service-performed"
                  placeholder="Oil change, tire rotation..."
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  required
                />

                <label htmlFor="service-cost">Cost</label>
                <input
                  id="service-cost"
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}
                  required
                />

                <button type="submit">Add to Service History</button>
              </form>
            </section>

            <aside className="card next-services-card">
              <span className="eyebrow">Maintenance plan</span>
              <h2>What’s coming up</h2>
              <p className="section-description">
                Your closest active reminders across the garage.
              </p>

              {upcomingReminders.length === 0 ? (
                <div className="all-clear-state">
                  <span aria-hidden="true">✓</span>
                  <h3>You’re all caught up</h3>
                  <p>Add reminders from a vehicle’s detail page.</p>
                </div>
              ) : (
                <div className="home-reminder-list">
                  {upcomingReminders.map((reminder) => {
                    const reminderVehicle = vehicles.find(
                      (currentVehicle) =>
                        currentVehicle.id === reminder.vehicleId
                    )

                    if (!reminderVehicle) return null

                    const status = getReminderStatus(
                      reminder.dueDate,
                      reminder.dueMileage,
                      reminderVehicle.mileage
                    )

                    return (
                      <button
                        key={reminder.id}
                        className="home-reminder"
                        type="button"
                        onClick={() => openVehicle(reminder.vehicleId)}
                      >
                        <span className={`reminder-dot ${status}`} />
                        <span className="home-reminder-copy">
                          <strong>{reminder.service}</strong>
                          <small>
                            {reminderVehicle.year} {reminderVehicle.make}{' '}
                            {reminderVehicle.model}
                          </small>
                          <small>
                            {formatServiceDate(reminder.dueDate)}
                            {reminder.dueMileage !== null &&
                              ` · ${reminder.dueMileage.toLocaleString()} mi`}
                          </small>
                        </span>
                        <span className={`reminder-status ${status}`}>
                          {status.replace('-', ' ')}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              <button
                className="secondary-button"
                type="button"
                onClick={openGarage}
              >
                View Garage
              </button>
            </aside>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
