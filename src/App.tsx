import { useState } from 'react'

type ServiceEntry = {
  vehicle: string
  mileage: string
  service: string
}

function App() {
  const [vehicle, setVehicle] = useState('')
  const [mileage, setMileage] = useState('')
  const [service, setService] = useState('')

  const [entries, setEntries] = useState<ServiceEntry[]>([])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newEntry: ServiceEntry = {
      vehicle,
      mileage,
      service,
    }

    setEntries([...entries, newEntry])

    setVehicle('')
    setMileage('')
    setService('')
  }

  return (
    <div className="app">
      <h1>Garage Log</h1>

      <h2>Add Service Entry</h2>
      <section className="card">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Vehicle Name"
            value={vehicle}
            onChange={(event) => setVehicle(event.target.value)}
          />

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

          <button type="submit">Add Entry</button>
        </form>
      </section>
      <section className="card">
        <h2>Service History</h2>

        {entries.map((entry, index) => (
          <div key={index}>
            <h3>{entry.vehicle}</h3>
            <p>Mileage: {entry.mileage}</p>
            <p>Service: {entry.service}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default App