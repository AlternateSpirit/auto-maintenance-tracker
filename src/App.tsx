import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getReminderStatus } from './utils/getReminderStatus'
import { findServiceInterval } from './utils/findServiceInterval'
import Home from './components/Home'
import Garage from './components/Garage'
import History from './components/History'
import VehicleDetails from './components/VehicleDetails'
import NotificationCenter from './components/NotificationCenter'
import './App.css'


export type ServiceEntry = {
  id: number
  vehicleId: number
  mileage: number
  service: string
  cost: number
  date:string
}

export type Vehicle = {
  id: number
  year: number
  make: string
  model: string
  mileage: number
}

export type ServiceReminder = {
  id: number
  vehicleId: number
  service: string
  dueDate: string
  dueMileage: number | null
  snoozedUntil: string | null
  completed: boolean
}

function App() {
  //declarations
  const [vehicle, setVehicle] = useState('')
  const [mileage, setMileage] = useState('')
  const [service, setService] = useState('')
  const [serviceDate, setServiceDate] = useState('')
  const [cost, setCost] = useState('')
  const [currentPage, setCurrentPage] = useState('home')
  const [entries, setEntries] = useLocalStorage<ServiceEntry[]>('serviceEntries', [])
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [vehicleMileage, setVehicleMileage] = useState('')
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null)
  const [reminders, setReminders] = useLocalStorage<ServiceReminder[]>('serviceReminders',[])

  const sortedEntries = [...entries].sort(
    (firstEntry, secondEntry) =>
      (secondEntry.date ?? '').localeCompare(firstEntry.date ?? '')
  )

  const [vehicles, setVehicles] = useLocalStorage<Vehicle[]>('vehicles', [])

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle.id === selectedVehicleId
  )

  const selectedVehicleEntries = sortedEntries.filter(
    (entry) => entry.vehicleId === selectedVehicleId
  )

  const selectedVehicleReminders = reminders.filter(
    (reminder) =>
      reminder.vehicleId === selectedVehicleId &&
      !reminder.completed
  )
  const today = new Date()
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  const notificationReminders = reminders.filter(
    (reminder) => {
      if (reminder.completed) {
        return false
      }

      const reminderVehicle = vehicles.find(
        (vehicle) => vehicle.id === reminder.vehicleId
      )

      if (!reminderVehicle) {
        return false
      }

      const status = getReminderStatus(
        reminder.dueDate,
        reminder.dueMileage,
        reminderVehicle.mileage
      )

      if (
        reminder.snoozedUntil !== null &&
        reminder.snoozedUntil > todayString
      ) {
        return false
      }

      return status !== 'upcoming'
    }
  )


  const notificationCountsByVehicle =
    notificationReminders.reduce<Record<number, number>>(
      (counts, reminder) => {
        counts[reminder.vehicleId] =
          (counts[reminder.vehicleId] ?? 0) + 1

        return counts
      },
      {}
  )

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const mileageNumber = Number(mileage)
    const costNumber = Number(cost)

    if (
      !Number.isFinite(mileageNumber) ||
      mileageNumber < 0 ||
      !Number.isFinite(costNumber) ||
      costNumber < 0
    ) {
      return
    }

    //verifies mileage discrepencies
    const sameVehicleEntries = entries
      .filter(
        (entry) =>
          entry.vehicleId === Number(vehicle) &&
          entry.date
      )
      .sort((firstEntry, secondEntry) =>
        firstEntry.date.localeCompare(secondEntry.date)
      )

    const previousEntries = sameVehicleEntries.filter(
      (entry) => entry.date <= serviceDate
    )

    const previousEntry =
      previousEntries[previousEntries.length - 1]

    const nextEntry = sameVehicleEntries.find(
      (entry) => entry.date > serviceDate
    )

    const conflictsWithPrevious =
      previousEntry &&
      mileageNumber < Number(previousEntry.mileage)

    const conflictsWithNext =
      nextEntry &&
      mileageNumber > Number(nextEntry.mileage)

    if (conflictsWithPrevious || conflictsWithNext) {
      const shouldSaveAnyway = window.confirm(
        'This mileage does not fit the vehicle’s existing maintenance timeline. Save this record anyway?'
      )

      if (!shouldSaveAnyway) {
        return
      }
    }

    const newEntry: ServiceEntry = {
      id: Date.now(),
      vehicleId: Number(vehicle),
      date: serviceDate,
      mileage: mileageNumber,
      service,
      cost: costNumber,
    }

    setEntries([...entries, newEntry])
    setVehicles((currentVehicles) =>
      currentVehicles.map((currentVehicle) =>
        currentVehicle.id === Number(vehicle) &&
        mileageNumber > currentVehicle.mileage
          ? {
              ...currentVehicle,
              mileage: mileageNumber,
            }
          : currentVehicle
      )
    )
    setVehicle('')
    setMileage('')
    setService('')
    setCost('')
    setServiceDate('')
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

  function deleteEntry(idToDelete: number) {
    setEntries(
      entries.filter((entry) => entry.id !== idToDelete)
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

  function updateVehicleMileage(vehicleId: number, newMileage: number) {
    setVehicles((currentVehicles) =>
      currentVehicles.map((vehicle) =>
        vehicle.id === vehicleId
          ? { ...vehicle, mileage: newMileage }
          : vehicle
      )
    )
  }

  function completeReminder(reminderId: number) {
    const completedReminder = reminders.find(
      (reminder) =>
        reminder.id === reminderId && !reminder.completed
    )

    if (!completedReminder) {
      return
    }

    const updatedReminders = reminders.map((reminder) =>
      reminder.id === reminderId
        ? { ...reminder, completed: true }
        : reminder
    )

    const interval = findServiceInterval(
      completedReminder.service
    )

    const reminderVehicle = vehicles.find(
      (vehicle) =>
        vehicle.id === completedReminder.vehicleId
    )

    if (!interval || !reminderVehicle) {
      setReminders(updatedReminders)
      return
    }

    const nextDueDate = new Date()
    nextDueDate.setMonth(
      nextDueDate.getMonth() + interval.monthInterval
    )

    const formattedDueDate = [
      nextDueDate.getFullYear(),
      String(nextDueDate.getMonth() + 1).padStart(2, '0'),
      String(nextDueDate.getDate()).padStart(2, '0'),
    ].join('-')

    const nextReminder: ServiceReminder = {
      id: Date.now(),
      vehicleId: completedReminder.vehicleId,
      service: interval.service,
      dueDate: formattedDueDate,
      dueMileage:
        reminderVehicle.mileage + interval.mileageInterval,
      snoozedUntil: null,
      completed: false,
    }

    setReminders([
      ...updatedReminders,
      nextReminder,
    ])
  }

  function snoozeReminder(reminderId: number) {
    const snoozedDate = new Date()
    snoozedDate.setDate(snoozedDate.getDate() + 7)

    const snoozedUntil = [
      snoozedDate.getFullYear(),
      String(snoozedDate.getMonth() + 1).padStart(2, '0'),
      String(snoozedDate.getDate()).padStart(2, '0'),
    ].join('-')

    setReminders((currentReminders) =>
      currentReminders.map((reminder) =>
        reminder.id === reminderId
          ? { ...reminder, snoozedUntil }
          : reminder
      )
    )
  }

  function addReminder(
    vehicleId: number,
    service: string,
    dueDate: string,
    dueMileage: number | null
  ) {
    const newReminder: ServiceReminder = {
      id: Date.now(),
      vehicleId,
      service,
      dueDate,
      dueMileage,
      snoozedUntil: null,
      completed: false,
    }

    setReminders((currentReminders) => [
      ...currentReminders,
      newReminder,
    ])
  }

  return (
    <div className="app-shell">
      <NotificationCenter
        reminders={notificationReminders}
        vehicles={vehicles}
        openVehicle={openVehicle}
        snoozeReminder={snoozeReminder}
      />

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
          setServiceDate={setServiceDate}
          serviceDate={serviceDate}
        />
      )}

      {currentPage === 'history' && (<History 
        entries={sortedEntries}
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
        notificationCountsByVehicle={notificationCountsByVehicle}
        />
      )}

      {currentPage === 'vehicle' && selectedVehicle && (
        <VehicleDetails 
        vehicle={selectedVehicle}
        entries={selectedVehicleEntries}
        closeVehicle={closeVehicle}
        updateVehicleMileage={updateVehicleMileage}
        reminders={selectedVehicleReminders}
        addReminder={addReminder}
        completeReminder={completeReminder}
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
