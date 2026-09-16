import type { Vehicle } from '../App'

type HomeProps = {
  title: string
  vehicle: string
  mileage: string
  service: string
  cost: string
  vehicles: Vehicle[]
  setVehicle: (value: string) => void
  setMileage: (value: string) => void
  setService: (value: string) => void
  setCost: (value: string) => void
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
}

function Home({
  title,
  vehicle,
  vehicles,
  mileage,
  service,
  cost,
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
            placeholder="Mileage"
            value={mileage}
            onChange={(event) => setMileage(event.target.value)}
          />

          <input
            placeholder="Service Performed"
            value={service}
            onChange={(event) => setService(event.target.value)}
          />

          <input
            placeholder="Cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />

          <button type="submit">Add Entry</button>
        </form>
      </section>
    </div>
  )
}

export default Home