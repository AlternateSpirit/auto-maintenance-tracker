import type { ServiceEntry } from '../App'

type HistoryProps = {
  entries: ServiceEntry[]
  deleteEntry: (index: number) => void
}

function History({entries, deleteEntry}: HistoryProps) {
  return (
    <div className="app">
      <h1>Service History</h1>
      <p>View all recorded maintenance.</p>

      <section className="card">
        <h2>Maintenance Records</h2>
        {entries.map((entry, index) => (
            <div>
                <h3>{entry.vehicle}</h3>
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