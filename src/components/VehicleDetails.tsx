import type { Vehicle } from '../App'

type VehicleDetailsProps = {
  vehicle: Vehicle
  closeVehicle: () => void
}

function VehicleDetails({ 
  vehicle,
  closeVehicle,

}: VehicleDetailsProps) {
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
      </section>
    </div>
  )
}

export default VehicleDetails