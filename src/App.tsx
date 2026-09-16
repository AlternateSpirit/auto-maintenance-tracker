import { useState } from 'react'
import Home from './components/Home'
import Garage from './components/Garage'
import History from './components/History'
import VehicleDetails from './components/VehicleDetails'
import './App.css'


export type ServiceEntry = {
  id: number
  vehicleId: number
  mileage: string
  service: string
  cost: string
}

export type Vehicle = {
  id: number
  year: number
  make: string
  model: string
  mileage: number
}

function App() {
  const [vehicle, setVehicle] = useState('')
  const [mileage, setMileage] = useState('')
  const [service, setService] = useState('')
  const [cost, setCost] = useState('')
  const [currentPage, setCurrentPage] = useState('home')
  const [entries, setEntries] = useState<ServiceEntry[]>([])
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [vehicleMileage, setVehicleMileage] = useState('')
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null)

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      year: 2017,
      make: 'Subaru',
      model: 'WRX',
      mileage: 75000
    }
  ])

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle.id === selectedVehicleId
  )

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const newEntry: ServiceEntry = {
      id: Date.now(),
      vehicleId: Number(vehicle),
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

  function addVehicle(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const newVehicle: Vehicle = {
      id: Date.now(),
      year: Number(year), 
      make,
      model,
      mileage: Number(vehicleMileage),
    }

    //recreate the array, adding the new entry and set state
    setVehicles([...vehicles, newVehicle])

    //this resets each field to ''
    setYear('')
    setMake('')
    setModel('')
    setVehicleMileage('')
  }

  function deleteEntry(indexToDelete: number) {
    setEntries(
      entries.filter((_, index) => index !== indexToDelete)
    )
  }

  function deleteVehicle(idToDelete: number) {
    setVehicles(
      vehicles.filter((vehicle) => vehicle.id !== idToDelete)
    )
  }

  function openVehicle(vehicleId: number) {
    setSelectedVehicleId(vehicleId)
    setCurrentPage('vehicle')
  }

  function closeVehicle() {
    setCurrentPage('garage')
  }

  return (
    <div className="app-shell">
      {currentPage === 'home' && (
        <Home
          title="The Garage"
          vehicle={vehicle}
          vehicles={vehicles}
          mileage={mileage}
          service={service}
          cost={cost}
          setVehicle={setVehicle}
          setMileage={setMileage}
          setService={setService}
          setCost={setCost}
          handleSubmit={handleSubmit}
        />
      )}

      {currentPage === 'history' && (<History 
        entries={entries}
        deleteEntry={deleteEntry}
        vehicles={vehicles}
        />
      )}

      {currentPage === 'garage' && (<Garage 
        vehicles={vehicles} 
        year={year}
        make={make}
        model={model}
        vehicleMileage={vehicleMileage}
        setYear={setYear}
        setMake={setMake}
        setModel={setModel}
        setVehicleMileage={setVehicleMileage}
        addVehicle={addVehicle}
        deleteVehicle={deleteVehicle}
        openVehicle={openVehicle}
        />
      )}

      {currentPage === 'vehicle' && selectedVehicle && (
        <VehicleDetails 
        vehicle={selectedVehicle} 
        closeVehicle={closeVehicle}
        />
      )}

      {currentPage === 'settings' && <h1>Settings</h1>}

      <nav>
        <button className={currentPage === 'home' ? 'active' : ' '}onClick={() => setCurrentPage('home')}>Home</button>
        <button className={currentPage === 'history' ? 'active' : ' '}onClick={() => setCurrentPage('history')}>History</button>
        <button className={currentPage === 'garage' ? 'active' : ' '}onClick={() => setCurrentPage('garage')}>Garage</button>
        <button className={currentPage === 'settings' ? 'active' : ' '}onClick={() => setCurrentPage('settings')}>Settings</button>
      </nav>
    </div>
  )
}

export default App