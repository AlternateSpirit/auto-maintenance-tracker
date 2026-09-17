import type { Vehicle } from '../App'

type HomeProps = {
  title: string
  vehicle: string
  mileage: string
  service: string
  cost: string
  serviceDate: string
  
  vehicles: Vehicle[]
  setVehicle: (value: string) => void
  setMileage: (value: string) => void
  setService: (value: string) => void
  setCost: (value: string) => void
  setServiceDate: (value: string) => void
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
}

function Home({
  title,
  vehicle,
  vehicles,
  mileage,
  service,
  cost,
  serviceDate,
  setServiceDate,
  setVehicle,
  setMileage,
  setService,
  setCost,
  handleSubmit
}: HomeProps) {
  return (
    <div className="app">
      <h1>{title}</h1>
      <p>Track your vehicle maintenance in one place.</p>

      <section className="card">
        <h2>Want to add a service done?</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={vehicle}
            onChange={(event) => setVehicle(event.target.value)}
            required
          >
            <option value="">Select a vehicle</option>

            {vehicles.map((vehicleOption) => (
              <option key={vehicleOption.id} value={vehicleOption.id}>
                {vehicleOption.year} {vehicleOption.make} {vehicleOption.model}
              </option>
            ))}
          </select>

          <input
            id="service-date"
            type="date"
            value={serviceDate}
            onChange={(event) => setServiceDate(event.target.value)}
            required
          />
          <input
            placeholder="Mileage"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={mileage}
            onChange={(event) => setMileage(event.target.value)}
            required
          />
          <input
            placeholder="Service Performed"
            value={service}
            onChange={(event) => setService(event.target.value)}
          />
          <input
            placeholder="Cost"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
            required
          />

          <button type="submit">Add Entry</button>
        </form>
      </section>
    </div>
  )
}

export default Home