import type { ServiceEntry, Vehicle } from '../App'

type HistoryProps = {
  entries: ServiceEntry[]
  vehicles: Vehicle[]
  deleteEntry: (index: number) => void
}

function History({entries, deleteEntry, vehicles}: HistoryProps) {
  function getVehicleName(vehicleId: number) {
    const matchingVehicle = vehicles.find(
      (vehicle) => vehicle.id === vehicleId
    )

    if (!matchingVehicle) {
      return 'Unknown vehicle'
    }

    return `${matchingVehicle.year} ${matchingVehicle.make} ${matchingVehicle.model}`
  }
  return (
    <div className="app">
      <h1>Service History</h1>
      <p>View all recorded maintenance.</p>

      <section className="card">
        <h2>Maintenance Records</h2>
        {entries.map((entry, index) => (
            <div key={entry.id}>
                <h3>{getVehicleName(entry.vehicleId)}</h3>
                <p>Service: {entry.service}</p>
                <p>Mileage: {entry.mileage}</p>
                <p>Cost: ${entry.cost}</p>
                <button onClick={() => deleteEntry(index)}>Delete Entry</button>
            </div>
            
        ))}
      </section>
    </div>
  )
}

export default History