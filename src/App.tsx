import { useState } from 'react'
import Home from './components/home'
import './App.css'

type ServiceEntry = {
  vehicle: string
  mileage: string
  service: string
  cost: string
}

function App() {
  const [vehicle, setVehicle] = useState('')
  const [mileage, setMileage] = useState('')
  const [service, setService] = useState('')
  const [cost, setCost] = useState('')


  const [entries, setEntries] = useState<ServiceEntry[]>([])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newEntry: ServiceEntry = {
      vehicle,
      mileage,
      service,
      cost,
    }

    setEntries([...entries, newEntry])

    setVehicle('')
    setMileage('')
    setService('')
    setCost('')
  }

  function deleteEntry(indexToDelete: number) {
    setEntries(
      entries.filter((_, index) => index !== indexToDelete)
    )
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

          <input
            placeholder="Cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
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
            <p>Cost: {entry.cost}</p>
            <button onClick={() => deleteEntry(index)}>
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default App