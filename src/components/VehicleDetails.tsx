import {useState} from 'react'
import type { ServiceEntry, Vehicle } from '../App'

type VehicleDetailsProps = {
  vehicle: Vehicle
  entries: ServiceEntry[]
  closeVehicle: () => void
  updateVehicleMileage: (vehicleId: number, newMileage: number) => void
}

function VehicleDetails({ 
  vehicle,
  entries,
  closeVehicle,
  updateVehicleMileage,
}: VehicleDetailsProps) {
  const [newMileage, setNewMileage] = useState(
    vehicle.mileage.toString()
  )

  function handleMileageUpdate(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const mileageNumber = Number(newMileage)

    if (!Number.isFinite(mileageNumber) || mileageNumber < 0) {
      return
    }

    updateVehicleMileage(vehicle.id, mileageNumber)
  }

  const totalMaintenanceCost = entries.reduce(
    (total, entry) => {
      const entryCost = Number(entry.cost)

      return total + (
        Number.isFinite(entryCost) ? entryCost : 0
      )
    },
    0
  )

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
        <h2>Maintenance History</h2>

        {entries.length === 0 ? (
          <p>No maintenance records added yet.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id}>
              <h3>{entry.service}</h3>
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